import { useEffect, useRef } from 'react';
import { Link } from "@/lib/router-compat";
import Icon from '@/components/ui/icon';
import Reveal from '@/components/Reveal';

const Story = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) return;
    let raf = 0;
    const update = () => {
      const box = boxRef.current;
      const img = imgRef.current;
      if (!box || !img) return;
      const r = box.getBoundingClientRect();
      const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      img.style.transform = `translateY(${p * -60}px) scale(1.15)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="py-16 md:py-32 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <Reveal>
          <div ref={boxRef} className="story-frame relative rounded-[2.5rem] overflow-hidden h-[360px] sm:h-[460px] md:h-[600px]">
            <img
              ref={imgRef}
              src="/img/about.jpg"
              alt="Хозяйство ЭкоФиш+ на реке Ахтуба"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                <Icon name="MapPin" size={22} />
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm sm:text-base">Затон «Бочек», река Ахтуба</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Харабалинский район, Астраханская обл.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <p className="eyebrow mb-4">Наша история</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 md:mb-8 leading-[1.05]">
            Десять лет <span className="text-gold italic">на течении</span> Ахтубы
          </h2>
          <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed">
            <p>
              В 2014 году мы спустили на воду первые садки. С тех пор лёд трижды ломал нашу садковую линию — и каждый раз мы
              восстанавливали её, наращивая стадо.
            </p>
            <p>
              Сегодня наши осетры и стерлядь живут в чистой проточной воде почти как дикие. Это дороже, но мы относимся
              к этому философски — <span className="text-primary">это плата за качество рыбы и икры.</span>
            </p>
          </div>
          <blockquote className="mt-8 md:mt-10 pl-5 md:pl-6 border-l-2 border-primary/60 font-display text-xl md:text-3xl italic text-foreground/90">
            «Скучать нам не приходится!»
          </blockquote>
          <Link to="/about" className="btn-ghost-gold mt-8 md:mt-10 px-7 py-3.5">
            Читать историю полностью
            <Icon name="ArrowRight" size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default Story;
