"use client";

import BlackMathAI from "./components/BlackMathAI";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function BlackMathLandingPage() {
    useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md">
  <nav className="mx-auto flex max-w-full overflow-x-auto whitespace-nowrap px-6 py-6 text-base tracking-[0.22em] text-zinc-400 scrollbar-hide">
    <div className="flex min-w-max gap-12 mx-auto">
      <a href="#home" className="hover:text-white transition">HOME</a>
      <a href="#method" className="hover:text-white transition">METHOD</a>
      <a href="#blackmath-ai" className="hover:text-white transition">AI</a>
      <a href="#concept-book" className="hover:text-white transition">BOOK</a>
      <a href="#students" className="hover:text-white transition">STUDENTS</a>
      <a href="#contact" className="hover:text-white transition">CONTACT</a>
    </div>
  </nav>
</header>

      <section id="home" className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="blackmath-title text-6xl md:text-8xl font-semibold tracking-tight"
>
  BLACKMATH
</motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-5 text-xl md:text-2xl text-zinc-400"
        >
          수학은 공식이 아니다. 언어다
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 max-w-3xl text-lg leading-9 text-zinc-300"
        >
          <p className="mb-6">
            BLACKMATH는 복잡한 개념과 공식, 문제를
            <br />
            그대로 외우게 하지 않습니다.
          </p>
          <p className="mb-6">
            문제의 조건을 읽고, 의미를 해석하고,
            <br />
            그것을 수학의 언어로 번역합니다.
          </p>
          <p className="font-medium text-white">
            그 순간, 수학은 암기가 아니라 이해가 됩니다.
          </p>
        </motion.div>
      </section>

      <section id="method" className="min-h-screen px-6 py-32 border-t border-white/10">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-6 text-sm tracking-[0.35em] text-zinc-500">METHOD</p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
            대부분은 식부터 세운다.
            <br />
            우리는 문제를 먼저 읽는다.
          </h2>
          <div className="mt-16 grid gap-6 md:grid-cols-3 text-left">
            <div className="rounded-3xl border border-white/10 p-8">
              <p className="mb-4 text-zinc-500">01</p>
              <h3 className="mb-3 text-2xl font-semibold">읽기</h3>
              <p className="leading-7 text-zinc-400">문제의 조건을 단순한 숫자가 아니라 의미를 가진 문장으로 읽습니다.</p>
            </div>
            <div className="rounded-3xl border border-white/10 p-8">
              <p className="mb-4 text-zinc-500">02</p>
              <h3 className="mb-3 text-2xl font-semibold">해석</h3>
              <p className="leading-7 text-zinc-400">조건이 말하는 관계, 변화, 제한을 언어로 먼저 해석합니다.</p>
            </div>
            <div className="rounded-3xl border border-white/10 p-8">
              <p className="mb-4 text-zinc-500">03</p>
              <h3 className="mb-3 text-2xl font-semibold">번역</h3>
              <p className="leading-7 text-zinc-400">해석한 의미를 수식으로 번역합니다. 공식은 출발점이 아니라 결과입니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="blackmath-ai" className="px-6 py-32 border-t border-white/10">
  <div className="mx-auto max-w-4xl text-center">
    
    <p className="mb-6 text-sm tracking-[0.35em] text-zinc-500">
      BLACKMATH AI
    </p>

    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
      사고는 도구가 아니라,
      <br />
      훈련되어야 합니다.
    </h2>

    <p className="mt-10 text-xl leading-8 text-zinc-400">
      BLACKMATH AI는 단순한 풀이를 제공하지 않습니다.
      <br />
      문제를 해석하고 사고하는 방식을 설계하고 있습니다.
    </p>

    {/* 버튼 */}
    <button
      disabled
      className="mt-16 px-8 py-4 rounded-xl bg-zinc-800 text-zinc-400 
      cursor-not-allowed border border-white/10 tracking-wide"
    >
      🧠 BLACKMATH AI - Coming Soon
    </button>

    {/* 안내 문구 */}
    <p className="mt-6 text-sm text-zinc-500 leading-6">
      우리는 답을 빠르게 주는 AI를 만들지 않습니다.
      <br />
      생각을 바꾸는 AI를 만들고 있습니다.
    </p>

  </div>
</section>

<section id="concept-book" className="px-6 py-32 border-t border-white/10">
  <div className="mx-auto max-w-4xl text-center">
    <p className="mb-6 text-sm tracking-[0.35em] text-zinc-500">
      CONCEPT BOOK
    </p>

    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
      공식을 외우기 전에,
      <br />
      개념을 읽는 법부터.
    </h2>

    <p className="mt-10 text-xl leading-8 text-zinc-400">
      BLACKMATH 개념서는 수학을 공식의 나열이 아니라
      <br />
      언어, 직관, 구조의 흐름으로 설명합니다.
    </p>

    <button
      disabled
      className="mt-16 px-8 py-4 rounded-xl bg-zinc-800 text-zinc-400 
      cursor-not-allowed border border-white/10 tracking-wide"
    >
      📘 BLACKMATH 개념서 - Coming Soon
    </button>

    <p className="mt-6 text-sm text-zinc-500 leading-6">
      단순한 풀이집이 아니라,
      <br />
      문제를 읽는 사고방식을 담은 전자책입니다.
    </p>
  </div>
</section>

      <section id="students" className="min-h-screen px-6 py-32 border-t border-white/10">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-6 text-sm tracking-[0.35em] text-zinc-500">STUDENTS</p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
            이런 학생에게 필요합니다.
          </h2>
          <div className="mt-16 space-y-6 text-xl text-zinc-300">
            <p>개념은 아는데 문제를 못 푸는 학생</p>
            <p>킬러문항 앞에서 사고가 멈추는 학생</p>
            <p>풀이 암기가 아니라 이해로 수학을 잡고 싶은 학생</p>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen px-6 py-32 border-t border-white/10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-6 text-sm tracking-[0.35em] text-zinc-500">CONTACT</p>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
            풀이가 아니라,
            <br />
            해석으로 시작하세요.
          </h2>
          <p className="mt-10 text-xl leading-8 text-zinc-400">
            상담은 Thread 또는 인스타 DM으로 진행됩니다.
          </p>
        </div>
      </section>
    </main>
  );
}

