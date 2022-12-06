export function fDate(dateBegin: Date, dateEnd: Date) {
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
  const dateLocalB = new Date(dateBegin);
  const dateLocalE = new Date(dateEnd);

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
