import { nanoid } from "nanoid";

export interface UserType {
  id: string;
  fname: string;
  lname: string;
  email: string;
  adress?: string;
  avatar: string;
  iban?: string;
  balance: number;
}

export const createUser = (
  fname: string,
  lname: string,
  email: string,
  balance = 0,
  avatar = "../assets/avatar.svg"
): UserType => {
  return {
    id: nanoid(),
    fname,
    lname,
    email,
    avatar,
    balance,
  };
};
