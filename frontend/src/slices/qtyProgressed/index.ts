import { slice } from "./qtyProgressedSlice";

export const {
  getQtyProgressed,
  createQtyProgressed,
  deleteQtyProgressed,
  updateQtyProgressed,
} = slice.actions;

export {
  createQtyProgressedAsync,
  deleteQtyProgressedAsync,
  getQtyProgressedAsync,
  updateQtyProgressedAsync,
} from "./qtyProgressedAsyncActions";
export { default as qtyProgressedReducer } from "./qtyProgressedSlice";
