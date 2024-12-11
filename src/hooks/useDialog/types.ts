import { DialogMessage, DialogOption, DialogSection } from '../../types/dialog';

export interface DialogState {
  messages: DialogMessage[];
  isTyping: boolean;
  showOptions: boolean;
  showBlocker: boolean;
  showDateButton: boolean;
}

export interface DialogActions {
  handleOptionSelect: (option: DialogOption) => void;
  handleUnblock: () => void;
}

export interface MessageProcessor {
  addMessage: (message: DialogMessage) => void;
  processSection: (section: DialogSection) => Promise<void>;
}