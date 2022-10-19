/* eslint-disable @typescript-eslint/no-unused-vars */
import "@testing-library/jest-dom";

import {
  createQtyDiscardedAsync,
  deleteQtyDiscardedAsync,
  getQtyDiscardedAsync,
  qtyDiscardedReducer,
  updateQtyDiscardedAsync,
} from "./index";

describe("Testing qtyDiscarded Slice", () => {
  const state = undefined;
  it("Should return the initial state", () => {
    expect(qtyDiscardedReducer(state, { type: undefined })).toEqual({
      error: "",
      qtyDiscarded: [],
    });
  });

  it("getQtyDiscardedAsync", () => {
    const previousState = { error: "", qtyDiscarded: [] };
    expect(
      qtyDiscardedReducer(previousState, {
        payload: [
          {
            causale: 1,
            data: "2022-09-22",
            datacreazione: "2022-09-22 13:21:00",
            disabilitato: 0,
            id: 1,
            opsid: 3644,
            qtascartata: 1,
          },
        ],
        type: getQtyDiscardedAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      qtyDiscarded: [
        {
          causale: 1,
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 1,
          opsid: 3644,
          qtascartata: 1,
        },
      ],
    });
  });

  it("createQtyDiscardedAsync", () => {
    const previousState = {
      error: "",
      qtyDiscarded: [
        {
          causale: 1,
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 1,
          opsid: 3644,
          qtascartata: 1,
        },
      ],
    };
    expect(
      qtyDiscardedReducer(previousState, {
        payload: {
          causale: 1,
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 2,
          opsid: 3644,
          qtascartata: 1,
        },
        type: createQtyDiscardedAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      qtyDiscarded: [
        {
          causale: 1,
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 1,
          opsid: 3644,
          qtascartata: 1,
        },
        {
          causale: 1,
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 2,
          opsid: 3644,
          qtascartata: 1,
        },
      ],
    });
  });

  it("updateQtyDiscardedAsync", () => {
    const previousState = {
      error: "",
      qtyDiscarded: [
        {
          causale: 1,
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 1,
          opsid: 3644,
          qtascartata: 1,
        },
        {
          causale: 1,
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 2,
          opsid: 3644,
          qtascartata: 1,
        },
      ],
    };
    expect(
      qtyDiscardedReducer(previousState, {
        payload: {
          causale: 2,
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 2,
          opsid: 3644,
          qtascartata: 1,
        },
        type: updateQtyDiscardedAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      qtyDiscarded: [
        {
          causale: 1,
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 1,
          opsid: 3644,
          qtascartata: 1,
        },
        {
          causale: 2,
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 2,
          opsid: 3644,
          qtascartata: 1,
        },
      ],
    });
  });

  it("deleteQtyDiscardedAsync", () => {
    const previousState = {
      error: "",
      qtyDiscarded: [
        {
          causale: 1,
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 1,
          opsid: 3644,
          qtascartata: 1,
        },
        {
          causale: 2,
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 2,
          opsid: 3644,
          qtascartata: 1,
        },
      ],
    };
    expect(
      qtyDiscardedReducer(previousState, {
        payload: 2,
        type: deleteQtyDiscardedAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      qtyDiscarded: [
        {
          causale: 1,
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 1,
          opsid: 3644,
          qtascartata: 1,
        },
      ],
    });
  });
});
