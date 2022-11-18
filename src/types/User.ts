import { nanoid } from "nanoid";

export interface User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  profilePicture: string;
  totalMoney: number;
}

export const createUser = (
  fname: string,
  lname: string,
  email: string,
  totalMoney = 0,
  profilePicture = "https://ionicframework.com/docs/img/demos/avatar.svg"
): User => {
  return { id: nanoid(), fname, lname, email, profilePicture, totalMoney };
};
