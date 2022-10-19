export type MachineType = {
  COD_MACCHINA: string;
  DESCRIZIONE: string;
  PRIORITA: number;
  CORRIDOIO: string;
  PI_NOTE: string;
};

export const machineDefaultValue = {
  error: null as string | null,
  machines: [] as MachineType[],
};
