import "@testing-library/jest-dom";

import {
  createStopAsync,
  deleteStopAsync,
  getStopsAsync,
  stopReducer,
  updateStopAsync,
} from "./index";

describe("Testing Stop Slice", () => {
  const state = undefined;
  it("Should return the initial state", () => {
    expect(stopReducer(state, { type: undefined })).toEqual({
      error: "",
      stops: [],
    });
  });

  it("getStopsAsync", () => {
    const previousState = { error: "", stops: [] };
    expect(
      stopReducer(previousState, {
        payload: [
          {
            causale: 4,
            data: "2022-09-23",
            datacreazione: "2022-09-27 08:42:00",
            disabilitato: 0,
            finefermo: "2022-09-27 08:42:00",
            id: 3,
            iniziofermo: "2022-09-23 08:35:00",
            macchina: "IMEX120",
          },
        ],
        type: getStopsAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      stops: [
        {
          causale: 4,
          data: "2022-09-23",
          datacreazione: "2022-09-27 08:42:00",
          disabilitato: 0,
          finefermo: "2022-09-27 08:42:00",
          id: 3,
          iniziofermo: "2022-09-23 08:35:00",
          macchina: "IMEX120",
        },
      ],
    });
  });

  it("createStopAsync", () => {
    const previousState = {
      error: "",
      stops: [
        {
          causale: 4,
          data: "2022-09-23",
          datacreazione: "2022-09-27 08:42:00",
          disabilitato: 0,
          finefermo: "2022-09-27 08:42:00",
          id: 3,
          iniziofermo: "2022-09-23 08:35:00",
          macchina: "IMEX120",
        },
      ],
    };
    expect(
      stopReducer(previousState, {
        payload: {
          causale: 4,
          data: "2022-09-23",
          datacreazione: "2022-09-27 08:42:00",
          disabilitato: 0,
          finefermo: "2022-09-27 08:42:00",
          id: 4,
          iniziofermo: "2022-09-23 08:35:00",
          macchina: "IMEX120",
        },
        type: createStopAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      stops: [
        {
          causale: 4,
          data: "2022-09-23",
          datacreazione: "2022-09-27 08:42:00",
          disabilitato: 0,
          finefermo: "2022-09-27 08:42:00",
          id: 3,
          iniziofermo: "2022-09-23 08:35:00",
          macchina: "IMEX120",
        },
        {
          causale: 4,
          data: "2022-09-23",
          datacreazione: "2022-09-27 08:42:00",
          disabilitato: 0,
          finefermo: "2022-09-27 08:42:00",
          id: 4,
          iniziofermo: "2022-09-23 08:35:00",
          macchina: "IMEX120",
        },
      ],
    });
  });

  it("updateStopAsync", () => {
    const previousState = {
      error: "",
      stops: [
        {
          causale: 4,
          data: "2022-09-23",
          datacreazione: "2022-09-27 08:42:00",
          disabilitato: 0,
          finefermo: "2022-09-27 08:42:00",
          id: 3,
          iniziofermo: "2022-09-23 08:35:00",
          macchina: "IMEX120",
        },
        {
          causale: 4,
          data: "2022-09-23",
          datacreazione: "2022-09-27 08:42:00",
          disabilitato: 0,
          finefermo: "2022-09-27 08:42:00",
          id: 4,
          iniziofermo: "2022-09-23 08:35:00",
          macchina: "IMEX120",
        },
      ],
    };
    expect(
      stopReducer(previousState, {
        payload: {
          causale: 5,
          data: "2022-09-23",
          datacreazione: "2022-09-27 08:42:00",
          disabilitato: 0,
          finefermo: "2022-09-27 08:42:00",
          id: 4,
          iniziofermo: "2022-09-23 08:35:00",
          macchina: "IMEX120",
        },
        type: updateStopAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      stops: [
        {
          causale: 4,
          data: "2022-09-23",
          datacreazione: "2022-09-27 08:42:00",
          disabilitato: 0,
          finefermo: "2022-09-27 08:42:00",
          id: 3,
          iniziofermo: "2022-09-23 08:35:00",
          macchina: "IMEX120",
        },
        {
          causale: 5,
          data: "2022-09-23",
          datacreazione: "2022-09-27 08:42:00",
          disabilitato: 0,
          finefermo: "2022-09-27 08:42:00",
          id: 4,
          iniziofermo: "2022-09-23 08:35:00",
          macchina: "IMEX120",
        },
      ],
    });
  });

  it("deleteStopAsync", () => {
    const previousState = {
      error: "",
      stops: [
        {
          causale: 4,
          data: "2022-09-23",
          datacreazione: "2022-09-27 08:42:00",
          disabilitato: 0,
          finefermo: "2022-09-27 08:42:00",
          id: 3,
          iniziofermo: "2022-09-23 08:35:00",
          macchina: "IMEX120",
        },
        {
          causale: 5,
          data: "2022-09-23",
          datacreazione: "2022-09-27 08:42:00",
          disabilitato: 0,
          finefermo: "2022-09-27 08:42:00",
          id: 4,
          iniziofermo: "2022-09-23 08:35:00",
          macchina: "IMEX120",
        },
      ],
    };
    expect(
      stopReducer(previousState, {
        payload: 4,
        type: deleteStopAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      stops: [
        {
          causale: 4,
          data: "2022-09-23",
          datacreazione: "2022-09-27 08:42:00",
          disabilitato: 0,
          finefermo: "2022-09-27 08:42:00",
          id: 3,
          iniziofermo: "2022-09-23 08:35:00",
          macchina: "IMEX120",
        },
      ],
    });
  });
});
