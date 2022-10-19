export type StopType = {
  id?: number;
  macchina: string;
  data: string;
  iniziofermo: string;
  finefermo: string;
  causale: number;
  datacreazione: string;
  disabilitato: number;
};

export const stopDefaultValue = {
  error: null as string | null,
  stops: [] as StopType[],
};
