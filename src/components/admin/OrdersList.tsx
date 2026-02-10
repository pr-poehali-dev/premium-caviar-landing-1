import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Order {
  id: number;
  name: string;
  phone: string;
  created_at: string;
}

interface OrdersListProps {
  orders: Order[];
  onDeleteOrder: (orderId: number) => void;
}

const OrdersList = ({ orders, onDeleteOrder }: OrdersListProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Заявки клиентов</h2>
      {orders.length === 0 ? (
        <Card className="p-12 text-center">
          <Icon name="Inbox" size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">Пока нет заявок</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-6 bg-blue-50 border-blue-200">
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div>
                  <p className="text-sm text-slate-500">Имя</p>
                  <p className="font-semibold text-slate-900">{order.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Телефон</p>
                  <a 
                    href={`tel:${order.phone}`} 
                    className="font-semibold text-primary hover:underline"
                  >
                    {order.phone}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Дата заявки</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(order.created_at).toLocaleString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`tel:${order.phone}`)}
                  >
                    <Icon name="Phone" size={16} className="mr-2" />
                    Позвонить
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteOrder(order.id);
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Удалить
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersList;
