/* eslint-disable @typescript-eslint/no-unused-vars */
import "@testing-library/jest-dom";

import {
  createProgressAsync,
  deleteProgressAsync,
  getProgressesAsync,
  progressReducer,
  updateProgressAsync,
} from "./index";

describe("Testing Progress Slice", () => {
  const state = undefined;
  it("Should return the initial state", () => {
    expect(progressReducer(state, { type: undefined })).toEqual({
      error: "",
      progresses: [],
    });
  });

  it("getProgressesAsync", () => {
    const previousState = { error: "", progresses: [] };
    expect(
      progressReducer(previousState, {
        payload: [
          {
            data: "2022-09-22",
            datacreazione: "2022-09-22 13:18:00",
            disabilitato: 0,
            fineavanzamento: "2022-09-27 08:42:00",
            id: 1,
            inizioavanzamento: "2022-09-22 13:18:00",
            opsid: 3644,
          },
        ],
        type: getProgressesAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      progresses: [
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:18:00",
          disabilitato: 0,
          fineavanzamento: "2022-09-27 08:42:00",
          id: 1,
          inizioavanzamento: "2022-09-22 13:18:00",
          opsid: 3644,
        },
      ],
    });
  });

  it("createProgressAsync", () => {
    const previousState = {
      error: "",
      progresses: [
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:18:00",
          disabilitato: 0,
          fineavanzamento: "2022-09-27 08:42:00",
          id: 1,
          inizioavanzamento: "2022-09-22 13:18:00",
          opsid: 3644,
        },
      ],
    };
    expect(
      progressReducer(previousState, {
        payload: {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:18:00",
          disabilitato: 0,
          fineavanzamento: "2022-09-27 08:42:00",
          id: 2,
          inizioavanzamento: "2022-09-22 13:18:00",
          opsid: 3644,
        },
        type: createProgressAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      progresses: [
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:18:00",
          disabilitato: 0,
          fineavanzamento: "2022-09-27 08:42:00",
          id: 1,
          inizioavanzamento: "2022-09-22 13:18:00",
          opsid: 3644,
        },
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:18:00",
          disabilitato: 0,
          fineavanzamento: "2022-09-27 08:42:00",
          id: 2,
          inizioavanzamento: "2022-09-22 13:18:00",
          opsid: 3644,
        },
      ],
    });
  });

  it("updateProgressAsync", () => {
    const previousState = {
      error: "",
      progresses: [
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:18:00",
          disabilitato: 0,
          fineavanzamento: "2022-09-27 08:42:00",
          id: 1,
          inizioavanzamento: "2022-09-22 13:18:00",
          opsid: 3644,
        },
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:18:00",
          disabilitato: 0,
          fineavanzamento: "2022-09-27 08:42:00",
          id: 2,
          inizioavanzamento: "2022-09-22 13:18:00",
          opsid: 3644,
        },
      ],
    };
    expect(
      progressReducer(previousState, {
        payload: {
          data: "2022-09-23",
          datacreazione: "2022-09-22 13:18:00",
          disabilitato: 0,
          fineavanzamento: "2022-09-27 08:42:00",
          id: 2,
          inizioavanzamento: "2022-09-22 13:18:00",
          opsid: 3644,
        },
        type: updateProgressAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      progresses: [
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:18:00",
          disabilitato: 0,
          fineavanzamento: "2022-09-27 08:42:00",
          id: 1,
          inizioavanzamento: "2022-09-22 13:18:00",
          opsid: 3644,
        },
        {
          data: "2022-09-23",
          datacreazione: "2022-09-22 13:18:00",
          disabilitato: 0,
          fineavanzamento: "2022-09-27 08:42:00",
          id: 2,
          inizioavanzamento: "2022-09-22 13:18:00",
          opsid: 3644,
        },
      ],
    });
  });

  it("deleteProgressAsync", () => {
    const previousState = {
      error: "",
      progresses: [
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:18:00",
          disabilitato: 0,
          fineavanzamento: "2022-09-27 08:42:00",
          id: 1,
          inizioavanzamento: "2022-09-22 13:18:00",
          opsid: 3644,
        },
        {
          data: "2022-09-23",
          datacreazione: "2022-09-22 13:18:00",
          disabilitato: 0,
          fineavanzamento: "2022-09-27 08:42:00",
          id: 2,
          inizioavanzamento: "2022-09-22 13:18:00",
          opsid: 3644,
        },
      ],
    };
    expect(
      progressReducer(previousState, {
        payload: 2,
        type: deleteProgressAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      progresses: [
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:18:00",
          disabilitato: 0,
          fineavanzamento: "2022-09-27 08:42:00",
          id: 1,
          inizioavanzamento: "2022-09-22 13:18:00",
          opsid: 3644,
        },
      ],
    });
  });
});
