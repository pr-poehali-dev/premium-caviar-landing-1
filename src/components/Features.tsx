import Icon from '@/components/ui/icon';
import Reveal from '@/components/Reveal';

const features = [
  { icon: 'Waves', title: 'Живая речная вода', text: 'Рыба растёт в садках прямо на течении Ахтубы — в полудиких условиях, с высоким уровнем кислорода.' },
  { icon: 'Snowflake', title: 'Зимовка подо льдом', text: 'Как и дикие осетры, наши рыбы пять зимних месяцев не питаются — отсюда плотное мясо и чистый вкус.' },
  { icon: 'ShieldCheck', title: 'Без химии', text: 'Только импортные осетровые корма с экспертизой каждой партии. Ни ГМО, ни антибиотиков.' },
  { icon: 'Gift', title: 'Достойный подарок', text: 'Икра в железных банках по 125 и 250 г — идеальна к праздничному столу или в подарок.' },
];

const Features = () => (
  <section className="py-24 md:py-32 px-4 relative">
    <div className="container mx-auto max-w-7xl">
      <Reveal className="text-center mb-16 md:mb-20">
        <p className="eyebrow mb-4">Почему ЭкоФиш+</p>
        <h2 className="text-5xl md:text-7xl font-semibold">
          Вкус, который <span className="text-gold italic">не подделать</span>
        </h2>
        <div className="gold-divider mx-auto mt-8" />
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 120} className="h-full">
            <div className="feature-card group h-full rounded-[2rem] p-8 border border-border bg-secondary/40">
              <div className="feature-icon mb-8">
                <Icon name={f.icon} size={26} />
              </div>
              <span className="block font-display text-sm text-primary/60 mb-2">0{i + 1}</span>
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
