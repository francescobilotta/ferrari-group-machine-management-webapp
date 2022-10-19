import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteProgressAxios,
  getProgressesAxios,
  postProgressAxios,
  putProgressAxios,
} from "../../api/services";
import { ProgressType } from "../../models";
import { ProgressActionTypes } from "./progressActionTypes";

export const getProgressesAsync = createAsyncThunk(
  ProgressActionTypes.GET_PROGRESS_ASYNC,
  async (_, thunkAPI) => {
    try {
      const response = await getProgressesAxios();
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const createProgressAsync = createAsyncThunk(
  ProgressActionTypes.CREATE_PROGRESS_ASYNC,
  async (update: ProgressType, thunkAPI) => {
    try {
      const response = await postProgressAxios(update);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const updateProgressAsync = createAsyncThunk(
  ProgressActionTypes.UPDATE_PROGRESS_ASYNC,
  async (update: ProgressType, thunkAPI) => {
    try {
      const response = await putProgressAxios(update);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const deleteProgressAsync = createAsyncThunk(
  ProgressActionTypes.DELETE_PROGRESS_ASYNC,
  async (id: number | undefined, thunkAPI) => {
    if (typeof id !== undefined) {
      try {
        const response = await deleteProgressAxios(id!);
        return response.data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
      }
    }
    return thunkAPI.rejectWithValue(`Can't delete progress with undefined id`);
  }
);
