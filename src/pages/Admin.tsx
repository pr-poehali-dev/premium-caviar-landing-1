import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { productDescriptions } from '@/data/products';
import LoginForm from '@/components/admin/LoginForm';
import OrdersList from '@/components/admin/OrdersList';
import ProductsList from '@/components/admin/ProductsList';
import ProductEditor from '@/components/admin/ProductEditor';
import NewsManager from '@/components/admin/NewsManager';
import {
  api,
  getAdminPassword,
  setAdminPassword,
  clearAdminPassword,
  type Product,
  type Order,
  type NewsItem,
} from '@/lib/api';

type Tab = 'products' | 'news' | 'orders';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tab, setTab] = useState<Tab>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const navigate = useNavigate();

  const notify = useCallback((type: 'success' | 'error', message: string) => {
    setNotice({ type, message });
    setTimeout(() => setNotice(null), type === 'error' ? 4000 : 2500);
  }, []);

  const loadAll = useCallback(async () => {
    try {
      const [p, n, o] = await Promise.all([api.getProducts(), api.getNews(), api.getOrders()]);
      setProducts(p);
      setNews(n);
      setOrders(o);
    } catch (e) {
      notify('error', (e as Error).message);
    }
  }, [notify]);

  const loadOrders = async () => {
    try {
      setOrders(await api.getOrders());
    } catch (e) {
      notify('error', (e as Error).message);
    }
  };

  useEffect(() => {
    const saved = getAdminPassword();
    if (!saved) return;
    api.login(saved).then((ok) => {
      if (ok) {
        setIsAuthenticated(true);
        loadAll();
      } else {
        clearAdminPassword();
      }
    });
  }, [loadAll]);

  const handleLogin = async (password: string) => {
    const ok = await api.login(password);
    if (ok) {
      setAdminPassword(password);
      setIsAuthenticated(true);
      loadAll();
    } else {
      notify('error', 'Неверный пароль');
    }
  };

  const handleLogout = () => {
    clearAdminPassword();
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleSelectProduct = (product: Product) => {
    setEditingProduct({
      ...product,
      fullDescription: product.fullDescription || productDescriptions[product.title] || '',
    });
  };

  const handleSaveProduct = async () => {
    if (!editingProduct) return;
    setIsSaving(true);
    try {
      const saved = await api.updateProduct(editingProduct);
      setProducts((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
      setEditingProduct(saved);
      notify('success', 'Товар сохранён');
    } catch (e) {
      notify('error', (e as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      const created = await api.createProduct({ title: 'Новый товар', description: '', price: '1000' });
      setProducts((prev) => [...prev, created]);
      setEditingProduct(created);
    } catch (e) {
      notify('error', (e as Error).message);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) return;
    try {
      await api.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setEditingProduct(null);
      notify('success', 'Товар удалён');
    } catch (e) {
      notify('error', (e as Error).message);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await api.uploadImage(file, 'products');
      setEditingProduct((prev) => (prev ? { ...prev, image: url } : prev));
      notify('success', 'Фото загружено — нажмите «Сохранить изменения»');
    } catch (err) {
      notify('error', (err as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateOrder = async (order: Order) => {
    try {
      const saved = await api.updateOrder(order);
      setOrders((prev) => prev.map((o) => (o.id === saved.id ? saved : o)));
      notify('success', 'Заявка обновлена');
    } catch (e) {
      notify('error', (e as Error).message);
    }
  };

  const handleDeleteOrder = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту заявку?')) return;
    try {
      await api.deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
      notify('success', 'Заявка удалена');
    } catch (e) {
      notify('error', (e as Error).message);
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} showError={notice?.type === 'error'} errorMessage={notice?.message || ''} />;
  }

  const newOrders = orders.filter((o) => o.status === 'new').length;
  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'products', label: 'Товары', icon: 'Package' },
    { key: 'news', label: 'Новости', icon: 'Newspaper' },
    { key: 'orders', label: `Заявки (${orders.length}${newOrders ? `, новых ${newOrders}` : ''})`, icon: 'Users' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-wrap gap-3 justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Панель администратора</h1>
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <Button key={t.key} onClick={() => setTab(t.key)} variant={tab === t.key ? 'default' : 'outline'}>
                <Icon name={t.icon} size={18} className="mr-2" />
                {t.label}
              </Button>
            ))}
            <Button onClick={handleLogout} variant="outline">
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {notice && (
          <Alert
            className={`mb-6 fixed bottom-6 right-6 z-50 max-w-sm shadow-lg ${
              notice.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}
          >
            <Icon
              name={notice.type === 'success' ? 'CheckCircle' : 'AlertCircle'}
              size={18}
              className={notice.type === 'success' ? 'text-green-600' : 'text-red-600'}
            />
            <AlertDescription className={`ml-2 ${notice.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
              {notice.message}
            </AlertDescription>
          </Alert>
        )}

        {tab === 'orders' && (
          <OrdersList
            orders={orders}
            onUpdateOrder={handleUpdateOrder}
            onDeleteOrder={handleDeleteOrder}
            onRefresh={loadOrders}
          />
        )}

        {tab === 'news' && <NewsManager news={news} onChange={setNews} notify={notify} />}

        {tab === 'products' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <ProductsList
              products={products}
              editingProduct={editingProduct}
              onSelectProduct={handleSelectProduct}
              onAddProduct={handleAddProduct}
            />
            <ProductEditor
              product={editingProduct}
              isUploading={isUploading}
              isSaving={isSaving}
              onUpdateProduct={setEditingProduct}
              onSaveProduct={handleSaveProduct}
              onDeleteProduct={handleDeleteProduct}
              onImageUpload={handleImageUpload}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
