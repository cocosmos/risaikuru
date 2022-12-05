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
    dateCreated: new Date(),
  };
};
