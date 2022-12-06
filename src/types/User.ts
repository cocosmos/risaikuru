import { nanoid } from "nanoid";

export interface UserType {
  id: string;
  fname: string;
  lname: string;
  email: string;
  adress?: string;
  profilePicture: string;
  iban?: string;
  balance: number;
}

export const createUser = (
  fname: string,
  lname: string,
  email: string,
  balance = 0,
  profilePicture = "../assets/avatar.svg"
): UserType => {
  return {
    id: nanoid(),
    fname,
    lname,
    email,
    profilePicture,
    balance,
  };
};
