import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  deleteOpeningAxios,
  getOpeningsAxios,
  postOpeningAxios,
  putOpeningAxios,
} from "../../api/services";
import { OpeningType } from "../../models";
import { OpeningActionTypes } from "./openingActionTypes";

export const getOpeningsAsync = createAsyncThunk(
  OpeningActionTypes.GET_OPENING_ASYNC,
  async (_, thunkAPI) => {
    try {
      const response = await getOpeningsAxios();
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const createOpeningAsync = createAsyncThunk(
  OpeningActionTypes.CREATE_OPENING_ASYNC,
  async (update: OpeningType, thunkAPI) => {
    try {
      const response = await postOpeningAxios(update);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const updateOpeningAsync = createAsyncThunk(
  OpeningActionTypes.UPDATE_OPENING_ASYNC,
  async (update: OpeningType, thunkAPI) => {
    try {
      const response = await putOpeningAxios(update);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const deleteOpeningAsync = createAsyncThunk(
  OpeningActionTypes.DELETE_OPENING_ASYNC,
  async (id: number | undefined, thunkAPI) => {
    if (typeof id !== undefined) {
      try {
        const response = await deleteOpeningAxios(id!);
        return response.data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
      }
    }
    return thunkAPI.rejectWithValue(`Can't delete opening with undefined id`);
  }
);
