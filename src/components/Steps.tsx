import Icon from '@/components/ui/icon';
import Reveal from '@/components/Reveal';
import type { SiteContent } from '@/lib/site-content';

const icons = ['PhoneCall', 'PackageCheck', 'Truck', 'Smile', 'Star'];

const Steps = ({ content }: { content: SiteContent }) => (
  <section className="py-16 md:py-32 px-4 relative">
    <div className="container mx-auto max-w-6xl">
      <Reveal className="text-center mb-10 md:mb-20">
        <p className="eyebrow mb-4">{content.stepsEyebrow}</p>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold">
          {content.stepsTitle} <span className="text-gold italic">{content.stepsTitleAccent}</span>
        </h2>
        <div className="gold-divider mx-auto mt-8" />
      </Reveal>

      <div className="relative grid md:grid-cols-3 gap-12 md:gap-8">
        <div className="steps-line hidden md:block" aria-hidden />
        {content.steps.map((s, i) => (
          <Reveal key={i} delay={i * 180} className="relative text-center">
            <div className="step-badge mx-auto mb-8">
              <Icon name={icons[i % icons.length]} size={28} />
              <span className="step-num">{i + 1}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-3">{s.title}</h3>
            <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto whitespace-pre-line">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Steps;
