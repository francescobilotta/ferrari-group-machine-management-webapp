import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { reasonNamespace } from "../../constants/namespaces";
import { reasonDefaultValue, ReasonType } from "../../models";
import { getReasonsAsync } from "./reasonAsyncActions";

export const slice = createSlice({
  extraReducers: (builder) => {
    // getReasonsAsync
    builder.addCase(getReasonsAsync.fulfilled, (state, action) => {
      state.error = null;
      slice.caseReducers.getReasons(state, {
        payload: action.payload,
        type: "getReasons",
      });
    });
    builder.addCase(getReasonsAsync.rejected, (state, action) => {
      state.error = "Errore nell'ottenere le causali";
      console.log(action.payload);
      console.log(action.error);
    });
  },
  initialState: reasonDefaultValue,
  name: reasonNamespace,
  reducers: {
    getReasons(state, action: PayloadAction<ReasonType[]>) {
      state.reasons = action.payload;
    },
  },
});

export default slice.reducer;
