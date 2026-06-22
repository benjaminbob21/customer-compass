export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col items-center gap-6 px-6 py-24 text-center">
        <span className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:border-white/15 dark:text-zinc-400">
          Hackathon Project
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl dark:text-zinc-50">
          Customer Compass
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          An AI-powered support platform that helps teams deliver clear,
          personalized, and trustworthy customer experiences.
        </p>
        <p className="text-sm text-zinc-400 dark:text-zinc-600">
          Base project ready — start building.
        </p>
      </main>
    </div>
  );
}
