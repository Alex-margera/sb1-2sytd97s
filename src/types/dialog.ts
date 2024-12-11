export interface DialogMessage {
  id: string;
  text: string;
  type: 'character' | 'user';
  image?: string;
  isAudio?: boolean;
}

export interface DialogOption {
  id: string;
  text: string;
  isPremium: boolean;
  cost: number;
  relationshipPoints: number;
}

export interface DialogSection {
  messages: DialogMessage[];
  options?: DialogOption[];
  nextSectionId?: string;
  showBlocker?: boolean;
  showDateButton?: boolean;
}

export interface Dialog {
  [key: string]: DialogSection;
}