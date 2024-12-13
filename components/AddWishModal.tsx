import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Wish, WishCategory } from '@/types/wish';

interface AddWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (wish: Wish) => void;
}

const categoryEmoji: Record<WishCategory, string> = {
  Вкусняшка: '🍕',
  Путешествие: '✈️',
  Вещь: '👕',
  'Фильм/Сериал': '🎬',
  Игра: '🎮',
  Активность: '🏃‍♂️',
  Другое: '🎁',
};

export default function AddWishModal({ isOpen, onClose, onAdd }: AddWishModalProps) {
  const [category, setCategory] = useState<WishCategory | ''>('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | ''>('');
  const [platform, setPlatform] = useState<'wildberries' | 'ozon' | 'market' | 'other' | null>(null);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState<'cat' | 'bunny'>('cat');
  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;
    const newWish: Wish = {
      id: Date.now().toString(),
      title,
      image,
      price: price ? Number(price) : undefined,
      priority: priority || 'medium',
      platform: platform || undefined,
      comment,
      author,
      link,
      completed: false,
      category,
    };
    onAdd(newWish);
    onClose();
    // Reset form
    setCategory('');
    setTitle('');
    setImage('');
    setPrice('');
    setPriority('');
    setPlatform(null);
    setComment('');
    setAuthor('cat');
    setLink('');
  };

  const showPriceField = category !== 'Фильм/Сериал' && category !== 'Путешествие' && category !== 'Активность';
  const showPlatformField = category === 'Вещь' || category === 'Вкусняшка' || category === 'Другое';

  const sortedCategories = Object.entries(categoryEmoji).sort(([a], [b]) => {
    if (a === 'Другое') return 1;
    if (b === 'Другое') return -1;
    return a.localeCompare(b);
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить новое желание</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select value={category} onValueChange={(value: WishCategory) => setCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              {sortedCategories.map(([cat, emoji]) => (
                <SelectItem key={cat} value={cat as WishCategory}>
                  {emoji} {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {category && (
            <>
              <Input placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <Input placeholder="URL изображения" value={image} onChange={(e) => setImage(e.target.value)} required />
              {showPriceField && (
                <Input
                  type="number"
                  placeholder="Цена (необязательно)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              )}
              <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Приоритетность желания" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Низкий</SelectItem>
                  <SelectItem value="medium">Средний</SelectItem>
                  <SelectItem value="high">Высокий</SelectItem>
                </SelectContent>
              </Select>
              {showPlatformField && (
                <Select
                  value={platform || undefined}
                  onValueChange={(value: 'wildberries' | 'ozon' | 'market' | 'other' | null) => setPlatform(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Платформа (необязательно)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wildberries">Wildberries</SelectItem>
                    <SelectItem value="ozon">Ozon</SelectItem>
                    <SelectItem value="market">Яндекс.Маркет</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              )}
              <Textarea placeholder="Комментарий" value={comment} onChange={(e) => setComment(e.target.value)} />
              <Select value={author} onValueChange={(value: 'cat' | 'bunny') => setAuthor(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Автор" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cat">Кот</SelectItem>
                  <SelectItem value="bunny">Зайка</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Ссылка на желание (необязательно)"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              <Button type="submit">Добавить</Button>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
