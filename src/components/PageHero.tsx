import Icon, { type IconName } from "@/components/Icon";

interface PageHeroProps {
  title: string;
  subtitle: string;
  eyebrow?: string;
  icon?: IconName;
}

export default function PageHero({ title, subtitle, eyebrow, icon = "compass" }: PageHeroProps) {
  return (
    <div className="brand-page-hero px-6 py-16 text-white md:py-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8">
        <div className="relative z-10 max-w-3xl animate-rise">
          {eyebrow && (
            <p className="ms-eyebrow mb-4 inline-flex items-center gap-2 text-white/80">
              <Icon name="sparkle" size={14} />
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-base text-white/85 md:text-lg">{subtitle}</p>
        </div>
        <div className="relative z-10 hidden md:block">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/25 bg-white/10 shadow-xl backdrop-blur">
            <Icon name={icon} size={44} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}