export interface Avatar {
  id: string;
  imageUrl: string;
  name: string;
  isCreateAvatar?: boolean;
}

export interface AvatarSelectionProps {
  onContinue: () => void;
}