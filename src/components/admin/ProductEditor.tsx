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
  onClose?: () => void;
}

const labelCls = 'text-slate-100 text-sm font-medium';
const fieldCls = 'mt-1.5 text-base';

const ProductEditor = ({
  product,
  isUploading,
  isSaving,
  onUpdateProduct,
  onSaveProduct,
  onDeleteProduct,
  onImageUpload,
  onClose,
}: ProductEditorProps) => {
  if (!product) {
    return (
      <Card className="p-12 text-center hidden lg:block">
        <Icon name="Package" size={48} className="mx-auto text-slate-400 mb-4" />
        <p className="text-slate-300">Выберите товар для редактирования</p>
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
    <Card className="p-4 sm:p-6 lg:sticky lg:top-24 self-start pb-28 lg:pb-6">
      {onClose && (
        <button
          onClick={onClose}
          className="lg:hidden -mt-1 mb-4 inline-flex items-center gap-2 text-primary text-sm font-medium py-2"
        >
          <Icon name="ArrowLeft" size={18} />
          Назад к списку
        </button>
      )}
      <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-6 break-words">
        {product.title || 'Редактирование товара'}
      </h2>

      <div className="space-y-5">
        <div>
          <Label htmlFor="image" className={labelCls}>Изображение товара</Label>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-start gap-4">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-lg border border-white/10 shrink-0"
              />
            ) : (
              <div className="w-full sm:w-32 h-32 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                <Icon name="Image" size={32} className="text-slate-400" />
              </div>
            )}
            <div className="flex-1 min-w-0 space-y-2">
              <label
                htmlFor="image"
                className={`flex items-center justify-center gap-2 w-full h-11 rounded-md border border-dashed border-primary/60 text-primary text-sm font-medium cursor-pointer hover:bg-primary/10 transition-colors ${
                  isUploading ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <Icon name={isUploading ? 'Loader2' : 'Upload'} size={18} className={isUploading ? 'animate-spin' : ''} />
                {isUploading ? 'Загрузка…' : 'Загрузить фото'}
              </label>
              <input id="image" type="file" accept="image/*" onChange={onImageUpload} disabled={isUploading} className="sr-only" />
              <Input
                type="text"
                placeholder="Или ссылка на фото"
                value={product.image || ''}
                onChange={(e) => onUpdateProduct({ ...product, image: e.target.value.trim() })}
                className="text-base"
              />
              <p className="text-xs text-slate-400">Ссылка вида https://… или /photos/имя.jpg</p>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="title" className={labelCls}>Название</Label>
          <Input
            id="title"
            value={product.title}
            onChange={(e) => onUpdateProduct({ ...product, title: e.target.value })}
            className={fieldCls}
          />
        </div>

        <div>
          <Label htmlFor="description" className={labelCls}>Краткое описание</Label>
          <Textarea
            id="description"
            value={product.description}
            onChange={(e) => onUpdateProduct({ ...product, description: e.target.value })}
            rows={3}
            className={fieldCls}
          />
        </div>

        <div>
          <Label htmlFor="fullDescription" className={labelCls}>Полное описание</Label>
          <p className="text-xs text-slate-400 mt-0.5">Показывается, когда покупатель нажимает на товар</p>
          <Textarea
            id="fullDescription"
            value={product.fullDescription || ''}
            onChange={(e) => onUpdateProduct({ ...product, fullDescription: e.target.value })}
            rows={6}
            className={fieldCls}
          />
        </div>

        <div>
          <Label htmlFor="price" className={labelCls}>Цена</Label>
          <Textarea
            id="price"
            value={product.price}
            onChange={(e) => onUpdateProduct({ ...product, price: e.target.value })}
            placeholder="Например: 2500 или произвольный текст"
            rows={2}
            className={fieldCls}
          />
          <p className="text-xs text-slate-400 mt-1">Число отобразится как «2 500₽/кг», любой другой текст — как есть</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="promo" className="text-slate-100 text-base font-semibold">Акция</Label>
            <Switch
              id="promo"
              checked={promo.enabled}
              onCheckedChange={(checked) => updatePromo({ ...promo, enabled: checked })}
            />
          </div>
          {promo.enabled && (
            <>
              {promo.prices.map((row, idx) => (
                <div key={idx} className="rounded-md border border-white/10 p-3 sm:p-0 sm:border-0 space-y-3 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-2 sm:items-end">
                  <div className="flex items-center justify-between sm:hidden">
                    <span className="text-xs text-slate-300">Условие {idx + 1}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 h-8 px-2"
                      onClick={() => updatePromo({ ...promo, prices: promo.prices.filter((_, i) => i !== idx) })}
                    >
                      <Icon name="Trash2" size={16} className="mr-1" />
                      Удалить
                    </Button>
                  </div>
                  <div className="sm:col-span-5">
                    <Label className="text-xs text-slate-300">Условие</Label>
                    <Input
                      className="mt-1 text-base"
                      placeholder="Например: от 1 кг"
                      value={row.condition}
                      onChange={(e) => updatePromoRow(idx, 'condition', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:contents">
                    <div className="sm:col-span-3">
                      <Label className="text-xs text-slate-300">Цена, ₽</Label>
                      <Input
                        className="mt-1 text-base"
                        inputMode="numeric"
                        value={row.price}
                        onChange={(e) => updatePromoRow(idx, 'price', e.target.value)}
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <Label className="text-xs text-slate-300">Было, ₽</Label>
                      <Input
                        className="mt-1 text-base"
                        inputMode="numeric"
                        value={row.oldPrice}
                        onChange={(e) => updatePromoRow(idx, 'oldPrice', e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden sm:inline-flex sm:col-span-1 text-red-400 hover:text-red-300"
                    onClick={() => updatePromo({ ...promo, prices: promo.prices.filter((_, i) => i !== idx) })}
                    aria-label="Удалить условие"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
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

        <div className="fixed lg:static bottom-0 inset-x-0 z-40 bg-card/95 lg:bg-transparent backdrop-blur lg:backdrop-blur-none border-t border-white/10 lg:border-white/10 p-3 lg:p-0 lg:pt-4 flex gap-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:pb-0">
          <Button onClick={onSaveProduct} className="flex-1 h-12 lg:h-10" disabled={isSaving || isUploading}>
            <Icon name="Save" size={18} className="mr-2" />
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </Button>
          <Button
            variant="outline"
            onClick={() => onDeleteProduct(product.id)}
            className="h-12 lg:h-10 text-red-400 border-red-400/40 hover:text-red-300 hover:bg-red-500/10"
            aria-label="Удалить товар"
          >
            <Icon name="Trash2" size={18} className="sm:mr-2" />
            <span className="hidden sm:inline">Удалить</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductEditor;
