import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isQuizModuleId, quizModuleById, quizModulesOrdered } from "@/lib/quiz/catalog";
import { QuizFlow } from "./quiz-flow";

type Props = {
  params: Promise<{ moduleId: string }>;
};

export function generateStaticParams() {
  return quizModulesOrdered.map((m) => ({ moduleId: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduleId } = await params;
  if (!isQuizModuleId(moduleId)) {
    return { title: "Module not found" };
  }
  const mod = quizModuleById[moduleId];
  return {
    title: `${mod.title} quiz`,
    description: mod.shortDescription,
  };
}

export default async function QuizModulePage({ params }: Props) {
  const { moduleId } = await params;
  if (!isQuizModuleId(moduleId)) {
    notFound();
  }
  const quizModule = quizModuleById[moduleId];

  return <QuizFlow module={quizModule} />;
}
