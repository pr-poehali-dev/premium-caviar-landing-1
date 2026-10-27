import { lines } from '@/lib/site-content';

const Marquee = ({ text }: { text: string }) => {
  const items = lines(text);
  if (items.length === 0) return null;
  const loop = items.length < 4 ? [...items, ...items, ...items] : items;

  return (
    <div className="relative border-y border-primary/20 bg-card/60 py-4 md:py-5 overflow-hidden marquee-mask">
      <div className="marquee-track">
        {[...loop, ...loop].map((item, i) => (
          <span key={i} className="flex items-center gap-8 px-4 shrink-0 font-display text-lg md:text-2xl italic text-foreground/95">
            {item}
            <span className="text-primary text-sm not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
