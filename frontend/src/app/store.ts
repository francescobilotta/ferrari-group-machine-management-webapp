import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";

import { machineReducer } from "../slices/machine";
import { openingReducer } from "../slices/opening";
import { orderReducer } from "../slices/order";
import { progressReducer } from "../slices/progress";
import { qtyDiscardedReducer } from "../slices/qtyDiscarded";
import { qtyProgressedReducer } from "../slices/qtyProgressed";
import { reasonReducer } from "../slices/reason";
import { stopReducer } from "../slices/stop";

const rootReducer = combineReducers({
  machine: machineReducer,
  opening: openingReducer,
  order: orderReducer,
  progress: progressReducer,
  qtyDiscarded: qtyDiscardedReducer,
  qtyProgressed: qtyProgressedReducer,
  reason: reasonReducer,
  stop: stopReducer,
});

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
