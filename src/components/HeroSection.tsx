/**
 * HeroSection component - Large header with title and description
 */

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
}

export default function HeroSection({ title, subtitle, description }: HeroSectionProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-xl text-blue-100 mb-4">{subtitle}</p>
        {description && <p className="text-lg text-blue-50 max-w-2xl">{description}</p>}
      </div>
    </div>
  );
}
