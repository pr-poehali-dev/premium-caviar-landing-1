import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/Reveal';

const stats = [
  { value: 2013, label: 'год основания хозяйства', plain: true },
  { value: 1000, label: 'осетров в маточном стаде', suffix: '+' },
  { value: 2000, label: 'самок стерляди', suffix: '+' },
  { value: 0, label: 'консервантов, ГМО и антибиотиков' },
];

const CountUp = ({ to, plain, suffix = '' }: { to: number; plain?: boolean; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(plain ? to - 30 : 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const from = plain ? to - 30 : 0;
      const start = performance.now();
      const dur = 2000;
      const tick = (t: number) => {
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        setVal(Math.round(from + (to - from) * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, plain]);

  return (
    <span ref={ref}>
      {plain ? val : val.toLocaleString('ru-RU')}
      {suffix}
    </span>
  );
};

const Stats = () => (
  <section className="relative py-12 md:py-28 px-4 overflow-hidden">
    <div className="container mx-auto max-w-7xl">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-primary/15 bg-primary/15">
        {stats.map((s, i) => (
          <div key={s.label} className="bg-background">
            <Reveal delay={i * 120} className="stat-cell h-full px-3 py-6 md:p-10 text-center">
              <div className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold text-gold leading-none mb-3 md:mb-4">
                <CountUp to={s.value} plain={s.plain} suffix={s.suffix} />
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.12em] md:tracking-[0.2em] text-muted-foreground leading-relaxed">{s.label}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
