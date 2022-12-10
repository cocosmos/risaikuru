import { Demand, Status } from "./Demand";
import { UserType } from "./User";

export interface Message {
  id: string;
  user: UserType;
  content: string;
  createdAt: Date;
  isRead: boolean;
  isSender: boolean;
}

export interface Conversation {
  id: string;
  sender: UserType;
  receiver: UserType;
  isAsker: boolean;
  demand: Demand;
}

export interface Day {
  date: string;
  messages: Message[];
}
export interface Label {
  status: Status;
  color: string;
  showFname?: boolean;
  text: string;
}
