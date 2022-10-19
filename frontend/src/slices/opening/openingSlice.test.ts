import "@testing-library/jest-dom";

import {
  createOpeningAsync,
  deleteOpeningAsync,
  getOpeningsAsync,
  openingReducer,
  updateOpeningAsync,
} from "./index";

describe("Testing Opening Slice", () => {
  const state = undefined;
  it("Should return the initial state", () => {
    expect(openingReducer(state, { type: undefined })).toEqual({
      error: "",
      openings: [],
    });
  });

  it("getOpeningsAsync", () => {
    const previousState = { error: "", openings: [] };
    expect(
      openingReducer(previousState, {
        payload: [
          {
            data: "2022-09-19",
            datacreazione: "2022-09-21 13:28:00",
            disabilitato: 0,
            fineeffettiva: "0000-00-00 00:00:00",
            finepianificata: "2022-09-19 18:00:00",
            id: 1,
            inizioeffettivo: "0000-00-00 00:00:00",
            iniziopianificato: "2022-09-19 09:00:00",
            macchina: "IMEX120",
            modificato: 0,
          },
        ],
        type: getOpeningsAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      openings: [
        {
          data: "2022-09-19",
          datacreazione: "2022-09-21 13:28:00",
          disabilitato: 0,
          fineeffettiva: "0000-00-00 00:00:00",
          finepianificata: "2022-09-19 18:00:00",
          id: 1,
          inizioeffettivo: "0000-00-00 00:00:00",
          iniziopianificato: "2022-09-19 09:00:00",
          macchina: "IMEX120",
          modificato: 0,
        },
      ],
    });
  });

  it("createOpeningAsync", () => {
    const previousState = {
      error: "",
      openings: [
        {
          data: "2022-09-19",
          datacreazione: "2022-09-21 13:28:00",
          disabilitato: 0,
          fineeffettiva: "0000-00-00 00:00:00",
          finepianificata: "2022-09-19 18:00:00",
          id: 1,
          inizioeffettivo: "0000-00-00 00:00:00",
          iniziopianificato: "2022-09-19 09:00:00",
          macchina: "IMEX120",
          modificato: 0,
        },
      ],
    };
    expect(
      openingReducer(previousState, {
        payload: {
          data: "2022-09-19",
          datacreazione: "2022-09-21 13:28:00",
          disabilitato: 0,
          fineeffettiva: "0000-00-00 00:00:00",
          finepianificata: "2022-09-19 18:00:00",
          id: 2,
          inizioeffettivo: "0000-00-00 00:00:00",
          iniziopianificato: "2022-09-19 09:00:00",
          macchina: "Apertura test",
          modificato: 0,
        },
        type: createOpeningAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      openings: [
        {
          data: "2022-09-19",
          datacreazione: "2022-09-21 13:28:00",
          disabilitato: 0,
          fineeffettiva: "0000-00-00 00:00:00",
          finepianificata: "2022-09-19 18:00:00",
          id: 1,
          inizioeffettivo: "0000-00-00 00:00:00",
          iniziopianificato: "2022-09-19 09:00:00",
          macchina: "IMEX120",
          modificato: 0,
        },
        {
          data: "2022-09-19",
          datacreazione: "2022-09-21 13:28:00",
          disabilitato: 0,
          fineeffettiva: "0000-00-00 00:00:00",
          finepianificata: "2022-09-19 18:00:00",
          id: 2,
          inizioeffettivo: "0000-00-00 00:00:00",
          iniziopianificato: "2022-09-19 09:00:00",
          macchina: "Apertura test",
          modificato: 0,
        },
      ],
    });
  });

  it("updateOpeningAsync", () => {
    const previousState = {
      error: "",
      openings: [
        {
          data: "2022-09-19",
          datacreazione: "2022-09-21 13:28:00",
          disabilitato: 0,
          fineeffettiva: "0000-00-00 00:00:00",
          finepianificata: "2022-09-19 18:00:00",
          id: 1,
          inizioeffettivo: "0000-00-00 00:00:00",
          iniziopianificato: "2022-09-19 09:00:00",
          macchina: "IMEX120",
          modificato: 0,
        },
        {
          data: "2022-09-19",
          datacreazione: "2022-09-21 13:28:00",
          disabilitato: 0,
          fineeffettiva: "0000-00-00 00:00:00",
          finepianificata: "2022-09-19 18:00:00",
          id: 2,
          inizioeffettivo: "0000-00-00 00:00:00",
          iniziopianificato: "2022-09-19 09:00:00",
          macchina: "Apertura test",
          modificato: 0,
        },
      ],
    };
    expect(
      openingReducer(previousState, {
        payload: {
          data: "2022-09-20",
          datacreazione: "2022-09-21 13:28:00",
          disabilitato: 0,
          fineeffettiva: "0000-00-00 00:00:00",
          finepianificata: "2022-09-19 18:00:00",
          id: 2,
          inizioeffettivo: "0000-00-00 00:00:00",
          iniziopianificato: "2022-09-19 09:00:00",
          macchina: "Apertura test",
          modificato: 0,
        },
        type: updateOpeningAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      openings: [
        {
          data: "2022-09-19",
          datacreazione: "2022-09-21 13:28:00",
          disabilitato: 0,
          fineeffettiva: "0000-00-00 00:00:00",
          finepianificata: "2022-09-19 18:00:00",
          id: 1,
          inizioeffettivo: "0000-00-00 00:00:00",
          iniziopianificato: "2022-09-19 09:00:00",
          macchina: "IMEX120",
          modificato: 0,
        },
        {
          data: "2022-09-20",
          datacreazione: "2022-09-21 13:28:00",
          disabilitato: 0,
          fineeffettiva: "0000-00-00 00:00:00",
          finepianificata: "2022-09-19 18:00:00",
          id: 2,
          inizioeffettivo: "0000-00-00 00:00:00",
          iniziopianificato: "2022-09-19 09:00:00",
          macchina: "Apertura test",
          modificato: 0,
        },
      ],
    });
  });

  it("deleteOpeningAsync", () => {
    const previousState = {
      error: "",
      openings: [
        {
          data: "2022-09-19",
          datacreazione: "2022-09-21 13:28:00",
          disabilitato: 0,
          fineeffettiva: "0000-00-00 00:00:00",
          finepianificata: "2022-09-19 18:00:00",
          id: 1,
          inizioeffettivo: "0000-00-00 00:00:00",
          iniziopianificato: "2022-09-19 09:00:00",
          macchina: "IMEX120",
          modificato: 0,
        },
        {
          data: "2022-09-20",
          datacreazione: "2022-09-21 13:28:00",
          disabilitato: 0,
          fineeffettiva: "0000-00-00 00:00:00",
          finepianificata: "2022-09-19 18:00:00",
          id: 2,
          inizioeffettivo: "0000-00-00 00:00:00",
          iniziopianificato: "2022-09-19 09:00:00",
          macchina: "Apertura test",
          modificato: 0,
        },
      ],
    };
    expect(
      openingReducer(previousState, {
        payload: 2,
        type: deleteOpeningAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      openings: [
        {
          data: "2022-09-19",
          datacreazione: "2022-09-21 13:28:00",
          disabilitato: 0,
          fineeffettiva: "0000-00-00 00:00:00",
          finepianificata: "2022-09-19 18:00:00",
          id: 1,
          inizioeffettivo: "0000-00-00 00:00:00",
          iniziopianificato: "2022-09-19 09:00:00",
          macchina: "IMEX120",
          modificato: 0,
        },
      ],
    });
  });
});
