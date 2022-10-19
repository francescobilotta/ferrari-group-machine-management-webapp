import { slice } from "./orderSlice";

export const { getOrders } = slice.actions;

export { getOrdersAsync } from "./orderAsyncActions";
export { default as orderReducer } from "./orderSlice";
