import { createAsyncThunk } from "@reduxjs/toolkit";

import { getReasonsAxios } from "../../api/services";
import { ReasonActionTypes } from "./reasonActionTypes";

export const getReasonsAsync = createAsyncThunk(
  ReasonActionTypes.GET_REASONS_ASYNC,
  async (_, thunkAPI) => {
    try {
      const response = await getReasonsAxios();
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);
