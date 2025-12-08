import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/ee5f99f2-50ce-4388-9019-c03f40d677f6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Успешно!',
          description: data.message,
        });
        setName('');
        setPhone('');
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Что-то пошло не так',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить заявку',
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
              src="https://cdn.poehali.dev/files/log.png" 
              alt="ЭкоФиш+ логотип"
              className="w-full max-w-2xl mx-auto mb-8"
            />
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-primary">ЭКОФИШ+</h1>
            <h2 className="text-4xl md:text-6xl font-semibold mb-6 text-foreground">Премиальная икра и рыба для особых моментов.</h2>
            <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto">
              Премиальная икра с бережной доставкой до вашего стола. Осётр и Стерлядь. 
              Идеально для праздника, ужина или особого подарка.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-lg">
              <a href="tel:89275731273" className="flex items-center gap-3 text-primary hover:text-accent transition-colors">
                <Icon name="Phone" size={24} />
                <span className="font-semibold">Валерий: 8 927 573 12 73</span>
              </a>
              <a href="tel:89275607919" className="flex items-center gap-3 text-primary hover:text-accent transition-colors">
                <Icon name="Phone" size={24} />
                <span className="font-semibold">Любовь: 8 927 560 79 19</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-primary">
            Наши продукты
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <Card className="p-8 rounded-3xl bg-secondary border-border hover:border-primary transition-all duration-300">
              <div className="mb-6">
                <img 
                  src="https://cdn.poehali.dev/files/9575a1b8-bdfd-49d4-9b7d-87fb792715af.jpeg" 
                  alt="Черная икра"
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <h3 className="text-3xl font-bold mb-4 text-primary">
                  Икра черная, зернистая, малосольная
                </h3>
                <p className="text-sm text-muted-foreground mb-4">* без консервантов. Икра упакована в железные банки под резинкой по 125 и 250 грамм. Без дополнительной пастеризации. </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-accent/10 p-6 rounded-2xl border-2 border-accent">
                  <p className="text-2xl font-bold text-accent mb-2">🎉 АКЦИЯ!</p>
                  <p className="text-xl font-semibold text-foreground mb-3">Икра стерляди</p>
                  <div className="space-y-2 text-foreground">
                    <p>• При покупке менее 1 кг: <span className="font-bold text-accent">44 000₽/кг</span> <span className="line-through text-muted-foreground">48 000₽</span></p>
                    <p>• При покупке более 1 кг: <span className="font-bold text-accent">42 000₽/кг</span> <span className="line-through text-muted-foreground">48 000₽</span></p>
                    <p>• При покупке более 3 кг: <span className="font-bold text-accent">40 000₽/кг</span> <span className="line-through text-muted-foreground">48 000₽</span></p>
                  </div>
                </div>
                
                <div className="bg-muted p-6 rounded-2xl">
                  <p className="text-xl font-semibold text-foreground mb-3">Икра осетра</p>
                  <p className="text-2xl font-bold text-primary">56 000₽/кг</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 rounded-3xl bg-secondary border-border hover:border-primary transition-all duration-300">
              <div className="mb-6">
                <img 
                  src="https://cdn.poehali.dev/files/3ca82909-641c-4602-bfb2-6fe536bb5c92.jpg" 
                  alt="Осетр"
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <h3 className="text-3xl font-bold mb-4 text-primary">
                  Осетр речной
                </h3>
                <p className="text-sm text-muted-foreground mb-4">непотрошенный охлажденный или быстрозамороженный</p>
              </div>
              
              <div className="space-y-3 text-foreground">
                <p>• 3-4 кг: <span className="font-bold text-primary">1 750₽/кг</span></p>
                <p>• 4-5 кг: <span className="font-bold text-primary">1 850₽/кг</span></p>
                <p>• 5-6 кг: <span className="font-bold text-primary">1 950₽/кг</span></p>
                <p>• 6-8 кг: <span className="font-bold text-accent">1 900₽/кг</span> <span className="line-through text-muted-foreground">2 050₽</span></p>
                <p>• 8-10 кг: <span className="font-bold text-accent">2 000₽/кг</span> <span className="line-through text-muted-foreground">2 150₽</span></p>
                <p>• 10+ кг: <span className="font-bold text-primary">2 250₽/кг</span></p>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-xl font-semibold text-foreground mb-3">Стерлядь речная</h4>
                <p className="text-sm text-muted-foreground mb-3">охлажденная или быстрозамороженная</p>
                <div className="space-y-2 text-foreground">
                  <p>• До 1,5 кг: <span className="font-bold text-accent">1 500₽/кг</span> <span className="line-through text-muted-foreground">1 650₽</span></p>
                  <p>• От 1,5 кг: <span className="font-bold text-primary">1 650₽/кг</span></p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 rounded-3xl bg-secondary border-border hover:border-primary transition-all duration-300">
              <div className="mb-6">
                <img 
                  src="https://cdn.poehali.dev/files/1b8f68c0-aad2-4739-b844-9534565e018e.jpg" 
                  alt="Осетр копченый"
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <h3 className="text-3xl font-bold mb-4 text-primary">
                  Осетр горячего копчения
                </h3>
                <p className="text-sm text-muted-foreground mb-4">на опилках (ветла + груша + ольха)</p>
              </div>
              
              <div className="space-y-4 text-foreground">
                <div className="bg-muted p-4 rounded-2xl">
                  <p className="text-xl font-bold text-primary mb-2">3 600₽/кг</p>
                  <p className="text-sm text-muted-foreground">2,5-3,5 кг/шт, потрошенный, с головой и хвостом</p>
                </div>
                <div className="bg-muted p-4 rounded-2xl">
                  <p className="text-xl font-bold text-primary mb-2">3 950₽/кг</p>
                  <p className="text-sm text-muted-foreground">2,2-3,3 кг/шт, потрошенный, без головы и хвоста</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 rounded-3xl bg-secondary border-border hover:border-primary transition-all duration-300">
              <div className="mb-6">
                <img 
                  src="https://cdn.poehali.dev/files/9c0d4146-c300-40a2-b66e-91bd6a386faf.jpg" 
                  alt="Балык"
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <h3 className="text-3xl font-bold mb-4 text-primary">
                  Балык-книжка из осетра
                </h3>
                <p className="text-sm text-muted-foreground mb-4">холодного копчения на опилках (шелковица)</p>
              </div>
              
              <div className="bg-muted p-6 rounded-2xl">
                <p className="text-3xl font-bold text-primary mb-3">4 900₽/кг</p>
                <p className="text-sm text-muted-foreground">около 2,5-4 кг без головы и хвоста</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-primary">Всего 3 шага</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 rounded-3xl bg-card text-center hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Search" size={40} className="text-background" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Шаг 1</h3>
              <p className="text-lg text-muted-foreground">Выберите продукт</p>
            </Card>

            <Card className="p-8 rounded-3xl bg-card text-center hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Phone" size={40} className="text-background" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Шаг 2</h3>
              <p className="text-lg text-muted-foreground">Позвоните нам или оставьте свой номер</p>
            </Card>

            <Card className="p-8 rounded-3xl bg-card text-center hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Package" size={40} className="text-background" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Шаг 3</h3>
              <p className="text-lg text-muted-foreground">Получите свежий продукт в надежной упаковке у себя дома</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
            Превратите ваш вечер в событие
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground">
            Закажите икру прямо сейчас и получите бесплатную доставку по Москве
          </p>

          <Card className="p-8 rounded-3xl bg-secondary border-2 border-primary">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-lg p-6 rounded-2xl bg-background border-border focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <Input
                  type="tel"
                  placeholder="Ваш телефон (например, +7 999 123 45 67)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-lg p-6 rounded-2xl bg-background border-border focus:border-primary"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-xl py-6 rounded-2xl bg-primary hover:bg-accent text-background font-bold transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? 'Отправка...' : 'Мы вам позвоним'}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <footer className="py-8 px-4 bg-background border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="text-lg">© 2025 ООО "ЭКОФИШ +". Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;