import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const particles = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 2 + ((i * 7) % 5),
  delay: (i * 0.73) % 9,
  duration: 9 + ((i * 3) % 8),
}));

const Hero = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logoRef.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 5}deg)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 hero-bg" style={{ backgroundImage: "url('/img/hero.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        <div className="absolute inset-0 hero-vignette" />
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
        <div className="logo-stage mx-auto mb-10 w-full max-w-[46rem]">
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

        <p className="hero-line text-xs md:text-sm uppercase tracking-[0.45em] text-primary/90 mb-6" style={{ animationDelay: '0.9s' }}>
          Ахтуба · Астраханская область · с 2013 года
        </p>
        <h1 className="hero-line text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-[1.1]" style={{ animationDelay: '1.05s' }}>
          Премиальная икра и рыба <br className="hidden md:block" />
          <span className="text-gold italic">для особых моментов</span>
        </h1>
        <p className="hero-line text-lg md:text-xl mb-12 text-muted-foreground max-w-2xl mx-auto" style={{ animationDelay: '1.2s' }}>
          Осётр и стерлядь из чистой проточной воды. Бережная доставка до вашего стола — для праздника, ужина или особого подарка.
        </p>

        <div className="hero-line flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ animationDelay: '1.35s' }}>
          <a href="#products" className="btn-gold text-base px-8 py-4">
            Смотреть продукцию
            <Icon name="ArrowRight" size={18} />
          </a>
          <a href="#contact" className="btn-ghost-gold text-base px-8 py-4">
            Оставить заявку
          </a>
        </div>

        <div className="hero-line mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center text-base" style={{ animationDelay: '1.5s' }}>
          <a href="tel:89275731273" className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors">
            <Icon name="Phone" size={18} className="text-primary" />
            Валерий: 8 927 573 12 73
          </a>
          <span className="hidden sm:block w-px h-5 bg-primary/30" />
          <a href="tel:89275607919" className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors">
            <Icon name="Phone" size={18} className="text-primary" />
            Любовь: 8 927 560 79 19
          </a>
        </div>
      </div>

      <a href="#products" className="scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-label="Прокрутить вниз">
        <span />
      </a>
    </section>
  );
};

export default Hero;
