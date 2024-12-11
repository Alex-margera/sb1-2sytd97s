import { DialogMessage } from '../../types/dialog';

export class MessageQueue {
  private messages: DialogMessage[] = [];

  addBatch(messages: DialogMessage[]) {
    this.messages.push(...messages);
  }

  next(): DialogMessage | undefined {
    return this.messages.shift();
  }

  isEmpty(): boolean {
    return this.messages.length === 0;
  }

  clear() {
    this.messages = [];
  }
}