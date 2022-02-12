export type ToastMessageType = "success" | "info" | "error";

interface IToastMessage {
  id: string;
  title: string;
  description: string;
  type: ToastMessageType;
  createdAt: Date;
}

export class ToastMessage implements IToastMessage {
  id: string;
  title: string;
  description: string;
  type: ToastMessageType;
  createdAt: Date;

  private static generateUuid(): string {
    let uuid: string = "";
    let availableChars: string = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 32; i++) {
      uuid += availableChars.charAt(
        Math.floor(Math.random() * availableChars.length)
      );
    }

    return uuid;
  }

  constructor(title: string, description: string, type: ToastMessageType) {
    this.title = title;
    this.description = description;
    this.type = type;
    this.createdAt = new Date();
    this.id = ToastMessage.generateUuid();
  }
}
