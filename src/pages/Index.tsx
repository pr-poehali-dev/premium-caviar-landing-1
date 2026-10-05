import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import ProductModal from '@/components/ProductModal';
import { productDescriptions } from '@/data/products';
import NewsSection from '@/components/NewsSection';
import { api, type Product, type NewsItem } from '@/lib/api';

const Index = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ title: string; description: string; image: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    api.getProducts().then(setProducts).catch(() => setProducts([]));
    api.getNews().then(setNews).catch(() => setNews([]));
  }, []);

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
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/files/d2e8c54f-396f-432a-a81b-2772b1d6842d.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)'
          }}
        />
        
        <div className="container mx-auto max-w-6xl relative z-10 animate-fade-in">
          <div className="text-center mb-12">
            <img 
              src="https://cdn.poehali.dev/files/16666.png" 
              alt="ЭкоФиш+ логотип"
              className="w-full max-w-[52rem] mx-auto mb-8"
            />
            <h2 className="text-4xl md:text-6xl font-semibold mb-6 text-foreground">Премиальная икра и рыба для особых моментов.</h2>
            <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto">
              Премиальная икра с бережной доставкой до вашего стола. Осётр и Стерлядь. 
              Идеально для праздника, ужина или особого подарка.
            </p>
            
            <div className="flex flex-col gap-6 justify-center items-center text-lg">
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="tel:89275731273" className="flex items-center gap-3 text-primary hover:text-accent transition-colors">
                  <Icon name="Phone" size={24} />
                  <span className="font-semibold">Валерий: 8 927 573 12 73</span>
                </a>
                <a href="tel:89275607919" className="flex items-center gap-3 text-primary hover:text-accent transition-colors">
                  <Icon name="Phone" size={24} />
                  <span className="font-semibold">Любовь: 8 927 560 79 19</span>
                </a>
              </div>
              <Link to="/about" className="text-primary hover:text-accent transition-colors underline">
                О нас
              </Link>
            </div>
          </div>
        </div>
      </section>

      <NewsSection news={news} />

      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-primary">
            Наши продукты
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {products.map((product) => (
              <Card
                key={product.id}
                className="p-8 rounded-3xl bg-secondary border-border hover:border-primary transition-all duration-300 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="mb-6">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover rounded-2xl mb-6"
                  />
                  <h3 className="text-3xl font-bold mb-4 text-primary">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                </div>

                {product.promo?.enabled ? (
                  <div className="bg-accent/10 p-6 rounded-2xl border-2 border-accent">
                    <p className="text-2xl font-bold text-accent mb-4">🎉 АКЦИЯ!</p>
                    <div className="space-y-2 text-foreground">
                      {product.promo.prices.map((priceItem, idx) => (
                        <p key={idx}>
                          • {priceItem.condition}:{' '}
                          <span className="font-bold text-accent">{Number(priceItem.price).toLocaleString('ru-RU')}₽</span>{' '}
                          <span className="line-through text-muted-foreground">
                            {Number(priceItem.oldPrice).toLocaleString('ru-RU')}₽
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted p-6 rounded-2xl">
                    <div className="text-2xl font-bold text-primary whitespace-pre-line">
                      {isNaN(Number(product.price)) || !product.price
                        ? product.price
                        : `${Number(product.price).toLocaleString('ru-RU')}₽/кг`}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 text-primary">
            Оставьте заявку
          </h2>
          <p className="text-center text-xl text-muted-foreground mb-12">
            Мы свяжемся с вами в ближайшее время
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-14 text-lg bg-card"
                required
              />
            </div>

            <div>
              <Input
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-14 text-lg bg-card"
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="privacy"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
              />
              <label htmlFor="privacy" className="text-sm text-muted-foreground cursor-pointer">
                Я согласен с{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  условиями обработки персональных данных
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </Button>
          </form>
        </div>
      </section>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Index;