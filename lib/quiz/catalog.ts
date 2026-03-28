import type { QuizModule, QuizModuleId } from "./types";
import { validateQuestionPool } from "./validate-source-question";
import { chessQuestions } from "./questions/chess";
import { angularQuestions } from "./questions/angular";
import { accessibilityQuestions } from "./questions/accessibility";
import { uxCopyQuestions } from "./questions/ux-copy";

validateQuestionPool(chessQuestions, "chess");
validateQuestionPool(angularQuestions, "angular");
validateQuestionPool(accessibilityQuestions, "accessibility");
validateQuestionPool(uxCopyQuestions, "ux-copy");

const modules: QuizModule[] = [
  {
    id: "chess",
    title: "Chess",
    shortDescription: "Rules, tactics, and foundational patterns.",
    explainer: `Chess rewards pattern recognition and precise knowledge of rules—from how pieces move to ideas like stalemate, castling, and pawn structure. This module samples common questions you’ll see as you study openings, tactics, and endgames. You’ll get 10 questions drawn at random from a larger pool; answer choices are shuffled each time so position alone doesn’t reveal the key.`,
    chatgptPrompts: [
      "Explain stalemate vs checkmate with two mini examples on a board I can visualize.",
      "Give me a 20-minute study plan for improving tactics as an intermediate player.",
      "What are three common opening mistakes for beginners and how do I fix them?",
      "Walk me through opposition in king-and-pawn endings with a simple diagram description.",
    ],
    questionPool: chessQuestions,
  },
  {
    id: "angular",
    title: "Angular",
    shortDescription: "Components, DI, templates, and modern Angular patterns.",
    explainer: `Angular combines structured components, dependency injection, and a rich template system (including signals in modern versions). This quiz emphasizes practical distinctions: structural directives, services, routing basics, forms bridges, and change detection at a high level. Questions are randomized from a pool; focus on reasoning, not memorizing option order.`,
    chatgptPrompts: [
      "Compare Default vs OnPush change detection with a small component example.",
      "Explain when to use signals vs RxJS in a new Angular feature.",
      "How do I structure a lazy-loaded feature module with routing guards?",
      "Show a minimal ControlValueAccessor pattern for a custom slider.",
    ],
    questionPool: angularQuestions,
  },
  {
    id: "accessibility",
    title: "Accessibility (WCAG)",
    shortDescription: "Principles, keyboard use, semantics, and inclusive design.",
    explainer: `Web accessibility is about real people: keyboard users, screen reader users, people with low vision, motor differences, and more. WCAG organizes guidance into principles (POUR): Perceivable, Operable, Understandable, Robust. This module quizzes foundational expectations you’ll apply when reviewing UI—not a legal checklist, but good professional habits.`,
    chatgptPrompts: [
      "Help me audit this form for WCAG 2.2 issues; ask me for HTML snippets missing context.",
      "Explain Success Criterion 1.4.3 contrast in plain language with examples.",
      "How should I combine visible labels, placeholders, and aria-labelledby correctly?",
      "Give me a keyboard testing script I can run on any SPA in 15 minutes.",
    ],
    questionPool: accessibilityQuestions,
  },
  {
    id: "ux-copy",
    title: "UX / Copywriting",
    shortDescription: "Clarity, voice, and patterns for interface language.",
    explainer: `UX writing is interface design with words: buttons, errors, empty states, onboarding, and confirmations. Strong copy reduces support burden, builds trust, and reflects inclusion. You’ll see prompts about plain language, consistency, CTAs, and recovery patterns. Apply what you learn to your style guide and critique real screens.`,
    chatgptPrompts: [
      "Rewrite this error message three ways: vague, better, excellent—and explain why.",
      "Give me a checklist for destructive-action confirmations with good microcopy.",
      "How do I define voice vs tone for a B2B SaaS product with examples?",
      "Critique this onboarding screen copy; I’ll paste the UI text and context.",
    ],
    questionPool: uxCopyQuestions,
  },
];

export const quizModulesOrdered: QuizModule[] = modules;

export const quizModuleById: Record<QuizModuleId, QuizModule> = modules.reduce(
  (acc, m) => {
    acc[m.id] = m;
    return acc;
  },
  {} as Record<QuizModuleId, QuizModule>,
);

export const isQuizModuleId = (value: string): value is QuizModuleId =>
  value === "chess" || value === "angular" || value === "accessibility" || value === "ux-copy";
