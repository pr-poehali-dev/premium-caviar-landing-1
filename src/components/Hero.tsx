import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { telHref, type SiteContent } from '@/lib/site-content';

const words = (text: string) => text.split(/\s+/).filter(Boolean);

const particles = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 2 + ((i * 7) % 5),
  delay: (i * 0.73) % 9,
  duration: 9 + ((i * 3) % 8),
}));

const Hero = ({ content }: { content: SiteContent }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logoRef.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 5}deg)`;
      spotRef.current?.style.setProperty('--sx', `${e.clientX}px`);
      spotRef.current?.style.setProperty('--sy', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="hero-section relative flex items-center justify-center px-4 pt-24 md:pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 hero-bg" style={{ backgroundImage: "url('/img/hero.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        <div className="absolute inset-0 hero-vignette" />
        <div ref={spotRef} className="absolute inset-0 hero-spot" />
        <div className="hero-ring hero-ring-1" />
        <div className="hero-ring hero-ring-2" />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden>
        {particles.map((p, i) => (
          <span
            key={i}
            className="gold-particle"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        <div className="logo-stage mx-auto mb-8 md:mb-10 w-full max-w-[22rem] sm:max-w-[34rem] md:max-w-[46rem]">
          <div className="logo-glow" aria-hidden />
          <div ref={logoRef} className="logo-tilt">
            <div className="logo-float">
              <div className="logo-intro relative">
                <img src="/img/logo.webp" alt="ЭкоФиш+ логотип" className="w-full relative z-[1] drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]" />
                <div className="logo-shine" aria-hidden />
              </div>
            </div>
          </div>
        </div>

        {content.heroTagline.trim() && (
          <p className="hero-line text-[11px] md:text-sm uppercase tracking-[0.25em] md:tracking-[0.45em] text-primary/90 mb-5 md:mb-6 max-w-xs sm:max-w-none mx-auto" style={{ animationDelay: '0.9s' }}>
            {content.heroTagline}
          </p>
        )}
        <h1 className="text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-[1.1]">
          {words(content.heroTitle).map((w, i) => (
            <span key={w + i} className="word-mask">
              <span className="word" style={{ animationDelay: `${1 + i * 0.08}s` }}>{w}</span>
            </span>
          ))}
          <br className="hidden md:block" />
          {words(content.heroTitleAccent).map((w, i) => (
            <span key={w + i} className="word-mask">
              <span className="word text-gold italic" style={{ animationDelay: `${1.35 + i * 0.08}s` }}>{w}</span>
            </span>
          ))}
        </h1>
        <p className="hero-line text-base md:text-xl mb-10 md:mb-12 text-muted-foreground max-w-2xl mx-auto whitespace-pre-line" style={{ animationDelay: '1.6s' }}>
          {content.heroText}
        </p>

        <div className="hero-line flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-xs sm:max-w-none mx-auto" style={{ animationDelay: '1.75s' }}>
          <a href="#products" className="btn-gold magnetic justify-center text-base px-8 py-4">
            {content.heroButtonMain}
            <Icon name="ArrowRight" size={18} />
          </a>
          <a href="#contact" className="btn-ghost-gold justify-center text-base px-8 py-4">
            {content.heroButtonSecond}
          </a>
        </div>

        {content.contacts.length > 0 && (
          <div className="hero-line mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center text-base" style={{ animationDelay: '1.9s' }}>
            {content.contacts.map((c, i) => (
              <div key={i} className="flex items-center gap-4 sm:gap-6">
                {i > 0 && <span className="hidden sm:block w-px h-5 bg-primary/30" />}
                <a href={telHref(c.phone)} className="flex items-center gap-3 text-foreground/95 hover:text-primary transition-colors">
                  <Icon name="Phone" size={18} className="text-primary" />
                  {c.name ? `${c.name}: ${c.phone}` : c.phone}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <a href="#products" className="scroll-cue hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-label="Прокрутить вниз">
        <span />
      </a>
    </section>
  );
};

export default Hero;