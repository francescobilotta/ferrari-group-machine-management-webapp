export type QtyDiscardedType = {
  id?: number;
  opsid: number;
  data: string;
  qtascartata: number;
  causale: number;
  datacreazione: string;
  disabilitato: number;
};

export const qtyDiscardedDefaultValue = {
  error: null as string | null,
  qtyDiscarded: [] as QtyDiscardedType[],
};
