const months = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

const days = ["Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam.", "Dim."];

export function fDate(dateBegin: Date, dateEnd: Date, simple = false) {
  const dateLocalB = new Date(dateBegin);
  const dateLocalE = new Date(dateEnd);

  if (simple) {
    return (
      ("0" + dateLocalB.getDate()).slice(-2) +
      "/" +
      ("0" + dateLocalB.getMonth()).slice(-2) +
      "/" +
      dateLocalB.getFullYear() +
      dateLocalB.getHours() +
      "h-" +
      dateLocalE.getHours() +
      "h"
    );
  }

  return (
    ("0" + dateLocalB.getDate()).slice(-2) +
    " " +
    months[dateLocalB.getMonth()] +
    " " +
    dateLocalB.getHours() +
    "h-" +
    dateLocalE.getHours() +
    "h"
  );
}

export function fHour(date: Date) {
  const dateLocal = new Date(date);
  return (
    ("0" + dateLocal.getHours()).slice(-2) +
    ":" +
    ("0" + dateLocal.getMinutes()).slice(-2)
  );
}

export function fDay(date: Date) {
  const dateLocal = new Date(date);
  return (
    days[dateLocal.getDay()] +
    " " +
    ("0" + dateLocal.getDate()).slice(-2) +
    " " +
    months[dateLocal.getMonth()] +
    " " +
    dateLocal.getFullYear()
  );
}

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "CHF",
  }).format(amount);
};

export const formatPercent = (amount: number, maxWidthdraw: number) => {
  return (amount / maxWidthdraw) * 100;
};
