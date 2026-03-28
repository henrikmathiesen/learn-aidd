import type { SessionQuestion, SourceQuestion } from "./types";
import { shuffle, shuffleOptions } from "./shuffle";

const questionsPerModule = 10;

export const buildSessionQuestions = (
  pool: readonly SourceQuestion[],
  random: () => number = Math.random,
): SessionQuestion[] => {
  const picked = shuffle([...pool], random).slice(0, questionsPerModule);
  return picked.map((q) => {
    const { options, correctIndex } = shuffleOptions(q.options, q.correctIndex, random);
    return {
      id: q.id,
      prompt: q.prompt,
      options,
      correctIndex,
    };
  });
};

export { questionsPerModule };
