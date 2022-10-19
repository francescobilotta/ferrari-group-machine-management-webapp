import { slice } from "./qtyDiscardedSlice";

export const {
  getQtyDiscarded,
  createQtyDiscarded,
  deleteQtyDiscarded,
  updateQtyDiscarded,
} = slice.actions;

export {
  createQtyDiscardedAsync,
  deleteQtyDiscardedAsync,
  getQtyDiscardedAsync,
  updateQtyDiscardedAsync,
} from "./qtyDiscardedAsyncActions";
export { default as qtyDiscardedReducer } from "./qtyDiscardedSlice";
