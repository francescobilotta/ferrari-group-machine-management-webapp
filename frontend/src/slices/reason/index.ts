import { slice } from "./reasonSlice";

export const { getReasons } = slice.actions;

export { getReasonsAsync } from "./reasonAsyncActions";
export { default as reasonReducer } from "./reasonSlice";
