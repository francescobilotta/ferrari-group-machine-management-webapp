import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { stopNamespace } from "../../constants/namespaces";
import { stopDefaultValue, StopType } from "../../models";
import {
  createStopAsync,
  deleteStopAsync,
  getStopsAsync,
  updateStopAsync,
} from "./stopAsyncActions";

export const slice = createSlice({
  extraReducers: (builder) => {
    // getStopsAsync
    builder.addCase(getStopsAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.getStops(state, {
        payload: action.payload,
        type: "getStops",
      });
    });
    builder.addCase(getStopsAsync.rejected, (state, action) => {
      state.error = "Errore nell'ottenere i fermi";
      console.log(action.payload);
      console.log(action.error);
    });
    // updateStopAsync
    builder.addCase(updateStopAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.updateStop(state, {
        payload: action.payload,
        type: "updateStop",
      });
    });
    builder.addCase(updateStopAsync.rejected, (state, action) => {
      state.error = "Errore nell'update di fermo";
      console.log(action.payload);
      console.log(action.error);
    });
    // createStopAsync
    builder.addCase(createStopAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.createStop(state, {
        payload: action.payload,
        type: "createStop",
      });
    });
    builder.addCase(createStopAsync.rejected, (state, action) => {
      state.error = "Errore nella creazione del fermo";
      console.log(action.payload);
      console.log(action.error);
    });
    // deleteStopAsync
    builder.addCase(deleteStopAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.deleteStop(state, {
        payload: action.payload,
        type: "deleteStop",
      });
    });
    builder.addCase(deleteStopAsync.rejected, (state, action) => {
      state.error = "Errore nella rimozione del fermo";
      console.log(action.payload);
      console.log(action.error);
    });
  },
  initialState: stopDefaultValue,
  name: stopNamespace,
  reducers: {
    createStop(state, action: PayloadAction<StopType>) {
      state.stops.push(action.payload);
    },
    deleteStop(state, action: PayloadAction<number>) {
      state.stops = state.stops.filter(
        (e: StopType) => e.id !== action.payload
      );
    },
    getStops(state, action: PayloadAction<StopType[]>) {
      state.stops = action.payload;
    },
    updateStop(state, action: PayloadAction<StopType>) {
      const index = state.stops.findIndex(
        (e: StopType) => e.id === action.payload.id
      );
      state.stops[index] = action.payload;
    },
  },
});

export default slice.reducer;
