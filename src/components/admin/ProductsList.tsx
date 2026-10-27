import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import type { Product } from '@/lib/api';

interface ProductsListProps {
  products: Product[];
  editingProduct: Product | null;
  onSelectProduct: (product: Product) => void;
  onAddProduct: () => void;
}

export const formatPrice = (price: string) =>
  price && !isNaN(Number(price)) ? `${Number(price).toLocaleString('ru-RU')} ₽` : price;

const ProductsList = ({ products, editingProduct, onSelectProduct, onAddProduct }: ProductsListProps) => {
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4 sm:mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Список товаров</h2>
        <Button onClick={onAddProduct} className="bg-green-600 hover:bg-green-700 text-white">
          <Icon name="Plus" size={18} className="mr-2" />
          Добавить товар
        </Button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className={`p-3 sm:p-4 cursor-pointer transition-all border-white/10 ${
              editingProduct?.id === product.id ? 'ring-2 ring-primary border-primary' : 'hover:border-primary/50'
            }`}
            onClick={() => onSelectProduct(product)}
          >
            <div className="flex gap-3 sm:gap-4 items-center">
              {product.image ? (
                <img src={product.image} alt={product.title} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md shrink-0" />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-white/5 border border-white/10 shrink-0 flex items-center justify-center">
                  <Icon name="Image" size={22} className="text-slate-500" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-100 leading-snug break-words">{product.title}</h3>
                {product.description && (
                  <p className="text-sm text-slate-400 line-clamp-1 sm:line-clamp-2">{product.description}</p>
                )}
                <p className="text-primary font-semibold mt-1 truncate text-sm sm:text-base">
                  {formatPrice(product.price)}
                  {product.promo?.enabled && (
                    <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 align-middle">АКЦИЯ</span>
                  )}
                </p>
              </div>
              <Icon name="ChevronRight" size={20} className="text-slate-500 shrink-0" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;