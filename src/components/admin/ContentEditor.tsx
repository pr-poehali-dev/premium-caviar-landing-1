import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { api } from '@/lib/api';
import { DEFAULT_CONTENT, type CardText, type Contact, type SiteContent } from '@/lib/site-content';

interface ContentEditorProps {
  notify: (type: 'success' | 'error', message: string) => void;
}

type StrKey = { [K in keyof SiteContent]: SiteContent[K] extends string ? K : never }[keyof SiteContent];

const Section = ({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) => (
  <Card className="p-5 md:p-6">
    <h3 className="text-xl font-semibold text-primary">{title}</h3>
    {hint && <p className="text-sm text-slate-300 mt-1">{hint}</p>}
    <div className="mt-5 space-y-4">{children}</div>
  </Card>
);

const ContentEditor = ({ notify }: ContentEditorProps) => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saved, setSaved] = useState<string>('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .getContent()
      .then((c) => {
        setContent(c);
        setSaved(JSON.stringify(c));
      })
      .catch((e) => {
        notify('error', (e as Error).message);
        setContent(DEFAULT_CONTENT);
        setSaved(JSON.stringify(DEFAULT_CONTENT));
      });
  }, [notify]);

  if (!content) {
    return (
      <Card className="p-12 text-center text-slate-300">
        <Icon name="Loader2" size={28} className="mx-auto mb-3 animate-spin" />
        Загружаю тексты…
      </Card>
    );
  }

  const dirty = JSON.stringify(content) !== saved;
  const set = (key: StrKey, value: string) => setContent({ ...content, [key]: value });

  const field = (key: StrKey, label: string, opts: { area?: boolean; rows?: number; hint?: string } = {}) => (
    <div>
      <Label htmlFor={key}>{label}</Label>
      {opts.area ? (
        <Textarea id={key} rows={opts.rows ?? 3} value={content[key]} onChange={(e) => set(key, e.target.value)} className="mt-1.5" />
      ) : (
        <Input id={key} value={content[key]} onChange={(e) => set(key, e.target.value)} className="mt-1.5" />
      )}
      {opts.hint && <p className="text-xs text-slate-400 mt-1">{opts.hint}</p>}
    </div>
  );

  const titleRow = (eyebrow: StrKey, title: StrKey, accent?: StrKey, end?: StrKey) => (
    <div className="grid gap-4 md:grid-cols-2">
      {field(eyebrow, 'Надпись над заголовком')}
      {field(title, accent ? 'Заголовок (белая часть)' : 'Заголовок')}
      {accent && field(accent, 'Заголовок (золотая часть)')}
      {end && field(end, 'Заголовок (окончание)')}
    </div>
  );

  const cardList = (key: 'features' | 'steps', label: string, max: number) => {
    const list = content[key];
    const update = (next: CardText[]) => setContent({ ...content, [key]: next });
    return (
      <div className="space-y-3">
        {list.map((item, i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-100">
                {label} {i + 1}
              </span>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={i === 0}
                  onClick={() => {
                    const next = [...list];
                    [next[i - 1], next[i]] = [next[i], next[i - 1]];
                    update(next);
                  }}
                  aria-label="Выше"
                >
                  <Icon name="ArrowUp" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={i === list.length - 1}
                  onClick={() => {
                    const next = [...list];
                    [next[i + 1], next[i]] = [next[i], next[i + 1]];
                    update(next);
                  }}
                  aria-label="Ниже"
                >
                  <Icon name="ArrowDown" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-600"
                  disabled={list.length <= 1}
                  onClick={() => update(list.filter((_, j) => j !== i))}
                  aria-label="Удалить"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
            <Input
              placeholder="Заголовок"
              value={item.title}
              onChange={(e) => update(list.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))}
            />
            <Textarea
              placeholder="Текст"
              rows={2}
              value={item.text}
              onChange={(e) => update(list.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))}
            />
          </div>
        ))}
        {list.length < max && (
          <Button variant="outline" size="sm" onClick={() => update([...list, { title: '', text: '' }])}>
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить
          </Button>
        )}
      </div>
    );
  };

  const contacts = content.contacts;
  const updateContacts = (next: Contact[]) => setContent({ ...content, contacts: next });

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await api.saveContent(content);
      setContent(result);
      setSaved(JSON.stringify(result));
      notify('success', 'Тексты сохранены — они уже на сайте');
    } catch (e) {
      notify('error', (e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!confirm('Вернуть все тексты к исходным? Изменения появятся на сайте после сохранения.')) return;
    setContent(DEFAULT_CONTENT);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-28">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Тексты главной страницы</h2>
          <p className="text-slate-500 mt-1">Измените нужные поля и нажмите «Сохранить» внизу экрана.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="/" target="_blank" rel="noreferrer">
              <Icon name="ExternalLink" size={16} className="mr-2" />
              Открыть сайт
            </a>
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Исходные тексты
          </Button>
        </div>
      </div>

      <Section title="Первый экран" hint="Самое первое, что видит посетитель под логотипом">
        {field('heroTagline', 'Строка над заголовком')}
        <div className="grid gap-4 md:grid-cols-2">
          {field('heroTitle', 'Заголовок (белая часть)')}
          {field('heroTitleAccent', 'Заголовок (золотая часть)')}
        </div>
        {field('heroText', 'Описание', { area: true })}
        <div className="grid gap-4 md:grid-cols-2">
          {field('heroButtonMain', 'Золотая кнопка')}
          {field('heroButtonSecond', 'Вторая кнопка')}
        </div>
      </Section>

      <Section title="Телефоны" hint="Показываются на первом экране и в блоке заявки">
        {contacts.map((ct, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
            <div>
              <Label>Имя</Label>
              <Input
                className="mt-1.5"
                value={ct.name}
                onChange={(e) => updateContacts(contacts.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
              />
            </div>
            <div>
              <Label>Телефон</Label>
              <Input
                className="mt-1.5"
                value={ct.phone}
                onChange={(e) => updateContacts(contacts.map((x, j) => (j === i ? { ...x, phone: e.target.value } : x)))}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-600"
              onClick={() => updateContacts(contacts.filter((_, j) => j !== i))}
              aria-label="Удалить телефон"
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        ))}
        {contacts.length < 4 && (
          <Button variant="outline" size="sm" onClick={() => updateContacts([...contacts, { name: '', phone: '' }])}>
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить телефон
          </Button>
        )}
      </Section>

      <Section title="Бегущая строка" hint="Каждая фраза — с новой строки">
        {field('marquee', 'Фразы', { area: true, rows: 6 })}
      </Section>

      <Section title="Каталог">{titleRow('productsEyebrow', 'productsTitle')}</Section>

      <Section title="Преимущества">
        {titleRow('featuresEyebrow', 'featuresTitle', 'featuresTitleAccent')}
        {cardList('features', 'Карточка', 8)}
      </Section>

      <Section title="Наша история">
        <div className="grid gap-4 md:grid-cols-2">
          {field('storyEyebrow', 'Надпись над заголовком')}
          {field('storyTitle', 'Заголовок (начало)')}
          {field('storyTitleAccent', 'Заголовок (золотая часть)')}
          {field('storyTitleEnd', 'Заголовок (окончание)')}
        </div>
        {field('storyText', 'Текст', { area: true, rows: 7, hint: 'Чтобы начать новый абзац, оставьте пустую строку' })}
        <div className="grid gap-4 md:grid-cols-2">
          {field('storyQuote', 'Цитата', { hint: 'Оставьте пустым, чтобы скрыть' })}
          {field('storyButton', 'Текст кнопки')}
        </div>
      </Section>

      <Section title="Новости" hint="Сами новости редактируются во вкладке «Новости»">
        {titleRow('newsEyebrow', 'newsTitle')}
      </Section>

      <Section title="Как заказать">
        {titleRow('stepsEyebrow', 'stepsTitle', 'stepsTitleAccent')}
        {cardList('steps', 'Шаг', 5)}
      </Section>

      <Section title="Блок заявки">
        {titleRow('contactEyebrow', 'contactTitle', 'contactTitleAccent')}
        {field('contactText', 'Текст под заголовком', { area: true, rows: 2 })}
        <div className="grid gap-4 md:grid-cols-3">
          {field('formTitle', 'Заголовок формы')}
          {field('formSubtitle', 'Подпись формы')}
          {field('formButton', 'Кнопка отправки')}
        </div>
      </Section>

      <div className="fixed bottom-0 inset-x-0 z-40 border-t bg-white/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <span className={`text-sm ${dirty ? 'text-amber-600' : 'text-slate-500'}`}>
            {dirty ? 'Есть несохранённые изменения' : 'Все изменения сохранены'}
          </span>
          <div className="flex gap-2">
            {dirty && (
              <Button variant="ghost" onClick={() => setContent(JSON.parse(saved))} disabled={saving}>
                Отменить
              </Button>
            )}
            <Button onClick={handleSave} disabled={!dirty || saving} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Icon name="Save" size={18} className="mr-2" />
              {saving ? 'Сохранение…' : 'Сохранить'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;