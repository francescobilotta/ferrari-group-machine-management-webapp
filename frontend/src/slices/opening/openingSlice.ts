import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { openingNamespace } from "../../constants/namespaces";
import { openingDefaultValue, OpeningType } from "../../models";
import {
  createOpeningAsync,
  deleteOpeningAsync,
  getOpeningsAsync,
  updateOpeningAsync,
} from "./openingAsyncActions";

export const slice = createSlice({
  extraReducers: (builder) => {
    // getOpeningsAsync
    builder.addCase(getOpeningsAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.getOpenings(state, {
        payload: action.payload,
        type: "getOpenings",
      });
    });
    builder.addCase(getOpeningsAsync.rejected, (state, action) => {
      state.error = "Errore nell'ottenere le aperture";
      console.log(action.payload);
      console.log(action.error);
    });
    // updateOpeningAsync
    builder.addCase(updateOpeningAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.updateOpening(state, {
        payload: action.payload,
        type: "updateOpening",
      });
    });
    builder.addCase(updateOpeningAsync.rejected, (state, action) => {
      state.error = "Errore nell'update dell'apertura";
      console.log(action.payload);
      console.log(action.error);
    });
    // createOpeningAsync
    builder.addCase(createOpeningAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.createOpening(state, {
        payload: action.payload,
        type: "createOpening",
      });
    });
    builder.addCase(createOpeningAsync.rejected, (state, action) => {
      state.error = "Errore nella creazione dell'apertura";
      console.log(action.payload);
      console.log(action.error);
    });
    // deleteOpeningAsync
    builder.addCase(deleteOpeningAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.deleteOpening(state, {
        payload: action.payload,
        type: "deleteOpening",
      });
    });
    builder.addCase(deleteOpeningAsync.rejected, (state, action) => {
      state.error = "Errore nella rimozione dell'apertura";
      console.log(action.payload);
      console.log(action.error);
    });
  },
  initialState: openingDefaultValue,
  name: openingNamespace,
  reducers: {
    createOpening(state, action: PayloadAction<OpeningType>) {
      state.openings.push(action.payload);
    },
    deleteOpening(state, action: PayloadAction<number>) {
      state.openings = state.openings.filter(
        (e: OpeningType) => e.id !== action.payload
      );
    },
    getOpenings(state, action: PayloadAction<OpeningType[]>) {
      state.openings = action.payload;
    },
    updateOpening(state, action: PayloadAction<OpeningType>) {
      const index = state.openings.findIndex(
        (e: OpeningType) => e.id === action.payload.id
      );
      state.openings[index] = action.payload;
    },
  },
});

export default slice.reducer;
