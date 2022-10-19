import { createAsyncThunk } from "@reduxjs/toolkit";

import { getOrdersAxios } from "../../api/services";
import { OrderActionTypes } from "./orderActionTypes";

export const getOrdersAsync = createAsyncThunk(
  OrderActionTypes.GET_ORDERS_ASYNC,
  async (_, thunkAPI) => {
    try {
      const response = await getOrdersAxios();
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);
