import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Link } from "@/lib/router-compat";
import ProductModal from '@/components/ProductModal';
import { productDescriptions } from '@/data/products';
import NewsSection from '@/components/NewsSection';
import { api, type Product, type NewsItem } from '@/lib/api';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';
import Features from '@/components/Features';
import Story from '@/components/Story';
import Steps from '@/components/Steps';
import ScrollProgress from '@/components/ScrollProgress';
import { DEFAULT_CONTENT, telHref, type SiteContent } from '@/lib/site-content';

interface IndexProps {
  initialProducts?: Product[];
  initialNews?: NewsItem[];
  content?: SiteContent;
}

const Index = ({ initialProducts = [], initialNews = [], content = DEFAULT_CONTENT }: IndexProps) => {
  const c = content;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ title: string; description: string; image: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const { toast } = useToast();

  useEffect(() => {
    setProducts(initialProducts);
    setNews(initialNews);
  }, [initialProducts, initialNews]);

  const handleProductClick = (product: Product) => {
    const description = product.fullDescription || productDescriptions[product.title] || 'Описание недоступно';
    setSelectedProduct({ title: product.title, description, image: product.image });
    setIsModalOpen(true);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+7|8)?[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, введите ваше имя',
        variant: 'destructive'
      });
      return;
    }

    if (!validatePhone(phone)) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, введите корректный номер телефона',
        variant: 'destructive'
      });
      return;
    }

    if (!agreed) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, подтвердите согласие с условиями работы сайта',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await api.submitOrder(name, phone);
      toast({ title: 'Успешно!', description: data.message });
      setName('');
      setPhone('');
      setAgreed(false);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: (error as Error).message || 'Не удалось отправить заявку',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground grain">
      <ScrollProgress />
      <SiteHeader />
      <Hero content={c} />
      <Marquee text={c.marquee} />

      <section id="products" className="py-16 md:py-32 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <Reveal className="text-center mb-10 md:mb-20">
            <p className="eyebrow mb-4">{c.productsEyebrow}</p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-gold">{c.productsTitle}</h2>
            <div className="gold-divider mx-auto mt-8" />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            {products.map((product, idx) => (
              <Reveal key={product.id} delay={(idx % 2) * 120}>
                <TiltCard
                  className="group h-full p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-border bg-secondary/60 cursor-pointer flex flex-col"
                  onClick={() => handleProductClick(product)}
                  max={5}
                >
                  <div className="relative overflow-hidden rounded-[1.1rem] md:rounded-[1.5rem] mb-5 md:mb-6">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-56 sm:h-72 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-80" />
                    {product.promo?.enabled && (
                      <span className="absolute top-4 left-4 promo-badge">Акция</span>
                    )}
                    <span className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <Icon name="ArrowUpRight" size={20} />
                    </span>
                  </div>

                  <div className="px-1 md:px-2 flex-1">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 md:mb-3 text-primary">{product.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">{product.description}</p>
                  </div>

                  {product.promo?.enabled ? (
                    <div className="p-4 md:p-5 rounded-2xl border border-primary/50 bg-primary/5">
                      <div className="space-y-2 text-foreground">
                        {product.promo.prices.map((priceItem, i) => (
                          <p key={i} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-2 sm:gap-x-3 text-sm sm:text-base">
                            <span className="text-muted-foreground leading-snug">{priceItem.condition}</span>
                            <span className="font-display text-xl sm:text-2xl font-semibold text-gold">
                              {Number(priceItem.price).toLocaleString('ru-RU')}₽
                            </span>
                            <span className="line-through text-muted-foreground text-xs sm:text-sm">
                              {Number(priceItem.oldPrice).toLocaleString('ru-RU')}₽
                            </span>
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3 p-4 md:p-5 rounded-2xl bg-background/50 border border-border">
                      <div className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-gold whitespace-pre-line">
                        {isNaN(Number(product.price)) || !product.price
                          ? product.price
                          : `${Number(product.price).toLocaleString('ru-RU')}₽/кг`}
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground shrink-0">Подробнее</span>
                    </div>
                  )}
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Features content={c} />
      <Story content={c} />
      <NewsSection news={news} eyebrow={c.newsEyebrow} title={c.newsTitle} />
      <Steps content={c} />

      <section id="contact" className="py-16 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 contact-glow pointer-events-none" aria-hidden />
        <div className="container mx-auto max-w-6xl relative grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-2">
            <p className="eyebrow mb-4">{c.contactEyebrow}</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 md:mb-6 leading-[1.05]">
              {c.contactTitle} <span className="text-gold italic">{c.contactTitleAccent}</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-10 whitespace-pre-line">{c.contactText}</p>
            <div className="space-y-4">
              {c.contacts.map((ct, i) => (
                <a key={i} href={telHref(ct.phone)} className="contact-pill group">
                  <span className="w-12 h-12 shrink-0 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon name="Phone" size={20} />
                  </span>
                  <span>
                    {ct.name && <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">{ct.name}</span>}
                    <span className="block font-display text-xl sm:text-2xl text-foreground group-hover:text-primary transition-colors">{ct.phone}</span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-3">
            <div className="glass-card gold-border rounded-[1.5rem] md:rounded-[2rem] p-5 sm:p-8 md:p-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">{c.formTitle}</h3>
              {c.formSubtitle.trim() && <p className="text-muted-foreground mb-8">{c.formSubtitle}</p>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-14 text-lg bg-background/60 rounded-2xl px-5 focus-visible:ring-primary"
                required
              />
              <Input
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-14 text-lg bg-background/60 rounded-2xl px-5 focus-visible:ring-primary"
                required
              />

              <div className="flex items-start gap-3">
                <Checkbox className="mt-0.5" id="privacy" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
                <label htmlFor="privacy" className="text-sm text-muted-foreground cursor-pointer">
                  Я согласен с{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    условиями обработки персональных данных
                  </Link>
                </label>
              </div>

              <Button type="submit" className="btn-gold-solid w-full h-14 text-lg font-semibold rounded-2xl" disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : c.formButton}
              </Button>
            </form>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Index;