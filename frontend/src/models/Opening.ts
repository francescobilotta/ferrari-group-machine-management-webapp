export type OpeningType = {
  id?: number;
  macchina: string;
  data: string;
  iniziopianificato: string;
  inizioeffettivo: string;
  finepianificata: string;
  fineeffettiva: string;
  datacreazione: string;
  modificato: number;
  disabilitato: number;
};

export const openingDefaultValue = {
  error: null as string | null,
  openings: [] as OpeningType[],
};
