export type QtyProgressedType = {
  id?: number;
  opsid: number;
  data: string;
  qtaavanzata: number;
  datacreazione: string;
  disabilitato: number;
};

export const qtyProgressedDefaultValue = {
  error: null as string | null,
  qtyProgressed: [] as QtyProgressedType[],
};
