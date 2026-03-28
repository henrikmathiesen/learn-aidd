"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { buildSessionQuestions, questionsPerModule } from "@/lib/quiz/build-session";
import type { AnswerRecord, QuizModule } from "@/lib/quiz/types";

type Phase = "explainer" | "question" | "results";

const confidenceLabels: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "1 — pure guess",
  2: "2 — somewhat unsure",
  3: "3 — moderate",
  4: "4 — fairly sure",
  5: "5 — very sure",
};

export function QuizFlow({ module }: { module: QuizModule }) {
  const [sessionKey, setSessionKey] = useState(0);
  const sessionQuestions = useMemo(() => {
    void sessionKey;
    return buildSessionQuestions(module.questionPool);
  }, [module.questionPool, sessionKey]);

  const [phase, setPhase] = useState<Phase>("explainer");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const current = sessionQuestions[index];
  const isLast = index === sessionQuestions.length - 1;

  const resetToExplainer = useCallback(() => {
    setPhase("explainer");
    setIndex(0);
    setSelected(null);
    setConfidence(null);
    setAnswers([]);
  }, []);

  const reshuffle = useCallback(() => {
    setSessionKey((k) => k + 1);
    resetToExplainer();
  }, [resetToExplainer]);

  const goNextQuestion = useCallback(() => {
    if (!current || selected === null || confidence === null) return;

    const isCorrect = selected === current.correctIndex;
    const record: AnswerRecord = {
      questionId: current.id,
      selectedIndex: selected,
      confidence,
      isCorrect,
    };

    setAnswers((prev) => [...prev, record]);
    setSelected(null);
    setConfidence(null);

    if (isLast) {
      setPhase("results");
    } else {
      setIndex((i) => i + 1);
    }
  }, [confidence, current, isLast, selected]);

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const wrongAnswers = answers.filter((a) => !a.isCorrect);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{module.title}</p>

      {phase === "explainer" && (
        <article className="mt-6 space-y-6">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Before you begin</h1>
          <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300">
            {module.explainer.split("\n\n").map((para, i) => (
              <p key={`expl-${i}`} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            You will answer {questionsPerModule} multiple-choice questions. After each one, rate how confident you
            felt (1–5). Correct answers are mixed randomly each session.
          </p>
          <button
            type="button"
            className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-offset-zinc-950"
            onClick={() => setPhase("question")}
          >
            Start quiz
          </button>
        </article>
      )}

      {phase === "question" && current && (
        <div className="mt-6 space-y-8">
          <div className="flex items-center justify-between gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <span>
              Question {index + 1} of {sessionQuestions.length}
            </span>
            <span>{Math.round(((index + 1) / sessionQuestions.length) * 100)}%</span>
          </div>

          <h1 className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl">{current.prompt}</h1>

          <fieldset className="space-y-3">
            <legend className="sr-only">Choose an answer</legend>
            {current.options.map((opt, i) => {
              const id = `${current.id}-opt-${i}`;
              return (
                <label
                  key={id}
                  htmlFor={id}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-left transition hover:border-zinc-400 dark:hover:border-zinc-500 ${
                    selected === i
                      ? "border-foreground bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900"
                      : "border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <input
                    id={id}
                    type="radio"
                    name="answer"
                    className="mt-1 size-4 accent-foreground"
                    checked={selected === i}
                    onChange={() => setSelected(i)}
                  />
                  <span className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">{opt}</span>
                </label>
              );
            })}
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              How confident are you in this answer?
            </legend>
            <div className="flex flex-wrap gap-2">
              {([1, 2, 3, 4, 5] as const).map((n) => {
                const cId = `${current.id}-conf-${n}`;
                return (
                  <label
                    key={cId}
                    htmlFor={cId}
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:text-sm ${
                      confidence === n
                        ? "border-foreground bg-zinc-100 dark:bg-zinc-800"
                        : "border-zinc-200 dark:border-zinc-700"
                    }`}
                  >
                    <input
                      id={cId}
                      type="radio"
                      name="confidence"
                      className="size-3.5 accent-foreground"
                      checked={confidence === n}
                      onChange={() => setConfidence(n)}
                    />
                    {confidenceLabels[n]}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={selected === null || confidence === null}
              className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-offset-zinc-950"
              onClick={goNextQuestion}
            >
              {isLast ? "See results" : "Next question"}
            </button>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-zinc-300 px-6 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            >
              Exit to modules
            </Link>
          </div>
        </div>
      )}

      {phase === "results" && (
        <div className="mt-6 space-y-8">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Your score card</h1>

          <section
            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/60"
            aria-labelledby="score-summary"
          >
            <h2 id="score-summary" className="text-lg font-medium">
              Summary
            </h2>
            <p className="mt-2 text-3xl font-semibold tabular-nums">
              {correctCount}{" "}
              <span className="text-lg font-normal text-zinc-600 dark:text-zinc-400">/ {questionsPerModule}</span>
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {Math.round((correctCount / questionsPerModule) * 100)}% correct
            </p>
            {answers.length > 0 && (
              <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">
                Average confidence (all questions):{" "}
                <span className="font-medium tabular-nums">
                  {(answers.reduce((s, a) => s + a.confidence, 0) / answers.length).toFixed(1)}
                </span>{" "}
                out of 5
              </p>
            )}
          </section>

          {wrongAnswers.length > 0 && (
            <section aria-labelledby="review-misses">
              <h2 id="review-misses" className="text-lg font-medium">
                Topics to revisit
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {wrongAnswers.length} question{wrongAnswers.length === 1 ? "" : "s"} missed — use the prompts below
                to go deeper. Only your picks are shown (not the keyed answer), so you can practice without spoilers
                in the UI.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-800 dark:text-zinc-200">
                {wrongAnswers.map((a) => {
                  const q = sessionQuestions.find((sq) => sq.id === a.questionId);
                  if (!q) return null;
                  return (
                    <li key={a.questionId}>
                      <span className="font-medium">{q.prompt}</span>
                      <span className="text-zinc-500 dark:text-zinc-400">
                        {" "}
                        (you chose option {a.selectedIndex + 1}, confidence {a.confidence}/5)
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <section aria-labelledby="gpt-prompts">
            <h2 id="gpt-prompts" className="text-lg font-medium">
              Suggested ChatGPT prompts
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Copy any prompt into ChatGPT (or another assistant) to keep learning in your own words.
            </p>
            <ul className="mt-4 space-y-3">
              {module.chatgptPrompts.map((text) => (
                <li key={text}>
                  <blockquote className="rounded-xl border border-dashed border-zinc-300 bg-white p-4 text-sm leading-relaxed text-zinc-800 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200">
                    {text}
                  </blockquote>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-offset-zinc-950"
              onClick={reshuffle}
            >
              Same module — reshuffle
            </button>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-zinc-300 px-6 py-2.5 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            >
              All modules
            </Link>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            Tip: “Same module — reshuffle” draws a new random question set and shuffles answer order again. You can also
            refresh the page.
          </p>
        </div>
      )}
    </div>
  );
}
