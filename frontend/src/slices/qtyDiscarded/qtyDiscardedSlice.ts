import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { qtyDiscardedNamespace } from "../../constants/namespaces";
import { qtyDiscardedDefaultValue, QtyDiscardedType } from "../../models";
import {
  createQtyDiscardedAsync,
  deleteQtyDiscardedAsync,
  getQtyDiscardedAsync,
  updateQtyDiscardedAsync,
} from "./qtyDiscardedAsyncActions";

export const slice = createSlice({
  extraReducers: (builder) => {
    // getQtyDiscardedAsync
    builder.addCase(getQtyDiscardedAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.getQtyDiscarded(state, {
        payload: action.payload,
        type: "getQtyDiscarded",
      });
    });
    builder.addCase(getQtyDiscardedAsync.rejected, (state, action) => {
      state.error = "Errore nell'ottenere le quantità avanzate";
      console.log(action.payload);
      console.log(action.error);
    });
    // createQtyDiscardedAsync
    builder.addCase(createQtyDiscardedAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.createQtyDiscarded(state, {
        payload: action.payload,
        type: "createQtyDiscarded",
      });
    });
    builder.addCase(createQtyDiscardedAsync.rejected, (state, action) => {
      state.error = "Errore nella creazione della quantità avanzata";
      console.log(action.payload);
      console.log(action.error);
    });
    // updateQtyDiscardedAsync
    builder.addCase(updateQtyDiscardedAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.updateQtyDiscarded(state, {
        payload: action.payload,
        type: "updateQtyDiscarded",
      });
    });
    builder.addCase(updateQtyDiscardedAsync.rejected, (state, action) => {
      state.error = "Errore nella modifica della quantità avanzata";
      console.log(action.payload);
      console.log(action.error);
    });
    // deleteQtyDiscardedAsync
    builder.addCase(deleteQtyDiscardedAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.deleteQtyDiscarded(state, {
        payload: action.payload,
        type: "deleteQtyDiscarded",
      });
    });
    builder.addCase(deleteQtyDiscardedAsync.rejected, (state, action) => {
      state.error = "Errore nella rimozione della quantità avanzata";
      console.log(action.payload);
      console.log(action.error);
    });
  },
  initialState: qtyDiscardedDefaultValue,
  name: qtyDiscardedNamespace,
  reducers: {
    createQtyDiscarded(state, action: PayloadAction<QtyDiscardedType>) {
      state.qtyDiscarded.push(action.payload);
    },
    deleteQtyDiscarded(state, action: PayloadAction<number>) {
      state.qtyDiscarded = state.qtyDiscarded.filter(
        (e: QtyDiscardedType) => e.id !== action.payload
      );
    },
    getQtyDiscarded(state, action: PayloadAction<QtyDiscardedType[]>) {
      state.qtyDiscarded = action.payload;
    },
    updateQtyDiscarded(state, action: PayloadAction<QtyDiscardedType>) {
      const index = state.qtyDiscarded.findIndex(
        (e: QtyDiscardedType) => e.id === action.payload.id
      );
      state.qtyDiscarded[index] = action.payload;
    },
  },
});

export default slice.reducer;
