import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import type { NewsItem } from '@/lib/api';
import Reveal from '@/components/Reveal';

interface NewsSectionProps {
  news: NewsItem[];
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

const NewsSection = ({ news }: NewsSectionProps) => {
  const [opened, setOpened] = useState<NewsItem | null>(null);

  if (news.length === 0) return null;

  return (
    <section id="news" className="py-16 md:py-32 px-4 bg-card/30 border-y border-primary/10">
      <div className="container mx-auto max-w-7xl">
        <Reveal className="text-center mb-10 md:mb-16">
          <p className="eyebrow mb-4">Из хозяйства</p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-gold">Новости</h2>
          <div className="gold-divider mx-auto mt-8" />
        </Reveal>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 [&>*]:w-full md:[&>*]:w-[calc(50%-1rem)] lg:[&>*]:w-[calc(33.333%-1.34rem)]">
          {news.map((item, idx) => (
            <Reveal key={item.id} delay={(idx % 3) * 120}>
            <Card
              onClick={() => setOpened(item)}
              className="product-card group h-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-secondary/60 border-border cursor-pointer flex flex-col"
            >
              {item.image && (
                <div className="h-56 w-full shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                </div>
              )}
              <div className="p-5 md:p-6 flex flex-col flex-1">
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                  <Icon name="Calendar" size={16} />
                  {formatDate(item.created_at)}
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-primary">{item.title}</h3>
                <p className="text-foreground/80 line-clamp-4 whitespace-pre-line flex-1">{item.content}</p>
                <span className="mt-4 text-primary font-semibold flex items-center gap-1">
                  Читать
                  <Icon name="ArrowRight" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Card>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={!!opened} onOpenChange={(open) => !open && setOpened(null)}>
        <DialogContent className="w-[calc(100%-1.5rem)] max-w-2xl max-h-[88svh] overflow-y-auto bg-card rounded-2xl p-5 sm:p-6">
          {opened && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl sm:text-3xl text-primary pr-6 text-left">{opened.title}</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">{formatDate(opened.created_at)}</p>
              {opened.image && <img src={opened.image} alt={opened.title} className="w-full rounded-2xl" />}
              <p className="text-foreground whitespace-pre-line leading-relaxed">{opened.content}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default NewsSection;