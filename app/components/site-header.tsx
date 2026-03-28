import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-semibold tracking-tight text-foreground underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-sm"
        >
          Topic quizzes
        </Link>
        <nav aria-label="Primary">
          <Link
            href="/"
            className="text-sm text-zinc-600 underline-offset-4 hover:text-foreground hover:underline dark:text-zinc-400 dark:hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-sm"
          >
            All modules
          </Link>
        </nav>
      </div>
    </header>
  );
}
