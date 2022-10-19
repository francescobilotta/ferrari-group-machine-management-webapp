import { useSnackbar } from "notistack";
import { useEffect } from "react";

import { RootState } from "../../app/store";
import { getOrdersAsync } from "../../slices/order";
import { useAppSelector } from "../useAppSelector";

export function fetchOrders(dispatch: any) {
  (async function () {
    try {
      await dispatch(getOrdersAsync());
    } catch (e) {
      alert("Error while re-fetching: see logs");
    }
  })();
}

export function useFetchOrders(dispatch: any) {
  const { orders, error } = useAppSelector((state: RootState) => state.order);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async function () {
      try {
        await dispatch(getOrdersAsync());
      } catch (e) {
        enqueueSnackbar(error, {
          variant: "error",
        });
      }
    })();
  }, []);

  return { error, orders };
}
