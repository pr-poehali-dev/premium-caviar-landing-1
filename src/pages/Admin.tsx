import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { productDescriptions } from '@/data/products';

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

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('adminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      loadProducts();
    }
  }, []);

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      loadProducts();
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 shadow-xl">
          <div className="text-center mb-8">
            <Icon name="Lock" size={48} className="mx-auto text-primary mb-4" />
            <h1 className="text-3xl font-bold text-slate-900">Панель администратора</h1>
            <p className="text-slate-600 mt-2">Введите пароль для доступа</p>
          </div>

          {showError && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="password" className="text-slate-700">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
                placeholder="Введите пароль"
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Войти
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Управление товарами</h1>
          <Button onClick={handleLogout} variant="outline">
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {showSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <Icon name="CheckCircle" size={18} className="text-green-600" />
            <AlertDescription className="text-green-800 ml-2">
              Изменения успешно сохранены!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Список товаров</h2>
              <Button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700">
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить товар
              </Button>
            </div>

            <div className="space-y-4">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className={`p-4 cursor-pointer transition-all ${
                    editingProduct?.id === product.id
                      ? 'ring-2 ring-primary border-primary'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => {
                    const productWithDescription = {
                      ...product,
                      fullDescription: product.fullDescription || productDescriptions[product.title] || ''
                    };
                    setEditingProduct(productWithDescription);
                  }}
                >
                  <div className="flex gap-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{product.title}</h3>
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-lg font-bold text-primary mt-2 line-clamp-2">
                        {isNaN(Number(product.price)) 
                          ? product.price 
                          : `${parseInt(product.price).toLocaleString()}₽/кг`}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            {editingProduct ? (
              <Card className="p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-slate-900">Редактировать товар</h2>
                  <Button
                    onClick={() => handleDeleteProduct(editingProduct.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="title">Название товара</Label>
                    <Input
                      id="title"
                      value={editingProduct.title}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, title: e.target.value })
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Краткое описание (для карточки)</Label>
                    <Textarea
                      id="description"
                      value={editingProduct.description}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, description: e.target.value })
                      }
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">Изображение товара</Label>
                    <div className="mt-2 space-y-4">
                      <Input
                        id="image"
                        value={editingProduct.image}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, image: e.target.value })
                        }
                        placeholder="https://..."
                      />
                      <div className="flex items-center gap-4">
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                            <Icon name={isUploading ? 'Loader2' : 'Upload'} size={18} className={isUploading ? 'animate-spin' : ''} />
                            <span>{isUploading ? 'Загрузка...' : 'Загрузить файл'}</span>
                          </div>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={isUploading}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-slate-500">Максимальный размер: 5 МБ. Форматы: JPG, PNG, GIF, WebP</p>
                      {editingProduct.image && (
                        <img
                          src={editingProduct.image}
                          alt="Предпросмотр"
                          className="w-full h-48 object-cover rounded-lg border-2 border-slate-200"
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="price">Цена</Label>
                    <Textarea
                      id="price"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, price: e.target.value })
                      }
                      className="mt-2"
                      rows={4}
                      placeholder="Введите цену, например:&#10;2 500₽/кг&#10;или:&#10;• 3-4 кг: 1 750₽/кг&#10;• 4-5 кг: 1 850₽/кг"
                    />
                    <p className="text-xs text-slate-500 mt-2">Можно указать как просто цену (2500), так и текстовое описание с разными условиями</p>
                  </div>

                  <div>
                    <Label htmlFor="fullDescription">Подробное описание (открывается при клике)</Label>
                    <Textarea
                      id="fullDescription"
                      value={editingProduct.fullDescription || ''}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, fullDescription: e.target.value })
                      }
                      className="mt-2"
                      rows={8}
                      placeholder="Введите подробное описание товара, которое будет отображаться в модальном окне при клике на карточку..."
                    />
                    <p className="text-xs text-slate-500 mt-2">Это описание увидят клиенты при нажатии на товар. Можно использовать переносы строк.</p>
                  </div>

                  <div className="pt-4 border-t">
                    <Button onClick={handleSaveProduct} className="w-full">
                      <Icon name="Save" size={18} className="mr-2" />
                      Сохранить изменения
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <Icon name="MousePointerClick" size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">Выберите товар для редактирования</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;