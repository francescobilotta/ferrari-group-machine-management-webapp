import "@testing-library/jest-dom";

import { getOrdersAsync, orderReducer } from "./index";

describe("Testing Order Slice", () => {
  const state = undefined;
  it("Should return the initial state", () => {
    expect(orderReducer(state, { type: undefined })).toEqual({
      error: "",
      orders: [],
    });
  });

  it("getOrdersAsync", () => {
    const previousState = { error: "", orders: [] };
    expect(
      orderReducer(previousState, {
        payload: [
          {
            ALTRO: null,
            COD_ARTICOLO: "STI.201.586",
            COD_COMBIPROGR: null,
            COD_ESERCIZIO: 2022,
            COD_NUM_DOC: 3665,
            COD_TIPO_DOC: "IPM",
            COLTYP: "ROSSO",
            DESCRIZIONE: "GHIERA STRINGITUBO PICCOLA IP x 2280",
            DISABILITATO: 0,
            DOC: "2022-IPM-3665",
            DOC_CHIUSO: 0,
            FINEPIANT: "27-LUG-23",
            MASTER: "MP.202",
            MOVIMENTO: 11,
            MP: "MP.006",
            MPTYP: "ABS",
            N_FIGURE: 8,
            ORELAV: "16,14583333333333333333333333333333333333",
            PAUSA: 20,
            PESOAL: 0,
            PESOCOL: "4,16925",
            PESOMP: "138,975",
            PEZZI_H: 929,
            PI_MACCHINA: null,
            QTAAPER: 15000,
            QTACONS: 0,
            QTAORD: 15000,
            RIGA_CHIUSA: 0,
            SETUP: 2,
            TEMPO_SMATAROZ: 0,
            USOALIMENTARE: 0,
          },
        ],
        type: getOrdersAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      orders: [
        {
          ALTRO: null,
          COD_ARTICOLO: "STI.201.586",
          COD_COMBIPROGR: null,
          COD_ESERCIZIO: 2022,
          COD_NUM_DOC: 3665,
          COD_TIPO_DOC: "IPM",
          COLTYP: "ROSSO",
          DESCRIZIONE: "GHIERA STRINGITUBO PICCOLA IP x 2280",
          DISABILITATO: 0,
          DOC: "2022-IPM-3665",
          DOC_CHIUSO: 0,
          FINEPIANT: "27-LUG-23",
          MASTER: "MP.202",
          MOVIMENTO: 11,
          MP: "MP.006",
          MPTYP: "ABS",
          N_FIGURE: 8,
          ORELAV: "16,14583333333333333333333333333333333333",
          PAUSA: 20,
          PESOAL: 0,
          PESOCOL: "4,16925",
          PESOMP: "138,975",
          PEZZI_H: 929,
          PI_MACCHINA: null,
          QTAAPER: 15000,
          QTACONS: 0,
          QTAORD: 15000,
          RIGA_CHIUSA: 0,
          SETUP: 2,
          TEMPO_SMATAROZ: 0,
          USOALIMENTARE: 0,
        },
      ],
    });
  });
});
