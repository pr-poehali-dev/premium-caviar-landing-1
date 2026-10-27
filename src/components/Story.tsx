import { Link } from "@/lib/router-compat";
import Icon from '@/components/ui/icon';
import Reveal from '@/components/Reveal';

const Story = () => (
  <section className="py-16 md:py-32 px-4 relative overflow-hidden">
    <div className="container mx-auto max-w-3xl text-center">
      <Reveal>
        <p className="eyebrow mb-4">Наша история</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 md:mb-8 leading-[1.05]">
          Десять лет <span className="text-gold italic">на течении</span> Ахтубы
        </h2>
        <div className="gold-divider mx-auto mb-8 md:mb-10" />
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
        <blockquote className="mt-8 md:mt-10 font-display text-2xl md:text-4xl italic text-gold">
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

export default Story;
