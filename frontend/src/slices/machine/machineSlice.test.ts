import "@testing-library/jest-dom";

import { getMachinesAsync, machineReducer, updateMachineAsync } from "./index";

describe("Testing Machine Slice", () => {
  const state = undefined;
  it("Should return the initial state", () => {
    expect(machineReducer(state, { type: undefined })).toEqual({
      error: "",
      machines: [],
    });
  });

  it("getMachinesAsync", () => {
    const previousState = { error: "", machines: [] };
    expect(
      machineReducer(previousState, {
        payload: [
          {
            COD_MACCHINA: "NB90B",
            CORRIDOIO: "P01",
            DESCRIZIONE: "NB 90B",
            PI_NOTE: "Matr.700866 IP.96",
            PRIORITA: 1,
          },
          {
            COD_MACCHINA: "NB90C",
            CORRIDOIO: "P02",
            DESCRIZIONE: "NB90C",
            PI_NOTE: "Matr. 700942 IP.88",
            PRIORITA: 3,
          },
        ],
        type: getMachinesAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      machines: [
        {
          COD_MACCHINA: "NB90B",
          CORRIDOIO: "P01",
          DESCRIZIONE: "NB 90B",
          PI_NOTE: "Matr.700866 IP.96",
          PRIORITA: 1,
        },
        {
          COD_MACCHINA: "NB90C",
          CORRIDOIO: "P02",
          DESCRIZIONE: "NB90C",
          PI_NOTE: "Matr. 700942 IP.88",
          PRIORITA: 3,
        },
      ],
    });
  });

  it("updateMachineAsync", () => {
    const previousState = {
      error: "",
      machines: [
        {
          COD_MACCHINA: "NB90B",
          CORRIDOIO: "P01",
          DESCRIZIONE: "NB 90B",
          PI_NOTE: "Matr.700866 IP.96",
          PRIORITA: 1,
        },
        {
          COD_MACCHINA: "NB90C",
          CORRIDOIO: "P02",
          DESCRIZIONE: "NB90C",
          PI_NOTE: "Matr. 700942 IP.88",
          PRIORITA: 3,
        },
      ],
    };
    expect(
      machineReducer(previousState, {
        payload: {
          COD_MACCHINA: "NB90B",
          CORRIDOIO: "P01",
          DESCRIZIONE: "NB 90B",
          PI_NOTE: "Matr.700866 IP.96",
          PRIORITA: 2,
        },
        type: updateMachineAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      machines: [
        {
          COD_MACCHINA: "NB90B",
          CORRIDOIO: "P01",
          DESCRIZIONE: "NB 90B",
          PI_NOTE: "Matr.700866 IP.96",
          PRIORITA: 2,
        },
        {
          COD_MACCHINA: "NB90C",
          CORRIDOIO: "P02",
          DESCRIZIONE: "NB90C",
          PI_NOTE: "Matr. 700942 IP.88",
          PRIORITA: 3,
        },
      ],
    });
  });
});
