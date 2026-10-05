CREATE TABLE IF NOT EXISTS t_p71088692_premium_caviar_landi.orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    comment TEXT DEFAULT '',
    status VARCHAR(30) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p71088692_premium_caviar_landi.products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT '',
    full_description TEXT,
    image TEXT DEFAULT '',
    price TEXT DEFAULT '',
    promo JSONB,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p71088692_premium_caviar_landi.news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT DEFAULT '',
    image TEXT DEFAULT '',
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO t_p71088692_premium_caviar_landi.products (title, description, image, price, promo, sort_order) VALUES
('Икра осетра', 'Черная зернистая малосольная икра без консервантов. Упакована в железные банки под резинкой по 125 и 250 грамм.', 'https://cdn.poehali.dev/files/5314803716072344646.jpg', '56000', NULL, 1),
('Икра стерляди', 'Черная зернистая малосольная икра без консервантов. Упакована в железные банки под резинкой по 125 и 250 грамм.', 'https://cdn.poehali.dev/files/WhatsApp-Image-2023-11-24-at-22.38.04.jpeg', '48000', '{"enabled": true, "prices": [{"condition": "При покупке менее 1 кг", "price": "44000", "oldPrice": "48000"}, {"condition": "При покупке более 1 кг", "price": "42000", "oldPrice": "48000"}, {"condition": "При покупке более 3 кг", "price": "40000", "oldPrice": "48000"}]}', 2),
('Осетр речной', 'Охлаждённый или свежемороженый осетр', 'https://cdn.poehali.dev/files/осетр%20свежий.jpg', '2500', NULL, 3),
('Стерлядь речная', 'Охлаждённая или свежемороженая стерлядь', 'https://cdn.poehali.dev/files/5314803716072344648.jpg', '3000', NULL, 4),
('Осетр горячего копчения', 'Деликатес горячего копчения', 'https://cdn.poehali.dev/files/бгбх.jpg', '4500', NULL, 5),
('Стерлядь горячего копчения', 'Деликатес горячего копчения', 'https://cdn.poehali.dev/files/стерлядь%20гор%20коп%201.jpg', '5500', NULL, 6),
('Балык-книжка Осетровый холодного копчения', 'Балык холодного копчения', 'https://cdn.poehali.dev/files/9c0d4146-c300-40a2-b66e-91bd6a386faf.jpg', '8500', NULL, 7);

INSERT INTO t_p71088692_premium_caviar_landi.news (title, content, image) VALUES
('Открыт приём заказов к праздникам', 'Принимаем предварительные заказы на свежую икру осетра и стерляди. Посолим и упакуем специально к вашей дате.', 'https://cdn.poehali.dev/files/5314803716072344646.jpg');