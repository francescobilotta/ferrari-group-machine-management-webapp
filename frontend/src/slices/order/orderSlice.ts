import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { orderNamespace } from "../../constants/namespaces";
import { orderDefaultValue, OrderType } from "../../models";
import { getOrdersAsync } from "./orderAsyncActions";

export const slice = createSlice({
  extraReducers: (builder) => {
    // getOrdersAsync
    builder.addCase(getOrdersAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.getOrders(state, {
        payload: action.payload,
        type: "getOrders",
      });
    });
    builder.addCase(getOrdersAsync.rejected, (state, action) => {
      state.error = "Errore nell'ottenere gli ordini";
      console.log(action.payload);
      console.log(action.error);
    });
  },
  initialState: orderDefaultValue,
  name: orderNamespace,
  reducers: {
    getOrders(state, action: PayloadAction<OrderType[]>) {
      state.orders = action.payload;
    },
  },
});

export default slice.reducer;
