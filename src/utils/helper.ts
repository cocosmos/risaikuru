export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "CHF",
  }).format(amount);
};

export const formatPercent = (amount: number, maxWidthdraw: number) => {
  return (amount / maxWidthdraw) * 100;
};
