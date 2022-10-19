import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteQtyProgressedAxios,
  getQtyProgressedAxios,
  postQtyProgressedAxios,
  putQtyProgressedAxios,
} from "../../api/services";
import { QtyProgressedType } from "../../models";
import { QtyProgressedActionTypes } from "./qtyProgressedActionTypes";

export const getQtyProgressedAsync = createAsyncThunk(
  QtyProgressedActionTypes.GET_QTYPROGRESSED_ASYNC,
  async (_, thunkAPI) => {
    try {
      const response = await getQtyProgressedAxios();
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const createQtyProgressedAsync = createAsyncThunk(
  QtyProgressedActionTypes.CREATE_QTYPROGRESSED_ASYNC,
  async (update: QtyProgressedType, thunkAPI) => {
    try {
      const response = await postQtyProgressedAxios(update);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const updateQtyProgressedAsync = createAsyncThunk(
  QtyProgressedActionTypes.UPDATE_QTYPROGRESSED_ASYNC,
  async (update: QtyProgressedType, thunkAPI) => {
    try {
      const response = await putQtyProgressedAxios(update);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const deleteQtyProgressedAsync = createAsyncThunk(
  QtyProgressedActionTypes.DELETE_QTYPROGRESSED_ASYNC,
  async (id: number | undefined, thunkAPI) => {
    if (typeof id !== undefined) {
      try {
        const response = await deleteQtyProgressedAxios(id!);
        return response.data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
      }
    }
    return thunkAPI.rejectWithValue(
      `Can't delete qtyProgressed with undefined id`
    );
  }
);
