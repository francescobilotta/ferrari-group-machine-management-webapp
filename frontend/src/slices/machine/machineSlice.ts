import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { machineNamespace } from "../../constants/namespaces";
import { machineDefaultValue, MachineType } from "../../models";
import { getMachinesAsync, updateMachineAsync } from "./machineAsyncActions";

export const slice = createSlice({
  extraReducers: (builder) => {
    // getMachinesAsync
    builder.addCase(getMachinesAsync.fulfilled, (state, action) => {
      console.log(action);
      state.error = "";
      slice.caseReducers.getMachines(state, {
        payload: action.payload,
        type: "getMachines",
      });
    });
    builder.addCase(getMachinesAsync.rejected, (state, action) => {
      state.error = "Errore nell'ottenere le macchine";
      console.log(action.payload);
      console.log(action.error);
    });
    // updateMachineAsync
    builder.addCase(updateMachineAsync.fulfilled, (state, action) => {
      state.error = "";
      slice.caseReducers.updateMachine(state, {
        payload: action.payload,
        type: "updateMachine",
      });
    });
    builder.addCase(updateMachineAsync.rejected, (state, action) => {
      state.error = "Errore nell'update di macchina";
      console.log(action.payload);
      console.log(action.error);
    });
  },
  initialState: machineDefaultValue,
  name: machineNamespace,
  reducers: {
    getMachines(state, action: PayloadAction<MachineType[]>) {
      state.machines = action.payload;
    },
    updateMachine(state, action: PayloadAction<MachineType>) {
      const index = state.machines.findIndex(
        (e: MachineType) => e.COD_MACCHINA === action.payload.COD_MACCHINA
      );
      state.machines[index] = action.payload;
    },
  },
});

export default slice.reducer;
