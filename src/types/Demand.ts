import { UserType } from "./User";
import { nanoid } from "nanoid";
import Location from "@/types/Location";

export type Waste =
  | "alu"
  | "cafe"
  | "papier"
  | "compost"
  | "dechets"
  | "lampes"
  | "piles"
  | "verre";
export type Status = "pending" | "accepted" | "rejected";
export type QuantityId = "S" | "M" | "L" | "XL";

export interface Quantity {
  id: QuantityId;
  number: number;
  description: string;
}

export interface Demand {
  id: string;
  wastes: Waste[];
  quantity: Quantity[];
  location: Location;
  status: Status;
  user: UserType;
  reward: number;
  fees: number;
  dateBegin: Date;
  dateEnd: Date;
  dateCreated: Date;
  conversationId?: string;
}

export const createDemand = (
  wastes: Waste[],
  quantity: Quantity[],
  location: Location,
  user: UserType,
  reward: number,
  dateBegin: Date,
  dateEnd: Date
): Demand => {
  const fees = (reward * 20) / 100;
  return {
    id: nanoid(),
    wastes,
    quantity,
    location,
    status: "pending",
    user,
    dateBegin,
    dateEnd,
    reward,
    fees,
    dateCreated: new Date(),
  };
};
