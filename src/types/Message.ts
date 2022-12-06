import { Demand } from "./Demand";
import { UserType } from "./User";

export interface Message {
  id: string;
  isSender: boolean;
  user: UserType;
  content: string;
  createdAt: Date;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  sender: UserType;
  receiver: UserType;
  demand: Demand;
  messages: Message[];
}

export interface Day {
  date: string;
  messages: Message[];
}
