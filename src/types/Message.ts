import { UserType } from "./User";

export interface Message {
  id: string;
  content: string;
  sended: Date;
}

export interface Conversation {
  id: string;
  messages: Message[];
  sender: UserType;
  receiver: UserType;
}
