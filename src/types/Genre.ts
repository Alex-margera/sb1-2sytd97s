export interface Genre {
  id: string;
  name: string;
  icon: string;
}

export interface GenreSelectionProps {
  onContinue: () => void;
}