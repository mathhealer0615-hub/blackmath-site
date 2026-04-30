"use client";

import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type Mode = "quick" | "thinking";

export default function BlackMathAI() {
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState<Mode>("quick");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageName, setImageName] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);

  const [choices, setChoices] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [recognizedProblem, setRecognizedProblem] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const normalizeMathText = (text: string) => {
    return text
      .replace(/\\\(/g, "$")
      .replace(/\\\)/g, "$")
      .replace(/\\\[/g, "$$")
      .replace(/\\\]/g, "$$")
      .replace(/\\\\/g, "\\");
  };

  const readServerResponse = async (res: Response) => {
    const text = await res.text();

    try {
      const data = JSON.parse(text);
      return {
        text: normalizeMathText(data.text || data.error || "응답 없음"),
        choices: Array.isArray(data.choices) ? data.choices : [],
        done: Boolean(data.done),
        recognizedProblem: data.recognizedProblem || "",
      };
    } catch {
      return {
        text: "❌ 서버 응답 오류\n\n" + text,
        choices: [],
        done: true,
        recognizedProblem: "",
      };
    }
  };

  const askAI = async () => {
    if (!question.trim() && !imageData) {
      setAnswer("문제를 입력하거나 사진을 첨부해줘.");
      return;
    }

    setLoading(true);
    setAnswer("");
    setChoices([]);
    setStep(0);
    setHistory([]);
    setDone(false);
    setRecognizedProblem("");

    try {
      const res = await fetch("/api/blackmath", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          image: imageData,
          mode,
          step: 0,
          selectedChoice: null,
          history: [],
          recognizedProblem: "",
        }),
      });

      const result = await readServerResponse(res);
      setAnswer(result.text);
      setChoices(result.choices);
      setDone(result.done);
      setRecognizedProblem(result.recognizedProblem || "");

      if (mode === "thinking") {
        setStep(1);
      }
    } catch (error: any) {
      setAnswer("❌ 요청 실패\n\n" + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChoice = async (choice: string) => {
    setLoading(true);

    const nextHistory = [...history, choice];
    setHistory(nextHistory);

    try {
      const res = await fetch("/api/blackmath", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          image: step >= 2 ? imageData : null,
          mode: "thinking",
          step,
          selectedChoice: choice,
          history: nextHistory,
          recognizedProblem,
        }),
      });

      const result = await readServerResponse(res);

      setAnswer((prev) => `${prev}\n\n---\n\n**내 선택:** ${choice}\n\n${result.text}`);
      setChoices(result.choices);
      setDone(result.done);
      setStep((prev) => prev + 1);

      if (result.recognizedProblem) {
        setRecognizedProblem(result.recognizedProblem);
      }
    } catch (error: any) {
      setAnswer((prev) => prev + "\n\n❌ 선택 처리 실패\n\n" + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageName(file.name);
    setAnswer("");
    setChoices([]);
    setStep(0);
    setHistory([]);
    setDone(false);
    setRecognizedProblem("");

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const resetProblem = () => {
    setQuestion("");
    setAnswer("");
    setImageName("");
    setImageData(null);
    setChoices([]);
    setStep(0);
    setHistory([]);
    setDone(false);
    setRecognizedProblem("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1c1c2b 0%, #0b0b0f 45%, #050507 100%)",
        color: "white",
        padding: "40px 20px",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "rgba(21, 21, 28, 0.94)",
          border: "1px solid #2a2a35",
          borderRadius: "24px",
          padding: "32px",
          boxShadow: "0 28px 80px rgba(0,0,0,0.45)",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#a78bfa",
            fontSize: "13px",
            fontWeight: "bold",
            letterSpacing: "0.08em",
          }}
        >
          BLACKMATH THINKING SYSTEM
        </p>

        <h1 style={{ fontSize: "40px", fontWeight: "bold", margin: "8px 0 0" }}>
          🧠 BlackMath AI
        </h1>

        <p style={{ marginTop: "12px", color: "#aaa", fontSize: "16px" }}>
          문제를 입력하거나 사진을 첨부하면 BlackMath 방식으로 분석해줄게.
        </p>

        <textarea
          placeholder="수학 문제를 직접 입력해줘"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            width: "100%",
            height: "170px",
            marginTop: "24px",
            padding: "16px",
            borderRadius: "16px",
            background: "#0f0f15",
            color: "white",
            border: "1px solid #3a3a45",
            fontSize: "16px",
            resize: "vertical",
            boxSizing: "border-box",
            outline: "none",
          }}
        />

        <input
          ref={fileInputRef}
          type="file"
          id="fileUpload"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />

        <label
          htmlFor="fileUpload"
          style={{
            display: "inline-block",
            marginTop: "18px",
            padding: "13px 20px",
            borderRadius: "14px",
            background: "#1f1f2a",
            border: "1px solid #555",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          📸 문제 사진 첨부
        </label>

        {imageName && (
          <p style={{ marginTop: "10px", color: "#aaa", fontSize: "14px" }}>
            선택된 파일: {imageName}
          </p>
        )}

        <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          <button
            onClick={() => setMode("quick")}
            style={{
              padding: "12px 18px",
              borderRadius: "14px",
              border: mode === "quick" ? "2px solid white" : "1px solid #444",
              background: mode === "quick" ? "white" : "#1f1f2a",
              color: mode === "quick" ? "black" : "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            ⚡ 빠른 해설
          </button>

          <button
            onClick={() => setMode("thinking")}
            style={{
              padding: "12px 18px",
              borderRadius: "14px",
              border: mode === "thinking" ? "2px solid white" : "1px solid #444",
              background: mode === "thinking" ? "white" : "#1f1f2a",
              color: mode === "thinking" ? "black" : "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            🧠 버튼형 사고 모드
          </button>
        </div>

        <button
          onClick={askAI}
          disabled={loading}
          style={{
            marginTop: "24px",
            padding: "14px 24px",
            borderRadius: "14px",
            border: "none",
            background: loading ? "#555" : "#7c3aed",
            color: "white",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {loading
            ? mode === "thinking"
              ? "BlackMath가 사고 흐름을 정리 중..."
              : "BlackMath가 검산 중..."
            : "AI에게 질문"}
        </button>

        {answer && (
          <div
            style={{
              marginTop: "32px",
              background: "#0f0f15",
              border: "1px solid #333",
              padding: "22px",
              borderRadius: "16px",
              lineHeight: "1.8",
              fontSize: "16px",
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {answer}
            </ReactMarkdown>

            {choices.length > 0 && !done && (
              <div style={{ marginTop: "28px" }}>
                <p
                  style={{
                    color: "#a78bfa",
                    fontWeight: "bold",
                    marginBottom: "14px",
                  }}
                >
                  다음 사고 방향을 선택해줘
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {choices.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => handleChoice(choice)}
                      disabled={loading}
                      style={{
                        padding: "16px",
                        borderRadius: "16px",
                        border: "1px solid #4b4b5f",
                        background:
                          "linear-gradient(180deg, #20202b 0%, #15151d 100%)",
                        color: "white",
                        cursor: loading ? "not-allowed" : "pointer",
                        fontWeight: "bold",
                        fontSize: "15px",
                        textAlign: "left",
                        lineHeight: "1.5",
                      }}
                    >
                      <span style={{ color: "#a78bfa" }}>{index + 1}. </span>
                      {choice}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={resetProblem}
              style={{
                marginTop: "24px",
                padding: "12px 18px",
                borderRadius: "14px",
                border: "1px solid #555",
                background: "#1f1f2a",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              ✨ 새 문제로 넘어가기
            </button>
          </div>
        )}
      </section>
    </main>
  );
}