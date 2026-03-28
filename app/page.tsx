import type { Metadata } from "next";
import Link from "next/link";
import { quizModulesOrdered } from "@/lib/quiz/catalog";

export const metadata: Metadata = {
  title: "Learning quizzes",
  description: "Short modules on chess, Angular, accessibility, and UX writing with randomized quizzes.",
};

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Choose a module</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Each topic opens with a quick explainer, then ten questions sampled at random from a larger pool. Confidence
        ratings help you notice gaps between what you know and what feels uncertain—without giving away correct answers
        by position.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2" role="list">
        {quizModulesOrdered.map((mod) => (
          <li key={mod.id}>
            <Link
              href={`/quiz/${mod.id}`}
              className="group block h-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            >
              <h2 className="font-semibold text-foreground">{mod.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{mod.shortDescription}</p>
              <span className="mt-4 inline-block text-sm font-medium text-zinc-900 underline-offset-4 group-hover:underline dark:text-zinc-100">
                Start module →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
