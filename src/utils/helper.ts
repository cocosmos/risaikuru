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
