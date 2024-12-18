import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ConfirmModalProps } from '@/types/modal';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p>{message}</p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onConfirm}>Подтвердить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
