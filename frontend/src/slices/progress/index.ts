import { slice } from "./progressSlice";

export const { getProgresses, createProgress, deleteProgress, updateProgress } =
  slice.actions;

export {
  createProgressAsync,
  deleteProgressAsync,
  getProgressesAsync,
  updateProgressAsync,
} from "./progressAsyncActions";
export { default as progressReducer } from "./progressSlice";
