import Icon from '@/components/ui/icon';
import Reveal from '@/components/Reveal';

const steps = [
  { icon: 'PhoneCall', title: 'Заявка или звонок', text: 'Оставьте заявку на сайте или позвоните — подскажем по выбору и наличию.' },
  { icon: 'PackageCheck', title: 'Подготовка заказа', text: 'Собираем заказ из свежей продукции и бережно упаковываем с соблюдением холода.' },
  { icon: 'Truck', title: 'Доставка до стола', text: 'Привозим в удобное время — икра и рыба приезжают такими, какими покинули хозяйство.' },
];

const Steps = () => (
  <section className="py-24 md:py-32 px-4 relative">
    <div className="container mx-auto max-w-6xl">
      <Reveal className="text-center mb-16 md:mb-20">
        <p className="eyebrow mb-4">Как заказать</p>
        <h2 className="text-5xl md:text-7xl font-semibold">
          Три шага <span className="text-gold italic">до вкуса</span>
        </h2>
        <div className="gold-divider mx-auto mt-8" />
      </Reveal>

      <div className="relative grid md:grid-cols-3 gap-10 md:gap-8">
        <div className="steps-line hidden md:block" aria-hidden />
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 180} className="relative text-center">
            <div className="step-badge mx-auto mb-8">
              <Icon name={s.icon} size={28} />
              <span className="step-num">{i + 1}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-3">{s.title}</h3>
            <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Steps;
