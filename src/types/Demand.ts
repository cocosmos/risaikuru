import { User } from "./User";
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
export type Quantity = {
  id: "S" | "M" | "L" | "XL";
  number: number;
  description: string;
};

export type Demand = {
  id: string;
  waste: Waste[];
  quantity: Quantity[];
  adress: string;
  status: Status;
  user: User;
  reward: number;
  dateBegin: Date;
  dateEnd: Date;
  dateCreated: Date;
};
export const createDemand = (
  waste: Waste[],
  quantity: Quantity[],
  adress: string,
  user: User,
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
