import moment from "moment";
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

interface MessageSupabase {
  id: string;
  user: UserType;
  content: string;
  created_at: string;
  is_read: boolean;
}

export const makeMessage = (message: MessageSupabase, user: UserType) => {
  return {
    id: message.id,
    user: message.user,
    content: message.content,
    createdAt: moment(message.created_at).toDate(),
    isRead: message.is_read,
    isSender: message.user.id === user.id,
  };
};
