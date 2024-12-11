export interface Zodiac {
  id: string;
  name: string;
  symbol: string;
}

export interface ZodiacSelectionProps {
  onContinue: () => void;
}