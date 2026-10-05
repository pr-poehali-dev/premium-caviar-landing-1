import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { api, type NewsItem } from '@/lib/api';

interface NewsManagerProps {
  news: NewsItem[];
  onChange: (news: NewsItem[]) => void;
  notify: (type: 'success' | 'error', message: string) => void;
}

const NewsManager = ({ news, onChange, notify }: NewsManagerProps) => {
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    try {
      const item = await api.createNews({ title: 'Новая новость', content: '', image: '', is_published: false });
      onChange([item, ...news]);
      setEditing(item);
    } catch (e) {
      notify('error', (e as Error).message);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const saved = await api.updateNews(editing);
      onChange(news.map((n) => (n.id === saved.id ? saved : n)));
      setEditing(saved);
      notify('success', 'Новость сохранена');
    } catch (e) {
      notify('error', (e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить эту новость?')) return;
    try {
      await api.deleteNews(id);
      onChange(news.filter((n) => n.id !== id));
      if (editing?.id === id) setEditing(null);
      notify('success', 'Новость удалена');
    } catch (e) {
      notify('error', (e as Error).message);
    }
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !editing) return;
    setUploading(true);
    try {
      const url = await api.uploadImage(file, 'news');
      setEditing((prev) => (prev ? { ...prev, image: url } : prev));
      notify('success', 'Фото загружено — не забудьте сохранить');
    } catch (err) {
      notify('error', (err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Новости</h2>
          <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
            <Icon name="Plus" size={18} className="mr-2" />
            Добавить новость
          </Button>
        </div>
        {news.length === 0 ? (
          <Card className="p-12 text-center text-slate-500">Новостей пока нет</Card>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <Card
                key={item.id}
                onClick={() => setEditing(item)}
                className={`p-4 cursor-pointer bg-blue-50 border-blue-200 transition-all ${
                  editing?.id === item.id ? 'ring-2 ring-primary border-primary' : 'hover:shadow-md'
                }`}
              >
                <div className="flex gap-4">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                  ) : (
                    <div className="w-20 h-20 rounded bg-slate-200 flex items-center justify-center">
                      <Icon name="Newspaper" size={24} className="text-slate-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{item.content}</p>
                    <p className="text-xs mt-1 text-slate-500">
                      {new Date(item.created_at).toLocaleDateString('ru-RU')} ·{' '}
                      {item.is_published ? (
                        <span className="text-green-700">Опубликована</span>
                      ) : (
                        <span className="text-amber-700">Черновик</span>
                      )}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {editing ? (
        <Card className="p-6 lg:sticky lg:top-24 self-start">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Редактирование новости</h2>
          <div className="space-y-4">
            <div>
              <Label>Фото</Label>
              <div className="mt-2 flex items-center gap-4">
                {editing.image ? (
                  <img src={editing.image} alt="" className="w-32 h-32 object-cover rounded border" />
                ) : (
                  <div className="w-32 h-32 rounded border bg-slate-100 flex items-center justify-center">
                    <Icon name="Image" size={32} className="text-slate-300" />
                  </div>
                )}
                <div className="space-y-2">
                  <Input type="file" accept="image/*" onChange={handleImage} disabled={uploading} className="max-w-xs" />
                  {uploading && <p className="text-sm text-slate-500">Загрузка...</p>}
                  {editing.image && (
                    <Button variant="ghost" size="sm" onClick={() => setEditing({ ...editing, image: '' })}>
                      Убрать фото
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div>
              <Label>Заголовок</Label>
              <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </div>
            <div>
              <Label>Текст</Label>
              <Textarea
                value={editing.content}
                onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                rows={8}
              />
            </div>
            <div className="flex items-center justify-between border rounded-lg p-3">
              <Label>Показывать на сайте</Label>
              <Switch
                checked={editing.is_published}
                onCheckedChange={(v) => setEditing({ ...editing, is_published: v })}
              />
            </div>
            <div className="pt-4 border-t flex gap-3">
              <Button onClick={handleSave} className="flex-1" disabled={saving || uploading}>
                <Icon name="Save" size={18} className="mr-2" />
                {saving ? 'Сохранение...' : 'Сохранить'}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDelete(editing.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Icon name="Trash2" size={18} className="mr-2" />
                Удалить
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-12 text-center">
          <Icon name="Newspaper" size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">Выберите новость или добавьте новую</p>
        </Card>
      )}
    </div>
  );
};

export default NewsManager;
