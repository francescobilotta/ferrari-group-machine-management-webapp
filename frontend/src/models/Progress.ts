export type ProgressType = {
  id?: number;
  opsid: number;
  data: string;
  inizioavanzamento: string;
  fineavanzamento: string;
  datacreazione: string;
  disabilitato: number;
};

export const progressDefaultValue = {
  error: null as string | null,
  progresses: [] as ProgressType[],
};
