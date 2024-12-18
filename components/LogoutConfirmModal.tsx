import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LogoutConfirmModalProps } from '@/types/modal';

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Подтверждение выхода</DialogTitle>
        </DialogHeader>
        <p>Вы уверены, что хотите выйти из аккаунта?</p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onConfirm}>Выйти</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
