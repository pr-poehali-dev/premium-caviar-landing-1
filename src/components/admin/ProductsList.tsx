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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Список товаров</h2>
        <Button onClick={onAddProduct} className="bg-green-600 hover:bg-green-700">
          <Icon name="Plus" size={18} className="mr-2" />
          Добавить товар
        </Button>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className={`p-4 cursor-pointer transition-all bg-blue-50 border-blue-200 ${
              editingProduct?.id === product.id ? 'ring-2 ring-primary border-primary' : 'hover:shadow-md'
            }`}
            onClick={() => onSelectProduct(product)}
          >
            <div className="flex gap-4">
              {product.image ? (
                <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded" />
              ) : (
                <div className="w-20 h-20 rounded bg-slate-200" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900">{product.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>
                <p className="text-slate-900 font-semibold mt-1 truncate">
                  {formatPrice(product.price)}
                  {product.promo?.enabled && <span className="ml-2 text-xs text-red-600">АКЦИЯ</span>}
                </p>
              </div>
              <Icon name="ChevronRight" size={20} className="text-slate-400" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
