import { slice } from "./stopSlice";

export const { getStops, createStop, deleteStop, updateStop } = slice.actions;

export {
  createStopAsync,
  deleteStopAsync,
  getStopsAsync,
  updateStopAsync,
} from "./stopAsyncActions";
export { default as stopReducer } from "./stopSlice";
