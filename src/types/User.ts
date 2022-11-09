export type User = {
  id: number;
  name: string;
  email: string;
  profile: string;
  totalMoney: number;
};

export const user = (
  id: number,
  name: string,
  email: string,
  profile = "https://ionicframework.com/docs/img/demos/avatar.svg",
  totalMoney = 0
): User => {
  return { id, name, email, profile, totalMoney };
};
