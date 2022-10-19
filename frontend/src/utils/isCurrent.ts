export const isCurrent = (start: string, end: string) => {
  const nullTime = "0000-00-00 00:00:00";
  return start !== nullTime && end === nullTime ? "In corso" : end;
};
