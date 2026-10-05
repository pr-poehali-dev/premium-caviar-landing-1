import func2url from '../../backend/func2url.json';

const API_URL = (func2url as Record<string, string>).api;
const PASSWORD_KEY = 'adminPassword';

export interface PromoPrice {
  condition: string;
  price: string;
  oldPrice: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  price: string;
  promo?: { enabled: boolean; prices: PromoPrice[] } | null;
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  image: string;
  is_published: boolean;
  created_at: string;
}

export interface Order {
  id: number;
  name: string;
  phone: string;
  comment: string;
  status: string;
  created_at: string;
}

export const getAdminPassword = () => sessionStorage.getItem(PASSWORD_KEY) || '';
export const setAdminPassword = (p: string) => sessionStorage.setItem(PASSWORD_KEY, p);
export const clearAdminPassword = () => sessionStorage.removeItem(PASSWORD_KEY);

async function request<T>(resource: string, method = 'GET', body?: unknown, extra = ''): Promise<T> {
  const res = await fetch(`${API_URL}?resource=${resource}${extra}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Password': getAdminPassword(),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Ошибка сервера');
  return data as T;
}

export const api = {
  login: (password: string) =>
    fetch(`${API_URL}?resource=login`, { method: 'POST', headers: { 'X-Admin-Password': password } }).then((r) => r.ok),

  getProducts: () => request<{ products: Product[] }>('products').then((d) => d.products),
  createProduct: (p: Partial<Product>) => request<{ product: Product }>('products', 'POST', p).then((d) => d.product),
  updateProduct: (p: Product) => request<{ product: Product }>('products', 'PUT', p).then((d) => d.product),
  deleteProduct: (id: string) => request('products', 'DELETE', undefined, `&id=${id}`),

  getNews: () => request<{ news: NewsItem[] }>('news').then((d) => d.news),
  createNews: (n: Partial<NewsItem>) => request<{ item: NewsItem }>('news', 'POST', n).then((d) => d.item),
  updateNews: (n: NewsItem) => request<{ item: NewsItem }>('news', 'PUT', n).then((d) => d.item),
  deleteNews: (id: number) => request('news', 'DELETE', undefined, `&id=${id}`),

  submitOrder: (name: string, phone: string) =>
    request<{ message: string }>('orders', 'POST', { name, phone }),
  getOrders: () => request<{ orders: Order[] }>('orders').then((d) => d.orders),
  updateOrder: (o: Order) => request<{ order: Order }>('orders', 'PUT', o).then((d) => d.order),
  deleteOrder: (id: number) => request('orders', 'DELETE', undefined, `&id=${id}`),

  uploadImage: (file: File, folder: 'products' | 'news') =>
    new Promise<string>((resolve, reject) => {
      if (!file.type.startsWith('image/')) return reject(new Error('Выберите файл изображения'));
      if (file.size > 5 * 1024 * 1024) return reject(new Error('Размер файла не должен превышать 5 МБ'));
      const reader = new FileReader();
      reader.onload = () =>
        request<{ url: string }>('upload', 'POST', { image: reader.result, filename: file.name, folder })
          .then((d) => resolve(d.url))
          .catch(reject);
      reader.onerror = () => reject(new Error('Не удалось прочитать файл'));
      reader.readAsDataURL(file);
    }),
};
