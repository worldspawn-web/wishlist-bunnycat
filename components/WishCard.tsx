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
import { useTranslations } from 'next-intl';

export default function WishCard({ wish, onComplete, onUncomplete, currentUser }: WishCardProps) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<'complete' | 'uncomplete'>('complete');
  const t = useTranslations();

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
      onComplete(wish.id, currentUser);
    } else {
      onUncomplete(wish.id);
    }
    setIsConfirmModalOpen(false);
  };

  const isOwnWish = wish.author === currentUser;

  const getPlatformStyle = (platform: string) => {
    const style = platformGradients[platform] || {
      gradient: 'linear-gradient(to right, #6b7280, #9ca3af)',
      textColor: 'white',
    };
    return {
      background: style.gradient,
      color: style.textColor,
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="h-48 overflow-hidden">
        <Image src={wish.image} alt={wish.title} width={300} height={200} className="w-full h-48 object-cover" />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{wish.title}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {wish.price === null || wish.price === 0 ? (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {t('wishlist.free')}
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {wish.price} RUB
            </Badge>
          )}
          <Badge
            variant={wish.priority === 'high' ? 'destructive' : wish.priority === 'medium' ? 'default' : 'secondary'}
          >
            {t(`wishlist.priority.${wish.priority}`)}
          </Badge>
          <Badge variant="outline">
            {categoryEmoji[wish.category]} {t(`categories.${wish.category}`)}
          </Badge>
        </div>
        {wish.platform && (
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge style={getPlatformStyle(wish.platform)} className="border-0">
              {t(`platforms.${wish.platform}`)}
            </Badge>
          </div>
        )}
        {wish.comment && (
          <div className="bg-gray-100 rounded-md p-2 mb-2">
            <p className="text-sm text-gray-700">{wish.comment}</p>
          </div>
        )}
        <div className="mt-auto">
          <p className="text-sm text-gray-500 mb-1">
            {t('wishlist.author')}: {t(`common.${wish.author}`)}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            {t('wishlist.created')}: {formatDate(wish.createdAt)}
          </p>
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
                      {t('wishlist.fulfillWish')}
                    </Button>
                  </span>
                </TooltipTrigger>
                {!wish.link && <TooltipContent>{t('wishlist.noLink')}</TooltipContent>}
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
                    />
                  </span>
                </TooltipTrigger>
                {isOwnWish && <TooltipContent>{t('wishlist.ownWishWarning')}</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        title={t('common.confirm')}
        message={modalAction === 'complete' ? t('wishlist.confirmCompletion') : t('wishlist.confirmUncompletion')}
      />
    </div>
  );
}
