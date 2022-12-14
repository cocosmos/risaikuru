import { Day, Message } from "@/types/Message";
import { toastController } from "@ionic/vue";

export const regexCheckIban = (iban: string) => {
  const ibanRegex = new RegExp(
    "^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$"
  );
  return ibanRegex.test(iban.replace(/\s/g, ""));
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
    const dayIndex = days.findIndex(
      (d) => d.date.toDateString() === date.toDateString()
    );
    if (dayIndex === -1) {
      days.push({
        date: date,
        messages: [message],
      });
    } else {
      days[dayIndex].messages.push(message);
    }
  });

  return days;
};

export const apresentToast = async (
  message: string,
  color: string,
  duration: number,
  position: "top" | "bottom" | "middle"
) => {
  const toast = await toastController.create({
    message: message,
    color: color,
    duration: duration,
    position: position,
  });

  await toast.present();
};
