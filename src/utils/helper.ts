export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "CHF",
  }).format(amount);
};

export const formatPercent = (amount: number, maxWidthdraw: number) => {
  return (amount / maxWidthdraw) * 100;
};

export const regexCheckIban = (iban: string) => {
  const ibanRegex = new RegExp(
    "^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$"
  );
  return ibanRegex.test(iban);
};
