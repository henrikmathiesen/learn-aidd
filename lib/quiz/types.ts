export type QuizModuleId = "chess" | "angular" | "accessibility" | "ux-copy";

/** Four-option multiple choice: exactly one correct index, three incorrect distractors. */
export type FourChoices = [string, string, string, string];

export type ChoiceIndex = 0 | 1 | 2 | 3;

export type SourceQuestion = {
  id: string;
  prompt: string;
  options: FourChoices;
  /** Index into `options` for the single correct choice (before any shuffle). */
  correctIndex: ChoiceIndex;
  /** Optional ChatGPT-style prompt when the learner misses this question (used on imperfect score cards). */
  reviewPrompt?: string;
};

export type SessionQuestion = {
  id: string;
  prompt: string;
  options: FourChoices;
  correctIndex: ChoiceIndex;
  reviewPrompt?: string;
};

export type QuizModule = {
  id: QuizModuleId;
  title: string;
  shortDescription: string;
  explainer: string;
  chatgptPrompts: string[];
  questionPool: SourceQuestion[];
};

export type AnswerRecord = {
  questionId: string;
  selectedIndex: number;
  confidence: 1 | 2 | 3 | 4 | 5;
  isCorrect: boolean;
};
