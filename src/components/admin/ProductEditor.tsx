import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

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

interface ProductEditorProps {
  product: Product | null;
  isUploading: boolean;
  onUpdateProduct: (product: Product) => void;
  onSaveProduct: () => void;
  onDeleteProduct: (id: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductEditor = ({ 
  product, 
  isUploading, 
  onUpdateProduct, 
  onSaveProduct, 
  onDeleteProduct, 
  onImageUpload 
}: ProductEditorProps) => {
  if (!product) {
    return (
      <Card className="p-12 text-center">
        <Icon name="Package" size={48} className="mx-auto text-slate-300 mb-4" />
        <p className="text-slate-500">Выберите товар для редактирования</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Редактирование товара</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="image">Изображение товара</Label>
          <div className="mt-2 flex items-center gap-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 object-cover rounded border"
            />
            <div>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                disabled={isUploading}
                className="max-w-xs"
              />
              {isUploading && (
                <p className="text-sm text-slate-500 mt-2">Загрузка изображения...</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="title">Название</Label>
          <Input
            id="title"
            value={product.title}
            onChange={(e) => onUpdateProduct({ ...product, title: e.target.value })}
            placeholder="Название товара"
          />
        </div>

        <div>
          <Label htmlFor="description">Краткое описание</Label>
          <Textarea
            id="description"
            value={product.description}
            onChange={(e) => onUpdateProduct({ ...product, description: e.target.value })}
            placeholder="Краткое описание товара"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="fullDescription">Полное описание</Label>
          <Textarea
            id="fullDescription"
            value={product.fullDescription || ''}
            onChange={(e) => onUpdateProduct({ ...product, fullDescription: e.target.value })}
            placeholder="Подробное описание товара"
            rows={5}
          />
        </div>

        <div>
          <Label htmlFor="price">Цена (₽/кг)</Label>
          <Input
            id="price"
            type="number"
            value={product.price}
            onChange={(e) => onUpdateProduct({ ...product, price: e.target.value })}
            placeholder="Цена"
          />
        </div>

        <div className="pt-4 border-t flex gap-3">
          <Button onClick={onSaveProduct} className="flex-1">
            <Icon name="Save" size={18} className="mr-2" />
            Сохранить изменения
          </Button>
          <Button
            variant="outline"
            onClick={() => onDeleteProduct(product.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Icon name="Trash2" size={18} className="mr-2" />
            Удалить товар
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductEditor;
