export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export interface AddWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (wish: Wish) => void;
}

export interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
