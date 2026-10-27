const items = [
  'Без консервантов',
  'Река Ахтуба',
  'Собственное хозяйство',
  'Осётр и стерлядь',
  'Бережная доставка',
  'Без ГМО и антибиотиков',
];

const Marquee = () => (
  <div className="relative border-y border-primary/20 bg-card/60 py-5 overflow-hidden marquee-mask">
    <div className="marquee-track">
      {[...items, ...items].map((text, i) => (
        <span key={i} className="flex items-center gap-8 px-4 shrink-0 font-display text-xl md:text-2xl italic text-foreground/80">
          {text}
          <span className="text-primary text-sm not-italic">✦</span>
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
