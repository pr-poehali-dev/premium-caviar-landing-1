import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import type { Product, PromoPrice } from '@/lib/api';

interface ProductEditorProps {
  product: Product | null;
  isUploading: boolean;
  isSaving: boolean;
  onUpdateProduct: (product: Product) => void;
  onSaveProduct: () => void;
  onDeleteProduct: (id: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductEditor = ({
  product,
  isUploading,
  isSaving,
  onUpdateProduct,
  onSaveProduct,
  onDeleteProduct,
  onImageUpload,
}: ProductEditorProps) => {
  if (!product) {
    return (
      <Card className="p-12 text-center">
        <Icon name="Package" size={48} className="mx-auto text-slate-300 mb-4" />
        <p className="text-slate-500">Выберите товар для редактирования</p>
      </Card>
    );
  }

  const promo = product.promo || { enabled: false, prices: [] };

  const updatePromo = (next: { enabled: boolean; prices: PromoPrice[] }) =>
    onUpdateProduct({ ...product, promo: next });

  const updatePromoRow = (idx: number, field: keyof PromoPrice, value: string) =>
    updatePromo({
      ...promo,
      prices: promo.prices.map((p, i) => (i === idx ? { ...p, [field]: value } : p)),
    });

  return (
    <Card className="p-6 lg:sticky lg:top-24 self-start">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Редактирование товара</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="image">Изображение товара</Label>
          <div className="mt-2 flex items-center gap-4">
            {product.image ? (
              <img src={product.image} alt={product.title} className="w-32 h-32 object-cover rounded border" />
            ) : (
              <div className="w-32 h-32 rounded border bg-slate-100 flex items-center justify-center">
                <Icon name="Image" size={32} className="text-slate-300" />
              </div>
            )}
            <div>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                disabled={isUploading}
                className="max-w-xs"
              />
              {isUploading && <p className="text-sm text-slate-500 mt-2">Загрузка изображения...</p>}
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="title">Название</Label>
          <Input
            id="title"
            value={product.title}
            onChange={(e) => onUpdateProduct({ ...product, title: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="description">Краткое описание</Label>
          <Textarea
            id="description"
            value={product.description}
            onChange={(e) => onUpdateProduct({ ...product, description: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="fullDescription">Полное описание (показывается при клике на товар)</Label>
          <Textarea
            id="fullDescription"
            value={product.fullDescription || ''}
            onChange={(e) => onUpdateProduct({ ...product, fullDescription: e.target.value })}
            rows={6}
          />
        </div>

        <div>
          <Label htmlFor="price">Цена</Label>
          <Textarea
            id="price"
            value={product.price}
            onChange={(e) => onUpdateProduct({ ...product, price: e.target.value })}
            placeholder="Например: 2500 или произвольный текст"
            rows={2}
          />
          <p className="text-xs text-slate-500 mt-1">
            Число отобразится как «2 500₽/кг», любой другой текст — как есть
          </p>
        </div>

        <div className="border rounded-lg p-4 space-y-3 bg-slate-50">
          <div className="flex items-center justify-between">
            <Label htmlFor="promo">Акция</Label>
            <Switch
              id="promo"
              checked={promo.enabled}
              onCheckedChange={(checked) => updatePromo({ ...promo, enabled: checked })}
            />
          </div>
          {promo.enabled && (
            <>
              {promo.prices.map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-5">
                    <Label className="text-xs">Условие</Label>
                    <Input value={row.condition} onChange={(e) => updatePromoRow(idx, 'condition', e.target.value)} />
                  </div>
                  <div className="col-span-3">
                    <Label className="text-xs">Цена, ₽</Label>
                    <Input value={row.price} onChange={(e) => updatePromoRow(idx, 'price', e.target.value)} />
                  </div>
                  <div className="col-span-3">
                    <Label className="text-xs">Было, ₽</Label>
                    <Input value={row.oldPrice} onChange={(e) => updatePromoRow(idx, 'oldPrice', e.target.value)} />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="col-span-1 text-red-600"
                    onClick={() => updatePromo({ ...promo, prices: promo.prices.filter((_, i) => i !== idx) })}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  updatePromo({ ...promo, prices: [...promo.prices, { condition: '', price: '', oldPrice: product.price }] })
                }
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить условие
              </Button>
            </>
          )}
        </div>

        <div className="pt-4 border-t flex gap-3">
          <Button onClick={onSaveProduct} className="flex-1" disabled={isSaving || isUploading}>
            <Icon name="Save" size={18} className="mr-2" />
            {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
          </Button>
          <Button
            variant="outline"
            onClick={() => onDeleteProduct(product.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Icon name="Trash2" size={18} className="mr-2" />
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductEditor;
