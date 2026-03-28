import { shuffle } from "./shuffle";
import type { AnswerRecord, QuizModule, SessionQuestion } from "./types";
import { questionsPerModule } from "./build-session";

const missedFallbackPrompt = (moduleTitle: string, questionPrompt: string) =>
  `I'm studying ${moduleTitle} and missed this on a practice quiz: "${questionPrompt}" Explain the core idea, why the correct answer is right, common misconceptions to avoid, and one short example I can remember.`;

/**
 * Perfect score → static module list (unchanged).
 * Otherwise → prompts aimed at missed questions first, then random picks from the static list until full.
 */
export const resolveChatgptPromptsForResults = (
  module: QuizModule,
  sessionQuestions: readonly SessionQuestion[],
  answers: readonly AnswerRecord[],
  random: () => number = Math.random,
): string[] => {
  const targetCount = module.chatgptPrompts.length;
  const correct = answers.filter((a) => a.isCorrect).length;

  if (correct === questionsPerModule || answers.length === 0) {
    return [...module.chatgptPrompts];
  }

  const missedIds = new Set(answers.filter((a) => !a.isCorrect).map((a) => a.questionId));
  const targetedTexts: string[] = [];
  const seenTargeted = new Set<string>();

  for (const sq of sessionQuestions) {
    if (!missedIds.has(sq.id)) continue;
    const text = (sq.reviewPrompt?.trim().length ? sq.reviewPrompt : missedFallbackPrompt(module.title, sq.prompt)).trim();
    if (!seenTargeted.has(text)) {
      seenTargeted.add(text);
      targetedTexts.push(text);
    }
  }

  const orderedMisses = shuffle(targetedTexts, random);
  const out: string[] = [];

  for (const t of orderedMisses) {
    if (out.length >= targetCount) break;
    out.push(t);
  }

  if (out.length < targetCount) {
    const extras = shuffle([...module.chatgptPrompts], random);
    for (const p of extras) {
      if (out.length >= targetCount) break;
      if (!out.includes(p)) out.push(p);
    }
  }

  return out.slice(0, targetCount);
};
