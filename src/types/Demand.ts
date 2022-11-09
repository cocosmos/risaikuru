import { User } from "./User";

export type Waste =
  | "alu"
  | "cafe"
  | "papier"
  | "compost"
  | "dechets"
  | "lampes"
  | "piles"
  | "verre";

export type Quantity = {
  id: string;
  number: number;
  description: string;
};

export type Demand = {
  id: number;
  waste: Waste[];
  quantity: Quantity[];
  adress: string;
  status: "pending" | "accepted" | "refused";
  user: User;
  dateBegin: Date;
  dateEnd: Date;
};
