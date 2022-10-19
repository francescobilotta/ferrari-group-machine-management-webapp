import "@testing-library/jest-dom";

import { getReasonsAsync, reasonReducer } from "./index";

describe("Testing Reason Slice", () => {
  const state = undefined;
  it("Should return the initial state", () => {
    expect(reasonReducer(state, { type: undefined })).toEqual({
      error: "",
      reasons: [],
    });
  });

  it("getReasonsAsync", () => {
    const previousState = { error: "", reasons: [] };
    expect(
      reasonReducer(previousState, {
        payload: [
          {
            descrizione: "inizioproduzione",
            disabilitato: 0,
            id: 1,
            tipo: "scarto",
          },
          {
            descrizione: "colore",
            disabilitato: 0,
            id: 2,
            tipo: "scarto",
          },
        ],
        type: getReasonsAsync.fulfilled,
      })
    ).toEqual({
      error: "",
      reasons: [
        {
          descrizione: "inizioproduzione",
          disabilitato: 0,
          id: 1,
          tipo: "scarto",
        },
        {
          descrizione: "colore",
          disabilitato: 0,
          id: 2,
          tipo: "scarto",
        },
      ],
    });
  });
});
