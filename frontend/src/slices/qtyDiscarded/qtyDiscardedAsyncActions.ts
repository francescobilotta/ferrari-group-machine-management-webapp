import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteQtyDiscardedAxios,
  getQtyDiscardedAxios,
  postQtyDiscardedAxios,
  putQtyDiscardedAxios,
} from "../../api/services";
import { QtyDiscardedType } from "../../models";
import { QtyDiscardedActionTypes } from "./qtyDiscardedActionTypes";

export const getQtyDiscardedAsync = createAsyncThunk(
  QtyDiscardedActionTypes.GET_QTYDISCARDED_ASYNC,
  async (_, thunkAPI) => {
    try {
      const response = await getQtyDiscardedAxios();
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const createQtyDiscardedAsync = createAsyncThunk(
  QtyDiscardedActionTypes.CREATE_QTYDISCARDED_ASYNC,
  async (update: QtyDiscardedType, thunkAPI) => {
    try {
      const response = await postQtyDiscardedAxios(update);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const updateQtyDiscardedAsync = createAsyncThunk(
  QtyDiscardedActionTypes.UPDATE_QTYDISCARDED_ASYNC,
  async (update: QtyDiscardedType, thunkAPI) => {
    try {
      const response = await putQtyDiscardedAxios(update);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const deleteQtyDiscardedAsync = createAsyncThunk(
  QtyDiscardedActionTypes.DELETE_QTYDISCARDED_ASYNC,
  async (id: number | undefined, thunkAPI) => {
    if (typeof id !== undefined) {
      try {
        const response = await deleteQtyDiscardedAxios(id!);
        return response.data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
      }
    }
    return thunkAPI.rejectWithValue(
      `Can't delete qtyDiscarded with undefined id`
    );
  }
);
