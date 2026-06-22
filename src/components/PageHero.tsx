import BrandLogo from "@/components/BrandLogo";

interface PageHeroProps {
  title: string;
  subtitle: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <div className="brand-page-hero px-6 py-12 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-base text-white/88 md:text-lg">{subtitle}</p>
        </div>
        <div className="hidden rounded-[28px] border border-white/25 bg-white/10 p-3 shadow-xl backdrop-blur md:block">
          <BrandLogo size="badge" />
        </div>
      </div>
    </div>
  );
}