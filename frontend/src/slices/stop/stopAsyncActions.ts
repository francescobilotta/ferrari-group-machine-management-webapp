import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteStopAxios,
  getStopsAxios,
  postStopAxios,
  putStopAxios,
} from "../../api/services";
import { StopType } from "../../models";
import { StopActionTypes } from "./stopActionTypes";

export const getStopsAsync = createAsyncThunk(
  StopActionTypes.GET_STOPS_ASYNC,
  async (_, thunkAPI) => {
    try {
      const response = await getStopsAxios();
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const createStopAsync = createAsyncThunk(
  StopActionTypes.CREATE_STOP_ASYNC,
  async (update: StopType, thunkAPI) => {
    try {
      const response = await postStopAxios(update);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const updateStopAsync = createAsyncThunk(
  StopActionTypes.UPDATE_STOP_ASYNC,
  async (update: StopType, thunkAPI) => {
    try {
      const response = await putStopAxios(update);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const deleteStopAsync = createAsyncThunk(
  StopActionTypes.DELETE_STOP_ASYNC,
  async (id: number | undefined, thunkAPI) => {
    if (typeof id !== undefined) {
      try {
        const response = await deleteStopAxios(id!);
        return response.data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
      }
    }
    return thunkAPI.rejectWithValue(`Can't delete event with undefined event`);
  }
);
