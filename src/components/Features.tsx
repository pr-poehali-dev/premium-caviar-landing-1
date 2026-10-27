import Icon from '@/components/ui/icon';
import Reveal from '@/components/Reveal';
import type { SiteContent } from '@/lib/site-content';

const icons = ['Waves', 'Snowflake', 'ShieldCheck', 'Gift', 'Award', 'Heart', 'Leaf', 'Star'];

const Features = ({ content }: { content: SiteContent }) => (
  <section className="py-16 md:py-32 px-4 relative">
    <div className="container mx-auto max-w-7xl">
      <Reveal className="text-center mb-10 md:mb-20">
        <p className="eyebrow mb-4">{content.featuresEyebrow}</p>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold">
          {content.featuresTitle} <span className="text-gold italic">{content.featuresTitleAccent}</span>
        </h2>
        <div className="gold-divider mx-auto mt-8" />
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {content.features.map((f, i) => (
          <Reveal key={i} delay={i * 120} className="h-full">
            <div className="feature-card group h-full rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-border bg-secondary/40">
              <div className="feature-icon mb-6 md:mb-8">
                <Icon name={icons[i % icons.length]} size={26} />
              </div>
              <span className="block font-display text-sm text-primary/60 mb-2">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{f.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
