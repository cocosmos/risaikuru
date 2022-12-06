import { Demand } from "./Demand";
import { UserType } from "./User";

export interface Message {
  id: string;
  isSender: boolean;
  user: UserType;
  content: string;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  sender: UserType;
  receiver: UserType;
  demand: Demand;
  days: Day[];
}

export interface Day {
  date: Date;
  messages: Message[];
}
