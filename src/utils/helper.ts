import { Day, Message } from "@/types/Message";

export const regexCheckIban = (iban: string) => {
  const ibanRegex = new RegExp(
    "^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$"
  );
  return ibanRegex.test(iban);
};

export const regexCheckEmail = (email: string) => {
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
  );
  return emailRegex.test(email);
};

export const returnMessagesByDay = (messages: Message[]) => {
  const days: Day[] = [];

  messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  messages.forEach((message) => {
    const date = new Date(message.createdAt);
    const day = date.toLocaleDateString();
    const dayIndex = days.findIndex((d) => d.date === day);
    if (dayIndex === -1) {
      days.push({
        date: day,
        messages: [message],
      });
    } else {
      days[dayIndex].messages.push(message);
    }
  });

  return days;
};
