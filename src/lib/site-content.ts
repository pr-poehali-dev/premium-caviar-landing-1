export interface CardText {
  title: string;
  text: string;
}

export interface Contact {
  name: string;
  phone: string;
}

export interface SiteContent {
  heroTagline: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroText: string;
  heroButtonMain: string;
  heroButtonSecond: string;
  contacts: Contact[];
  marquee: string;
  productsEyebrow: string;
  productsTitle: string;
  featuresEyebrow: string;
  featuresTitle: string;
  featuresTitleAccent: string;
  features: CardText[];
  storyEyebrow: string;
  storyTitle: string;
  storyTitleAccent: string;
  storyTitleEnd: string;
  storyText: string;
  storyQuote: string;
  storyButton: string;
  newsEyebrow: string;
  newsTitle: string;
  stepsEyebrow: string;
  stepsTitle: string;
  stepsTitleAccent: string;
  steps: CardText[];
  contactEyebrow: string;
  contactTitle: string;
  contactTitleAccent: string;
  contactText: string;
  formTitle: string;
  formSubtitle: string;
  formButton: string;
}

export const DEFAULT_CONTENT: SiteContent = {
  heroTagline: 'Ахтуба · Астраханская область · с 2013 года',
  heroTitle: 'Премиальная икра и рыба',
  heroTitleAccent: 'для особых моментов',
  heroText:
    'Осётр и стерлядь из чистой проточной воды. Бережная доставка до вашего стола — для праздника, ужина или особого подарка.',
  heroButtonMain: 'Смотреть продукцию',
  heroButtonSecond: 'Оставить заявку',
  contacts: [
    { name: 'Валерий', phone: '8 927 573 12 73' },
    { name: 'Любовь', phone: '8 927 560 79 19' },
  ],
  marquee: 'Без консервантов\nРека Ахтуба\nСобственное хозяйство\nОсётр и стерлядь\nБережная доставка\nБез ГМО и антибиотиков',
  productsEyebrow: 'Каталог',
  productsTitle: 'Наши продукты',
  featuresEyebrow: 'Почему ЭкоФиш+',
  featuresTitle: 'Вкус, который',
  featuresTitleAccent: 'не подделать',
  features: [
    { title: 'Живая речная вода', text: 'Рыба растёт в садках прямо на течении Ахтубы — в полудиких условиях, с высоким уровнем кислорода.' },
    { title: 'Зимовка подо льдом', text: 'Как и дикие осетры, наши рыбы пять зимних месяцев не питаются — отсюда плотное мясо и чистый вкус.' },
    { title: 'Без химии', text: 'Только импортные осетровые корма с экспертизой каждой партии. Ни ГМО, ни антибиотиков.' },
    { title: 'Достойный подарок', text: 'Икра в железных банках по 125 и 250 г — идеальна к праздничному столу или в подарок.' },
  ],
  storyEyebrow: 'Наша история',
  storyTitle: 'Десять лет',
  storyTitleAccent: 'на течении',
  storyTitleEnd: 'Ахтубы',
  storyText:
    'В 2014 году мы спустили на воду первые садки. С тех пор лёд трижды ломал нашу садковую линию — и каждый раз мы восстанавливали её, наращивая стадо.\n\nСегодня наши осетры и стерлядь живут в чистой проточной воде почти как дикие. Это дороже, но мы относимся к этому философски — это плата за качество рыбы и икры.',
  storyQuote: '«Скучать нам не приходится!»',
  storyButton: 'Читать историю полностью',
  newsEyebrow: 'Из хозяйства',
  newsTitle: 'Новости',
  stepsEyebrow: 'Как заказать',
  stepsTitle: 'Три шага',
  stepsTitleAccent: 'до вкуса',
  steps: [
    { title: 'Заявка или звонок', text: 'Оставьте заявку на сайте или позвоните — подскажем по выбору и наличию.' },
    { title: 'Подготовка заказа', text: 'Собираем заказ из свежей продукции и бережно упаковываем с соблюдением холода.' },
    { title: 'Доставка до стола', text: 'Привозим в удобное время — икра и рыба приезжают такими, какими покинули хозяйство.' },
  ],
  contactEyebrow: 'Связаться',
  contactTitle: 'Оставьте',
  contactTitleAccent: 'заявку',
  contactText: 'Перезвоним в ближайшее время, подскажем по наличию и оформим доставку.',
  formTitle: 'Заказать звонок',
  formSubtitle: 'Займёт меньше минуты',
  formButton: 'Отправить заявку',
};

const mergeList = <T extends object>(saved: unknown, defaults: T[]): T[] => {
  if (!Array.isArray(saved)) return defaults;
  return saved
    .filter((x) => x && typeof x === 'object')
    .map((x, i) => ({ ...(defaults[i] ?? defaults[0]), ...(x as Partial<T>) }));
};

export const mergeContent = (saved: unknown): SiteContent => {
  const s = (saved && typeof saved === 'object' ? saved : {}) as Partial<SiteContent>;
  const out = { ...DEFAULT_CONTENT };
  (Object.keys(DEFAULT_CONTENT) as (keyof SiteContent)[]).forEach((k) => {
    const v = s[k];
    if (typeof DEFAULT_CONTENT[k] === 'string' && typeof v === 'string') {
      (out as Record<string, unknown>)[k] = v;
    }
  });
  out.features = mergeList(s.features, DEFAULT_CONTENT.features);
  out.steps = mergeList(s.steps, DEFAULT_CONTENT.steps);
  out.contacts = mergeList(s.contacts, DEFAULT_CONTENT.contacts);
  return out;
};

export const lines = (text: string) =>
  text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

export const paragraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

export const telHref = (phone: string) => {
  const digits = phone.replace(/[^\d+]/g, '');
  return `tel:${digits}`;
};
