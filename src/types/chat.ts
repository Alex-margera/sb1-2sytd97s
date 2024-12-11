export interface ChatMessage {
  id: string;
  text: string;
  type: 'character' | 'user';
  image?: string;
  isAudio?: boolean;
}

export interface ChatOption {
  id: string;
  text: string;
  isPremium: boolean;
  relationshipPoints?: number;
}

export interface DialogSection {
  messages: ChatMessage[];
  options: ChatOption[];
}

export interface Dialog {
  initial: DialogSection;
  responses: Record<string, DialogSection>;
}