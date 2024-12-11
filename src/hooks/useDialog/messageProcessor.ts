import { DialogMessage, DialogSection } from '../../types/dialog';
import { MessageQueue } from './messageQueue';

const TYPING_DELAY = 1000;
const MESSAGE_DELAY = 1500;

export class MessageProcessor {
  private queue: MessageQueue;

  constructor(
    private onMessage: (message: DialogMessage) => void,
    private onTypingChange: (isTyping: boolean) => void,
    private onShowOptions: (show: boolean) => void,
    private onShowBlocker: (show: boolean) => void,
    private onShowDateButton: (show: boolean) => void
  ) {
    this.queue = new MessageQueue();
  }

  async processSection(section: DialogSection) {
    if (!section) return;

    this.resetStates();
    this.queue.addBatch(section.messages);
    await this.processQueue();
    this.handleSectionStates(section);
  }

  private resetStates() {
    this.onTypingChange(true);
    this.onShowOptions(false);
    this.onShowBlocker(false);
    this.onShowDateButton(false);
  }

  private async processQueue() {
    while (!this.queue.isEmpty()) {
      await this.delay(TYPING_DELAY);
      const message = this.queue.next();
      if (message) {
        this.onMessage(message);
        await this.delay(MESSAGE_DELAY);
      }
    }

    this.onTypingChange(false);
  }

  private handleSectionStates(section: DialogSection) {
    if (section.showBlocker) {
      this.onShowBlocker(true);
    } else if (section.showDateButton) {
      this.onShowDateButton(true);
    } else if (section.options) {
      this.onShowOptions(true);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}