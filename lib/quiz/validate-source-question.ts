import type { SourceQuestion } from "./types";

/** Ensures each item is a standard MCQ: exactly four distinct choices and exactly one marked correct. */
export const validateSourceQuestion = (q: SourceQuestion, context = q.id): void => {
  const opts = q.options;
  if (opts.length !== 4) {
    throw new Error(`[${context}] expected exactly 4 answer choices, got ${opts.length}`);
  }
  const trimmed = opts.map((s) => s.trim());
  if (trimmed.some((s) => s.length === 0)) {
    throw new Error(`[${context}] each answer choice must be non-empty`);
  }
  if (new Set(trimmed).size !== 4) {
    throw new Error(`[${context}] all four choices must be distinct (text)`);
  }
  if (q.correctIndex < 0 || q.correctIndex > 3 || !Number.isInteger(q.correctIndex)) {
    throw new Error(`[${context}] correctIndex must be 0, 1, 2, or 3`);
  }
  if (q.reviewPrompt !== undefined && q.reviewPrompt.trim().length === 0) {
    throw new Error(`[${context}] reviewPrompt must be non-empty when set`);
  }
};

export const validateQuestionPool = (pool: readonly SourceQuestion[], poolName: string): void => {
  for (const q of pool) {
    validateSourceQuestion(q, `${poolName}/${q.id}`);
  }
};
