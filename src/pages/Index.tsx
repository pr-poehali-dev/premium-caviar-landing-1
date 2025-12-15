import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
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

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 rounded-3xl bg-secondary border-border hover:border-primary transition-all duration-300">
              <div className="mb-6">
                <img 
                  src="https://cdn.poehali.dev/files/5314803716072344646.jpg" 
                  alt="Икра осетра"
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <h3 className="text-3xl font-bold mb-4 text-primary">
                  Икра осетра
                </h3>
                <p className="text-sm text-muted-foreground mb-4">Черная зернистая малосольная икра без консервантов. Упакована в железные банки под резинкой по 125 и 250 грамм. Без дополнительной пастеризации.</p>
              </div>
              
              <div className="bg-muted p-6 rounded-2xl">
                <p className="text-2xl font-bold text-primary">56 000₽/кг</p>
              </div>
            </Card>

            <Card className="p-8 rounded-3xl bg-secondary border-border hover:border-primary transition-all duration-300">
              <div className="mb-6">
                <img 
                  src="https://cdn.poehali.dev/files/WhatsApp-Image-2023-11-24-at-22.38.04.jpeg" 
                  alt="Икра стерляди"
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <h3 className="text-3xl font-bold mb-4 text-primary">
                  Икра стерляди
                </h3>
                <p className="text-sm text-muted-foreground mb-4">Черная зернистая малосольная икра без консервантов. Упакована в железные банки под резинкой по 125 и 250 грамм. Без дополнительной пастеризации.</p>
              </div>
              
              <div className="bg-accent/10 p-6 rounded-2xl border-2 border-accent">
                <p className="text-2xl font-bold text-accent mb-4">🎉 АКЦИЯ!</p>
                <div className="space-y-2 text-foreground">
                  <p>• При покупке менее 1 кг: <span className="font-bold text-accent">44 000₽/кг</span> <span className="line-through text-muted-foreground">48 000₽</span></p>
                  <p>• При покупке более 1 кг: <span className="font-bold text-accent">42 000₽/кг</span> <span className="line-through text-muted-foreground">48 000₽</span></p>
                  <p>• При покупке более 3 кг: <span className="font-bold text-accent">40 000₽/кг</span> <span className="line-through text-muted-foreground">48 000₽</span></p>
                </div>
              </div>
            </Card>

            <Card className="p-8 rounded-3xl bg-secondary border-border hover:border-primary transition-all duration-300">
              <div className="mb-6">
                <img 
                  src="https://cdn.poehali.dev/files/осетр%20свежий.jpg" 
                  alt="Осетр"
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <h3 className="text-3xl font-bold mb-4 text-primary">
                  Осетр речной
                </h3>
                <p className="text-sm text-muted-foreground mb-4">Непотрошенный охлажденный или быстрозамороженный</p>
              </div>
              
              <div className="space-y-3 text-foreground">
                <p>• 3-4 кг: <span className="font-bold text-primary">1 750₽/кг</span></p>
                <p>• 4-5 кг: <span className="font-bold text-primary">1 850₽/кг</span></p>
                <p>• 5-6 кг: <span className="font-bold text-primary">1 950₽/кг</span></p>
                <p>• 6-8 кг: <span className="font-bold text-accent">1 900₽/кг</span> <span className="line-through text-muted-foreground">2 050₽</span></p>
                <p>• 8-10 кг: <span className="font-bold text-accent">2 000₽/кг</span> <span className="line-through text-muted-foreground">2 150₽</span></p>
                <p>• 10+ кг: <span className="font-bold text-primary">2 250₽/кг</span></p>
              </div>
            </Card>

            <Card className="p-8 rounded-3xl bg-secondary border-border hover:border-primary transition-all duration-300">
              <div className="mb-6">
                <img 
                  src="https://cdn.poehali.dev/files/5314803716072344648.jpg" 
                  alt="Стерлядь речная"
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <h3 className="text-3xl font-bold mb-4 text-primary">
                  Стерлядь речная
                </h3>
                <p className="text-sm text-muted-foreground mb-4">Охлажденная или быстрозамороженная</p>
              </div>
              
              <div className="space-y-2 text-foreground">
                <p>• До 1,5 кг: <span className="font-bold text-accent">1 500₽/кг</span> <span className="line-through text-muted-foreground">1 650₽</span></p>
                <p>• От 1,5 кг: <span className="font-bold text-primary">1 650₽/кг</span></p>
              </div>
            </Card>

            <Card className="p-8 rounded-3xl bg-secondary border-border hover:border-primary transition-all duration-300">
              <div className="mb-6">
                <img 
                  src="https://cdn.poehali.dev/files/бгбх.jpg" 
                  alt="Осетр горячего копчения"
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <h3 className="text-3xl font-bold mb-4 text-primary">
                  Осетр горячего копчения
                </h3>
                <p className="text-sm text-muted-foreground mb-4">На опилках (ветла + груша + ольха)</p>
                <p className="text-sm text-muted-foreground mb-4">2,2-3,3 кг/шт, потрошенный, без головы и хвоста</p>
              </div>
              
              <div className="bg-muted p-6 rounded-2xl">
                <p className="text-2xl font-bold text-primary">3 950₽/кг</p>
              </div>
            </Card>

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
                <div className="bg-muted p-4 rounded-2xl my-3.5 py-0">
                  <p className="font-bold text-primary mb-2 text-sm text-center">Красивая  подача на вашем столе! </p>
                  <p className="text-sm text-muted-foreground"></p>
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
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-primary">Всего 3 шага:</h2>
          
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
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground">Позвоните нам прямо сейчас</p>

          <Card className="p-8 rounded-3xl bg-secondary border-2 border-primary">
            <div className="space-y-6">
              <a href="tel:89275731273" className="flex items-center justify-center gap-4 text-2xl text-primary hover:text-accent transition-colors p-6 bg-background rounded-2xl hover:scale-105 transform duration-300">
                <Icon name="Phone" size={32} />
                <div className="text-left">
                  <div className="text-sm text-muted-foreground">Валерий</div>
                  <div className="font-bold">8 927 573 12 73</div>
                </div>
              </a>
              
              <a href="tel:89275607919" className="flex items-center justify-center gap-4 text-2xl text-primary hover:text-accent transition-colors p-6 bg-background rounded-2xl hover:scale-105 transform duration-300">
                <Icon name="Phone" size={32} />
                <div className="text-left">
                  <div className="text-sm text-muted-foreground">Любовь</div>
                  <div className="font-bold">8 927 560 79 19</div>
                </div>
              </a>
            </div>
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