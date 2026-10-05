import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import type { Order } from '@/lib/api';

export const ORDER_STATUSES: Record<string, { label: string; className: string }> = {
  new: { label: 'Новая', className: 'bg-blue-100 text-blue-800' },
  in_progress: { label: 'В работе', className: 'bg-amber-100 text-amber-800' },
  done: { label: 'Выполнена', className: 'bg-green-100 text-green-800' },
  canceled: { label: 'Отменена', className: 'bg-slate-200 text-slate-700' },
};

interface OrdersListProps {
  orders: Order[];
  onUpdateOrder: (order: Order) => Promise<void>;
  onDeleteOrder: (orderId: number) => void;
  onRefresh: () => void;
}

const OrdersList = ({ orders, onUpdateOrder, onDeleteOrder, onRefresh }: OrdersListProps) => {
  const [editing, setEditing] = useState<Order | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    await onUpdateOrder(editing);
    setSaving(false);
    setEditing(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900">Заявки клиентов</h2>
        <Button variant="outline" onClick={onRefresh}>
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Обновить
        </Button>
      </div>
      {orders.length === 0 ? (
        <Card className="p-12 text-center">
          <Icon name="Inbox" size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">Пока нет заявок</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = ORDER_STATUSES[order.status] || ORDER_STATUSES.new;
            if (editing?.id === order.id) {
              return (
                <Card key={order.id} className="p-6 border-primary ring-2 ring-primary">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Имя</Label>
                      <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                    </div>
                    <div>
                      <Label>Телефон</Label>
                      <Input value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} />
                    </div>
                    <div>
                      <Label>Статус</Label>
                      <Select value={editing.status} onValueChange={(v) => setEditing({ ...editing, status: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(ORDER_STATUSES).map(([key, s]) => (
                            <SelectItem key={key} value={key}>
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-3">
                      <Label>Комментарий менеджера</Label>
                      <Textarea
                        value={editing.comment}
                        onChange={(e) => setEditing({ ...editing, comment: e.target.value })}
                        rows={3}
                        placeholder="Что заказал клиент, когда перезвонить..."
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button onClick={save} disabled={saving}>
                      <Icon name="Save" size={16} className="mr-2" />
                      {saving ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                    <Button variant="outline" onClick={() => setEditing(null)}>
                      Отмена
                    </Button>
                  </div>
                </Card>
              );
            }
            return (
              <Card key={order.id} className="p-6 bg-blue-50 border-blue-200">
                <div className="grid md:grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="text-sm text-slate-500">Имя</p>
                    <p className="font-semibold text-slate-900">{order.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Телефон</p>
                    <a href={`tel:${order.phone}`} className="font-semibold text-blue-700 hover:underline">
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
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${status.className}`}>
                      {status.label}
                    </span>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" onClick={() => setEditing(order)}>
                      <Icon name="Pencil" size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeleteOrder(order.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                  {order.comment && (
                    <p className="md:col-span-5 text-sm text-slate-700 bg-white rounded p-3 whitespace-pre-line">
                      {order.comment}
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersList;
