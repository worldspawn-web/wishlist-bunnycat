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
    <div className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800 backdrop-blur-sm dark:backdrop-blur-md">
      <div className="h-48 overflow-hidden">
        <Image src={wish.image} alt={wish.title} width={300} height={200} className="w-full h-48 object-cover" />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{wish.title}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {wish.price === null || wish.price === 0 ? (
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              {t('wishlist.free')}
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
              {wish.price} RUB
            </Badge>
          )}
          <Badge
            variant={wish.priority === 'high' ? 'destructive' : wish.priority === 'medium' ? 'default' : 'secondary'}
            className="dark:bg-opacity-80"
          >
            {t(`wishlist.priority.${wish.priority}`)}
          </Badge>
          <Badge variant="outline" className="dark:text-gray-300 dark:border-gray-600">
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
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2 mb-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">{wish.comment}</p>
          </div>
        )}
        <div className="mt-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {t('wishlist.author')}: {t(`common.${wish.author}`)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
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
                      className="dark:bg-black dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                    >
                      {t('wishlist.fulfillWish')}
                    </Button>
                  </span>
                </TooltipTrigger>
                {!wish.link && (
                  <TooltipContent className="dark:bg-gray-800 dark:text-gray-300">
                    {t('wishlist.noLink')}
                  </TooltipContent>
                )}
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
                      className={`
                        border-2 border-gray-300 dark:border-gray-600
                        ${wish.completed ? 'bg-green-800 dark:bg-green-600' : 'bg-white dark:bg-gray-800'}
                        rounded-sm w-5 h-5
                        checked:text-green-100 dark:checked:text-gray-900
                        focus:ring-green-800 dark:focus:ring-green-600
                        transition-colors duration-200
                      `}
                    >
                      {wish.completed && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-green-100 dark:text-gray-900"
                        >
                          <path
                            fillRule="evenodd"
                            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </Checkbox>
                  </span>
                </TooltipTrigger>
                {isOwnWish && (
                  <TooltipContent className="dark:bg-gray-800 dark:text-gray-300">
                    {t('wishlist.ownWishWarning')}
                  </TooltipContent>
                )}
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
