import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { productDescriptions } from '@/data/products';
import LoginForm from '@/components/admin/LoginForm';
import OrdersList from '@/components/admin/OrdersList';
import ProductsList from '@/components/admin/ProductsList';
import ProductEditor from '@/components/admin/ProductEditor';

const ADMIN_PASSWORD = 'EC2|5{Id4o8cWV0gNLTM';

interface Product {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  price: string;
  promo?: {
    enabled: boolean;
    prices: { condition: string; price: string; oldPrice: string }[];
  };
}

interface Order {
  id: number;
  name: string;
  phone: string;
  created_at: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showOrders, setShowOrders] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('adminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      loadProducts();
      loadOrders();
    }
  }, []);

  const loadOrders = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/018bdb2f-504b-49c5-a0c8-8511cab7f093');
      const data = await response.json();
      if (response.ok) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту заявку?')) return;

    try {
      const response = await fetch('https://functions.poehali.dev/6abdd15a-c1f2-4b06-9389-69dfc035ff9e', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: orderId }),
      });

      if (response.ok) {
        setOrders(orders.filter(order => order.id !== orderId));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } else {
        setErrorMessage('Ошибка при удалении заявки');
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    } catch (error) {
      setErrorMessage('Ошибка при удалении заявки');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const loadProducts = () => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      const defaultProducts: Product[] = [
        {
          id: '1',
          title: 'Икра осетра',
          description: 'Черная зернистая малосольная икра без консервантов. Упакована в железные банки под резинкой по 125 и 250 грамм.',
          image: 'https://cdn.poehali.dev/files/5314803716072344646.jpg',
          price: '56000',
        },
        {
          id: '2',
          title: 'Икра стерляди',
          description: 'Черная зернистая малосольная икра без консервантов. Упакована в железные банки под резинкой по 125 и 250 грамм.',
          image: 'https://cdn.poehali.dev/files/WhatsApp-Image-2023-11-24-at-22.38.04.jpeg',
          price: '48000',
          promo: {
            enabled: true,
            prices: [
              { condition: 'При покупке менее 1 кг', price: '44000', oldPrice: '48000' },
              { condition: 'При покупке более 1 кг', price: '42000', oldPrice: '48000' },
              { condition: 'При покупке более 3 кг', price: '40000', oldPrice: '48000' },
            ],
          },
        },
        {
          id: '3',
          title: 'Осетр речной',
          description: 'Охлаждённый или свежемороженый осетр',
          image: 'https://cdn.poehali.dev/files/осетр%20свежий.jpg',
          price: '2500',
        },
        {
          id: '4',
          title: 'Стерлядь речная',
          description: 'Охлаждённая или свежемороженая стерлядь',
          image: 'https://cdn.poehali.dev/files/стерлядь%20свежая.jpg',
          price: '3000',
        },
        {
          id: '5',
          title: 'Осетр горячего копчения',
          description: 'Деликатес горячего копчения',
          image: 'https://cdn.poehali.dev/files/Осетр%20гор%20коп.jpg',
          price: '4500',
        },
        {
          id: '6',
          title: 'Стерлядь горячего копчения',
          description: 'Деликатес горячего копчения',
          image: 'https://cdn.poehali.dev/files/стерлядь%20гор%20коп%201.jpg',
          price: '5500',
        },
        {
          id: '7',
          title: 'Балык-книжка Осетровый холодного копчения',
          description: 'Балык холодного копчения',
          image: 'https://cdn.poehali.dev/files/балык%20книжка.jpg',
          price: '8500',
        },
      ];
      setProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
  };

  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      loadProducts();
      loadOrders();
    } else {
      setErrorMessage('Неверный пароль');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    navigate('/');
  };

  const handleSaveProduct = () => {
    if (!editingProduct) return;

    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id ? editingProduct : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setEditingProduct(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      title: 'Новый товар',
      description: 'Описание товара',
      fullDescription: '',
      image: 'https://cdn.poehali.dev/files/placeholder.jpg',
      price: '1000',
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setEditingProduct(newProduct);
  };

  const handleDeleteProduct = (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) return;
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setEditingProduct(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Пожалуйста, выберите файл изображения');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Размер файла не должен превышать 5 МБ');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Image = event.target?.result as string;

        const response = await fetch('https://functions.poehali.dev/9b246b55-e84a-4a36-ae0c-04366201b926', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64Image,
            filename: file.name,
          }),
        });

        const data = await response.json();

        if (response.ok && editingProduct) {
          setEditingProduct({
            ...editingProduct,
            image: data.url,
          });
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 2000);
        } else {
          setErrorMessage(data.error || 'Ошибка загрузки изображения');
          setShowError(true);
          setTimeout(() => setShowError(false), 3000);
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      setErrorMessage('Ошибка загрузки изображения');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelectProduct = (product: Product) => {
    let priceText = product.price;
    
    if (product.promo?.enabled && product.promo.prices.length > 0) {
      priceText = product.promo.prices
        .map(p => `${p.condition}: ${parseInt(p.price).toLocaleString('ru-RU')}₽/кг (было ${parseInt(p.oldPrice).toLocaleString('ru-RU')}₽)`)
        .join('\n');
    }
    
    const productWithDescription = {
      ...product,
      fullDescription: product.fullDescription || productDescriptions[product.title] || '',
      price: priceText
    };
    setEditingProduct(productWithDescription);
  };

  if (!isAuthenticated) {
    return (
      <LoginForm 
        onLogin={handleLogin} 
        showError={showError} 
        errorMessage={errorMessage} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Панель администратора</h1>
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowOrders(!showOrders)} 
              variant={showOrders ? "default" : "outline"}
            >
              <Icon name="Users" size={18} className="mr-2" />
              Заявки ({orders.length})
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {showOrders ? (
          <OrdersList orders={orders} onDeleteOrder={handleDeleteOrder} />
        ) : (
          <div>
        {showSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <Icon name="CheckCircle" size={18} className="text-green-600" />
            <AlertDescription className="text-green-800 ml-2">
              Изменения успешно сохранены!
            </AlertDescription>
          </Alert>
        )}

        {showError && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <Icon name="AlertCircle" size={18} className="text-red-600" />
            <AlertDescription className="text-red-800 ml-2">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

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
            onUpdateProduct={setEditingProduct}
            onSaveProduct={handleSaveProduct}
            onDeleteProduct={handleDeleteProduct}
            onImageUpload={handleImageUpload}
          />
        </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;