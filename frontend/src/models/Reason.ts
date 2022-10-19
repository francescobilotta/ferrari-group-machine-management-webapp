export type ReasonType = {
  id: number;
  tipo: string;
  descrizione: string;
  disabilitato: number;
};

export const reasonDefaultValue = {
  error: null as string | null,
  reasons: [] as ReasonType[],
};
