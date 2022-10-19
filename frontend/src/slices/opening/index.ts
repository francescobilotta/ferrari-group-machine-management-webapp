import { slice } from "./openingSlice";

export const { getOpenings, createOpening, deleteOpening, updateOpening } =
  slice.actions;

export {
  createOpeningAsync,
  deleteOpeningAsync,
  getOpeningsAsync,
  updateOpeningAsync,
} from "./openingAsyncActions";
export { default as openingReducer } from "./openingSlice";
