import { UserType } from "./User";
import { nanoid } from "nanoid";

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
  waste: Waste[];
  quantity: Quantity[];
  adress: string;
  status: Status;
  user: UserType;
  reward: number;
  fees: number;
  dateBegin: Date;
  dateEnd: Date;
  dateCreated: Date;
}

export const createDemand = (
  waste: Waste[],
  quantity: Quantity[],
  adress: string,
  user: UserType,
  reward: number,
  dateBegin: Date,
  dateEnd: Date
): Demand => {
  const fees = (reward * 20) / 100;
  return {
    id: nanoid(),
    waste,
    quantity,
    adress,
    status: "pending",
    user,
    dateBegin,
    dateEnd,
    reward,
    fees,
    dateCreated: new Date(),
  };
};
