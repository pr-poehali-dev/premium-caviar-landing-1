import { Link } from "@/lib/router-compat";
import Icon from '@/components/ui/icon';
import Reveal from '@/components/Reveal';
import { paragraphs, type SiteContent } from '@/lib/site-content';

const Story = ({ content }: { content: SiteContent }) => (
  <section className="py-16 md:py-32 px-4 relative overflow-hidden">
    <div className="container mx-auto max-w-3xl text-center">
      <Reveal>
        <p className="eyebrow mb-4">{content.storyEyebrow}</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 md:mb-8 leading-[1.05]">
          {content.storyTitle} <span className="text-gold italic">{content.storyTitleAccent}</span> {content.storyTitleEnd}
        </h2>
        <div className="gold-divider mx-auto mb-8 md:mb-10" />
        <div className="space-y-5 text-base md:text-lg text-foreground/95 leading-relaxed">
          {paragraphs(content.storyText).map((p, i) => (
            <p key={i} className="whitespace-pre-line">{p}</p>
          ))}
        </div>
        {content.storyQuote.trim() && (
          <blockquote className="mt-8 md:mt-10 font-display text-2xl md:text-4xl italic text-gold">
            {content.storyQuote}
          </blockquote>
        )}
        <Link to="/about" className="btn-ghost-gold mt-8 md:mt-10 px-7 py-3.5">
          {content.storyButton}
          <Icon name="ArrowRight" size={18} />
        </Link>
      </Reveal>
    </div>
  </section>
);

export default Story;
