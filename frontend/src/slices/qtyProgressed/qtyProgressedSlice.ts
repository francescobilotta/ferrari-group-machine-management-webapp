import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { qtyProgressedNamespace } from "../../constants/namespaces";
import { qtyProgressedDefaultValue, QtyProgressedType } from "../../models";
import {
  createQtyProgressedAsync,
  deleteQtyProgressedAsync,
  getQtyProgressedAsync,
  updateQtyProgressedAsync,
} from "./qtyProgressedAsyncActions";

export const slice = createSlice({
  extraReducers: (builder) => {
    // getQtyProgressedAsync
    builder.addCase(getQtyProgressedAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.getQtyProgressed(state, {
        payload: action.payload,
        type: "getQtyProgressed",
      });
    });
    builder.addCase(getQtyProgressedAsync.rejected, (state, action) => {
      state.error = "Errore nell'ottenere le quantità avanzate";
      console.log(action.payload);
      console.log(action.error);
    });
    // createQtyProgressedAsync
    builder.addCase(createQtyProgressedAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.createQtyProgressed(state, {
        payload: action.payload,
        type: "createQtyProgressed",
      });
    });
    builder.addCase(createQtyProgressedAsync.rejected, (state, action) => {
      state.error = "Errore nella creazione della quantità avanzata";
      console.log(action.payload);
      console.log(action.error);
    });
    // updateQtyProgressedAsync
    builder.addCase(updateQtyProgressedAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.updateQtyProgressed(state, {
        payload: action.payload,
        type: "updateQtyProgressed",
      });
    });
    builder.addCase(updateQtyProgressedAsync.rejected, (state, action) => {
      state.error = "Errore nella modifica della quantità avanzata";
      console.log(action.payload);
      console.log(action.error);
    });
    // deleteQtyProgressedAsync
    builder.addCase(deleteQtyProgressedAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.deleteQtyProgressed(state, {
        payload: action.payload,
        type: "deleteQtyProgressed",
      });
    });
    builder.addCase(deleteQtyProgressedAsync.rejected, (state, action) => {
      state.error = "Errore nella rimozione della quantità avanzata";
      console.log(action.payload);
      console.log(action.error);
    });
  },
  initialState: qtyProgressedDefaultValue,
  name: qtyProgressedNamespace,
  reducers: {
    createQtyProgressed(state, action: PayloadAction<QtyProgressedType>) {
      state.qtyProgressed.push(action.payload);
    },
    deleteQtyProgressed(state, action: PayloadAction<number>) {
      state.qtyProgressed = state.qtyProgressed.filter(
        (e: QtyProgressedType) => e.id !== action.payload
      );
    },
    getQtyProgressed(state, action: PayloadAction<QtyProgressedType[]>) {
      state.qtyProgressed = action.payload;
    },
    updateQtyProgressed(state, action: PayloadAction<QtyProgressedType>) {
      const index = state.qtyProgressed.findIndex(
        (e: QtyProgressedType) => e.id === action.payload.id
      );
      state.qtyProgressed[index] = action.payload;
    },
  },
});

export default slice.reducer;
