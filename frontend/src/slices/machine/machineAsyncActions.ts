import { createAsyncThunk } from "@reduxjs/toolkit";

import { getMachinesAxios, putMachineAxios } from "../../api/services";
import { MachineType } from "../../models";
import { MachineActionTypes } from "./machineActionTypes";

export const getMachinesAsync = createAsyncThunk(
  MachineActionTypes.GET_MACHINES_ASYNC,
  async (_, thunkAPI) => {
    try {
      const response = await getMachinesAxios();
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);

export const updateMachineAsync = createAsyncThunk(
  MachineActionTypes.UPDATE_MACHINE_ASYNC,
  async (update: MachineType, thunkAPI) => {
    try {
      const response = await putMachineAxios(update);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(`Unexpected error: ${error}`);
    }
  }
);
