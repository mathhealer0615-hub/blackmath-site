import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        text: "❌ OPENAI_API_KEY 확인 필요",
        choices: [],
        done: true,
      });
    }

    const client = new OpenAI({ apiKey });

    const {
      question,
      image,
      mode,
      step,
      selectedChoice,
      history,
    } = await req.json();

    // ------------------------
    // 🧠 사고모드 (초고속 구조)
    // ------------------------
    if (mode === "thinking") {

      // ✅ 0단계: GPT 안씀 (즉시 응답)
      if (step === 0) {
        return NextResponse.json({
          text: `좋아. 이 문제는 바로 계산 들어가는 게 아니라 먼저 접근 방향을 잡는 게 중요해.\n\n처음에 어떤 방향으로 보는 게 좋을까?`,
          choices: [
            "조건 정리부터 한다",
            "도형/구조를 본다",
            "식으로 바꾼다",
            "개념 유형을 파악한다",
          ],
          done: false,
        });
      }

      // ✅ 1단계: 이것도 GPT 안씀 (속도용)
      if (step === 1) {
        return NextResponse.json({
          text: `좋은 선택이야 👍\n\n이제 핵심을 식으로 잡아야 해.\n어떤 방향이 맞을까?`,
          choices: [
            "좌표로 표현한다",
            "관계를 식으로 만든다",
            "변수 설정 후 식 세운다",
            "대칭/성질 활용한다",
          ],
          done: false,
        });
      }

      // ✅ 마지막 단계: 여기서만 GPT 사용 (정답 정확도 확보)
      const finalPrompt = `
너는 BlackMath AI이다.

문제를 정확히 풀고 검산 후 정답을 제시해라.

출력 형식:
[풀이]
[검산]
[최종 정답]
[핵심 사고법]

수식은 반드시 $...$ 사용

문제:
${question || ""}
`;

      let input: any;

      if (image) {
        input = [
          {
            role: "user",
            content: [
              { type: "input_text", text: finalPrompt },
              { type: "input_image", image_url: image },
            ],
          },
        ];
      } else {
        input = finalPrompt;
      }

      const response = await client.responses.create({
        model: "gpt-4.1",
        input,
        temperature: 0,
      } as any);

      return NextResponse.json({
        text: response.output_text || "응답 없음",
        choices: [],
        done: true,
      });
    }

    // ------------------------
    // ⚡ 빠른 해설 (정확도 유지)
    // ------------------------
    const quickPrompt = `
너는 BlackMath AI이다.

빠르게 풀이하되 정확한 정답을 도출하라.

출력:
[핵심 구조]
[식 세움]
[계산]
[검산]
[최종 정답]

수식은 $...$ 사용

문제:
${question || ""}
`;

    let input: any;

    if (image) {
      input = [
        {
          role: "user",
          content: [
            { type: "input_text", text: quickPrompt },
            { type: "input_image", image_url: image },
          ],
        },
      ];
    } else {
      input = quickPrompt;
    }

    const response = await client.responses.create({
      model: "gpt-4.1",
      input,
      temperature: 0,
    } as any);

    return NextResponse.json({
      text: response.output_text || "응답 없음",
      choices: [],
      done: true,
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json({
      text: "❌ 오류 발생: " + error.message,
      choices: [],
      done: true,
    });
  }
}