export interface DateMessageType {
  id: number;
  text: string;
  isCharacterDialog: boolean;
}

export interface DateOption {
  id: string;
  text: string;
  isPremium: boolean;
  cost?: number;
}