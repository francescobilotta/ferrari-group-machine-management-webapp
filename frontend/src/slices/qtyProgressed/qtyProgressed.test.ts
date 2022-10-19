import "@testing-library/jest-dom";

import {
  createQtyProgressedAsync,
  deleteQtyProgressedAsync,
  getQtyProgressedAsync,
  qtyProgressedReducer,
  updateQtyProgressedAsync,
} from "./index";

describe("Testing qtyProgressed Slice", () => {
  const state = undefined;
  it("Should return the initial state", () => {
    expect(qtyProgressedReducer(state, { type: undefined })).toEqual({
      error: "",
      qtyProgressed: [],
    });
  });

  it("getQtyProgressedAsync", () => {
    const previousState = { error: "", qtyProgressed: [] };
    expect(
      qtyProgressedReducer(previousState, {
        payload: [
          {
            data: "2022-09-22",
            datacreazione: "2022-09-22 13:21:00",
            disabilitato: 0,
            id: 1,
            opsid: 3644,
            qtaavanzata: 1,
          },
        ],
        type: getQtyProgressedAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      qtyProgressed: [
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 1,
          opsid: 3644,
          qtaavanzata: 1,
        },
      ],
    });
  });

  it("createQtyProgressedAsync", () => {
    const previousState = {
      error: "",
      qtyProgressed: [
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 1,
          opsid: 3644,
          qtaavanzata: 1,
        },
      ],
    };
    expect(
      qtyProgressedReducer(previousState, {
        payload: {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 2,
          opsid: 3644,
          qtaavanzata: 1,
        },
        type: createQtyProgressedAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      qtyProgressed: [
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 1,
          opsid: 3644,
          qtaavanzata: 1,
        },
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 2,
          opsid: 3644,
          qtaavanzata: 1,
        },
      ],
    });
  });

  it("updateQtyProgressedAsync", () => {
    const previousState = {
      error: "",
      qtyProgressed: [
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 1,
          opsid: 3644,
          qtaavanzata: 1,
        },
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 2,
          opsid: 3644,
          qtaavanzata: 1,
        },
      ],
    };
    expect(
      qtyProgressedReducer(previousState, {
        payload: {
          data: "2022-09-23",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 2,
          opsid: 3644,
          qtaavanzata: 1,
        },
        type: updateQtyProgressedAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      qtyProgressed: [
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 1,
          opsid: 3644,
          qtaavanzata: 1,
        },
        {
          data: "2022-09-23",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 2,
          opsid: 3644,
          qtaavanzata: 1,
        },
      ],
    });
  });

  it("deleteQtyProgressedAsync", () => {
    const previousState = {
      error: "",
      qtyProgressed: [
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 1,
          opsid: 3644,
          qtaavanzata: 1,
        },
        {
          data: "2022-09-23",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 2,
          opsid: 3644,
          qtaavanzata: 1,
        },
      ],
    };
    expect(
      qtyProgressedReducer(previousState, {
        payload: 2,
        type: deleteQtyProgressedAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      qtyProgressed: [
        {
          data: "2022-09-22",
          datacreazione: "2022-09-22 13:21:00",
          disabilitato: 0,
          id: 1,
          opsid: 3644,
          qtaavanzata: 1,
        },
      ],
    });
  });
});
