import type { SourceQuestion } from "../types";

export const accessibilityQuestions: SourceQuestion[] = [
  {
  id: "a11y-1",
  prompt: "WCAG conformance levels are primarily labeled as…",
  options: ["A, B, C", "Primary, Secondary, Tertiary", "A, AA, AAA", "Bronze, Silver, Gold"],
  correctIndex: 2,
  },
  {
  id: "a11y-2",
  prompt: "Perceivable (WCAG principle) emphasizes that information must be…",
  options: [
    "Presented so users can perceive it (e.g., alternatives for non-text content)",
    "Only available in PDF",
    "Hidden from assistive tech",
    "Styled with brand colors only",
  ],
  correctIndex: 0,
  },
  {
  id: "a11y-3",
  prompt: "Keyboard operability is important because…",
  options: [
    "Only mobile users need keyboards",
    "Many users rely on keyboard or keyboard-like AT without a pointer",
    "WCAG forbids mouse use",
    "Browsers only support keyboard",
  ],
  correctIndex: 1,
  },
  {
  id: "a11y-4",
  prompt: "Alternative text on meaningful images should…",
  options: [
    "Always be empty",
    "Describe the image’s purpose or content for those who can’t see it",
    "Repeat the filename",
    "Be at least 200 characters",
  ],
  correctIndex: 1,
  },
  {
  id: "a11y-5",
  prompt: "Focus indicators help users…",
  options: [
    "See which element receives keyboard focus",
    "Disable forms",
    "Increase animation speed",
    "Block screen readers",
  ],
  correctIndex: 0,
  },
  {
  id: "a11y-6",
  prompt: "Color alone should not be the only means of conveying…",
  options: ["Typography choices", "Information (e.g., errors)", "Animations", "Whitespace"],
  correctIndex: 1,
  },
  {
  id: "a11y-7",
  prompt: "Proper heading hierarchy (h1–h6) benefits…",
  options: [
    "Only SEO crawlers",
    "Screen reader users navigating by headings and overall document structure",
    "Only print stylesheets",
    "Only PDF exports",
  ],
  correctIndex: 1,
  },
  {
  id: "a11y-8",
  prompt: "ARIA live regions can…",
  options: [
    "Announce dynamic updates to assistive technologies",
    "Replace valid HTML semantics whenever convenient",
    "Disable keyboard access",
    "Guarantee WCAG AAA",
  ],
  correctIndex: 0,
  },
  {
  id: "a11y-9",
  prompt: "Operable means…",
  options: [
    "UI components must be usable without surprising seizures or traps",
    "Content must be readable by googlebot only",
    "Only text may appear",
    "Forms cannot validate client-side",
  ],
  correctIndex: 0,
  },
  {
  id: "a11y-10",
  prompt: "Skip links commonly help…",
  options: [
    "Bypass repeated navigation to reach main content quickly",
    "Skip HTTPS",
    "Remove focus styles",
    "Hide all images",
  ],
  correctIndex: 0,
  },
  {
  id: "a11y-11",
  prompt: "Understandable (principle) includes…",
  options: [
    "Predictable behavior and readable text",
    "Using only jargon",
    "Removing labels from inputs",
    "Disabling error messages",
  ],
  correctIndex: 0,
  },
  {
  id: "a11y-12",
  prompt: "Contrast requirements primarily address…",
  options: [
    "Legibility for users with low vision",
    "Browser caching",
    "Server latency",
    "JavaScript bundle size",
  ],
  correctIndex: 0,
  },
  {
  id: "a11y-13",
  prompt: "A form control should be associated with its label via…",
  options: [
    "Matching `for`/`id`, wrapping, or aria-label/-labelledby where appropriate",
    "Only placeholder text",
    "Only color cues",
    "title attribute alone always",
  ],
  correctIndex: 0,
  },
  {
  id: "a11y-14",
  prompt: "Robust (principle) means…",
  options: [
    "Content works across current and emerging user agents, including AT",
    "Only Chrome is supported",
    "No JavaScript allowed",
    "PDFs replace HTML",
  ],
  correctIndex: 0,
  },
  {
  id: "a11y-15",
  prompt: "Touch target size guidelines aim to reduce…",
  options: [
    "Accidental activations and difficulty for motor impairments",
    "Lighthouse scores",
    "SSR performance",
    "Git history size",
  ],
  correctIndex: 0,
  },
  {
  id: "a11y-16",
  prompt: "Motion/reduced motion preferences often map to…",
  options: [
    "`prefers-reduced-motion` media feature",
    "disabling all CSS",
    "removing headings",
    "forcing autoplay",
  ],
  correctIndex: 0,
  },
  {
  id: "a11y-17",
  prompt: "Name, Role, Value (SC 4.1.2) expects UIs to expose…",
  options: [
    "Correct accessible name/state for UI components",
    "Only pixel dimensions",
    "Only hex colors",
    "Server IP addresses",
  ],
  correctIndex: 0,
  },
  {
  id: "a11y-18",
  prompt: "An accessible name for a button can come from…",
  options: [
    "Visible text content, aria-label, or aria-labelledby as appropriate",
    "Only CSS background images",
    "Only the page URL",
    "Tab index alone",
  ],
  correctIndex: 0,
  },
];
