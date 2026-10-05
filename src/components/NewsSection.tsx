import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import type { NewsItem } from '@/lib/api';

interface NewsSectionProps {
  news: NewsItem[];
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

const NewsSection = ({ news }: NewsSectionProps) => {
  const [opened, setOpened] = useState<NewsItem | null>(null);

  if (news.length === 0) return null;

  return (
    <section id="news" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-primary">Новости</h2>

        <div className="flex flex-wrap justify-center gap-8 [&>*]:w-full md:[&>*]:w-[calc(50%-1rem)] lg:[&>*]:w-[calc(33.333%-1.34rem)]">
          {news.map((item) => (
            <Card
              key={item.id}
              onClick={() => setOpened(item)}
              className="overflow-hidden rounded-3xl bg-secondary border-border hover:border-primary transition-all duration-300 cursor-pointer flex flex-col"
            >
              {item.image && (
                <div className="h-56 w-full shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                  <Icon name="Calendar" size={16} />
                  {formatDate(item.created_at)}
                </p>
                <h3 className="text-2xl font-bold mb-3 text-primary">{item.title}</h3>
                <p className="text-foreground/80 line-clamp-4 whitespace-pre-line flex-1">{item.content}</p>
                <span className="mt-4 text-primary font-semibold flex items-center gap-1">
                  Читать
                  <Icon name="ArrowRight" size={16} />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!opened} onOpenChange={(open) => !open && setOpened(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
          {opened && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl text-primary">{opened.title}</DialogTitle>
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