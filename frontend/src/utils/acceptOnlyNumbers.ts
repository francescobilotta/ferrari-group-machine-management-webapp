export const acceptOnlyNumbers = (value: string) => {
  const NON_DIGIT = "/[^d]/g";
  return parseInt(value.toString().replace(NON_DIGIT, ""), 10);
};
