import { slice } from "./machineSlice";

export const { getMachines, updateMachine } = slice.actions;
export { getMachinesAsync, updateMachineAsync } from "./machineAsyncActions";
export { default as machineReducer } from "./machineSlice";
