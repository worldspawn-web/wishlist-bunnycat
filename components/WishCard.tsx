import Image from 'next/image';
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { WishCardProps } from '@/types/components';
import { categoryEmoji } from '@/constants/categoryEmoji';
import { platformGradients } from '@/constants/platformGradients';
import { formatDate } from '@/utils/dateUtils';

export default function WishCard({ wish, onComplete, onUncomplete, currentUser }: WishCardProps) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<'complete' | 'uncomplete'>('complete');

  const handleCheckboxChange = () => {
    if (wish.completed) {
      setModalAction('uncomplete');
    } else {
      setModalAction('complete');
    }
    setIsConfirmModalOpen(true);
  };

  const handleConfirm = () => {
    if (modalAction === 'complete') {
      if (!isOwnWish) {
        onComplete(wish.id, currentUser);
      } else {
        alert('Вы не можете выполнить свое собственное желание!');
      }
    } else {
      onUncomplete(wish.id);
    }
    setIsConfirmModalOpen(false);
  };

  const isOwnWish = wish.author === currentUser;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="h-48 overflow-hidden">
        <Image src={wish.image} alt={wish.title} width={300} height={200} className="w-full h-48 object-cover" />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{wish.title}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {wish.price === undefined && wish.category !== 'Активность' ? (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Free
            </Badge>
          ) : wish.price !== undefined ? (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {wish.price} RUB
            </Badge>
          ) : null}
          <Badge
            variant={wish.priority === 'high' ? 'destructive' : wish.priority === 'medium' ? 'default' : 'secondary'}
          >
            {wish.priority === 'high' ? 'Высокий' : wish.priority === 'medium' ? 'Средний' : 'Низкий'}
          </Badge>
          <Badge variant="outline">
            {categoryEmoji[wish.category]} {wish.category}
          </Badge>
        </div>
        {wish.platform && platformGradients[wish.platform] && (
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge
              className={`${platformGradients[wish.platform].gradient} ${platformGradients[wish.platform].textColor}`}
            >
              {wish.platform === 'market'
                ? 'Яндекс.Маркет'
                : wish.platform === 'wildberries'
                ? 'Wildberries'
                : wish.platform === 'ozon'
                ? 'Ozon'
                : wish.platform}
            </Badge>
          </div>
        )}
        {wish.comment && (
          <div className="bg-gray-100 rounded-md p-2 mb-2">
            <p className="text-sm text-gray-700">{wish.comment}</p>
          </div>
        )}
        <div className="mt-auto">
          <p className="text-sm text-gray-500 mb-1">Автор: {wish.author === 'cat' ? 'Кот' : 'Зайка'}</p>
          <p className="text-sm text-gray-500 mb-2">Создано: {formatDate(wish.createdAt)}</p>
          <div className="flex items-center justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-block">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => wish.link && window.open(wish.link, '_blank', 'noopener,noreferrer')}
                      disabled={!wish.link}
                    >
                      Исполнить желание
                    </Button>
                  </span>
                </TooltipTrigger>
                {!wish.link && <TooltipContent>Солнышко не указало ссылку :(</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-block">
                    <Checkbox
                      id={`completed-${wish.id}`}
                      checked={wish.completed}
                      onCheckedChange={handleCheckboxChange}
                      disabled={isOwnWish}
                    />
                  </span>
                </TooltipTrigger>
                {isOwnWish && <TooltipContent>Нельзя выполнить собственное желание</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        title="Подтверждение"
        message={
          modalAction === 'complete'
            ? 'Вы уверены, что желание выполнено?'
            : 'Вы уверены, что хотите вернуть желание в общий список?'
        }
      />
    </div>
  );
}
