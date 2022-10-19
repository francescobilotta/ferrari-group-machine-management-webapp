export type OracleOrderType = {
  COD_ARTICOLO: string;
  COD_COMBIPROGR: null;
  DESCRIZIONE: string;
  USOALIMENTARE: number;
  COD_ESERCIZIO: number;
  COD_TIPO_DOC: string;
  COD_NUM_DOC: number;
  DOC: string;
  PI_MACCHINA: null;
  FINEPIANT: string;
  QTAORD: number;
  QTACONS: number;
  QTAAPER: number;
  MP: string;
  MPTYP: string;
  PESOMP: string;
  MASTER: string;
  COLTYP: string;
  PESOCOL: string;
  ALTRO: null;
  PESOAL: number;
  PAUSA: number;
  MOVIMENTO: number;
  N_FIGURE: number;
  TEMPO_SMATAROZ: number;
  PEZZI_H: number;
  ORELAV: string;
  SETUP: number;
  DOC_CHIUSO: number;
  RIGA_CHIUSA: number;
  OPSID: number;
};

export type OrderType = {
  seq: number;
  cdl: string;
  id: number;
  qtaord: number;
  note: string;
};

export const orderDefaultValue = {
  error: null as string | null,
  orders: [] as OrderType[],
};
