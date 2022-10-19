import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { progressNamespace } from "../../constants/namespaces";
import { progressDefaultValue, ProgressType } from "../../models";
import {
  createProgressAsync,
  deleteProgressAsync,
  getProgressesAsync,
  updateProgressAsync,
} from "./progressAsyncActions";

export const slice = createSlice({
  extraReducers: (builder) => {
    // getProgressesAsync
    builder.addCase(getProgressesAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.getProgresses(state, {
        payload: action.payload,
        type: "getProgresses",
      });
    });
    builder.addCase(getProgressesAsync.rejected, (state, action) => {
      state.error = "Errore nell'ottenere i progressi";
      console.log(action.payload);
      console.log(action.error);
    });
    // updateProgressAsync
    builder.addCase(updateProgressAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.updateProgress(state, {
        payload: action.payload,
        type: "updateProgress",
      });
    });
    builder.addCase(updateProgressAsync.rejected, (state, action) => {
      state.error = "Errore nell'update del progresso";
      console.log(action.payload);
      console.log(action.error);
    });
    // createProgressAsync
    builder.addCase(createProgressAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.createProgress(state, {
        payload: action.payload,
        type: "createProgress",
      });
    });
    builder.addCase(createProgressAsync.rejected, (state, action) => {
      state.error = "Errore nella creazione del progresso";
      console.log(action.payload);
      console.log(action.error);
    });
    // deleteProgressAsync
    builder.addCase(deleteProgressAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.deleteProgress(state, {
        payload: action.payload,
        type: "deleteProgress",
      });
    });
    builder.addCase(deleteProgressAsync.rejected, (state, action) => {
      state.error = "Errore nella rimozione del progresso";
      console.log(action.payload);
      console.log(action.error);
    });
  },
  initialState: progressDefaultValue,
  name: progressNamespace,
  reducers: {
    createProgress(state, action: PayloadAction<ProgressType>) {
      state.progresses.push(action.payload);
    },
    deleteProgress(state, action: PayloadAction<number>) {
      state.progresses = state.progresses.filter(
        (e: ProgressType) => e.id !== action.payload
      );
    },
    getProgresses(state, action: PayloadAction<ProgressType[]>) {
      state.progresses = action.payload;
    },
    updateProgress(state, action: PayloadAction<ProgressType>) {
      const index = state.progresses.findIndex(
        (e: ProgressType) => e.id === action.payload.id
      );
      state.progresses[index] = action.payload;
    },
  },
});

export default slice.reducer;
