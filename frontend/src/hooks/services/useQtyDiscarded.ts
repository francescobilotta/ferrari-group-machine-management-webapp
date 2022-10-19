import { useSnackbar } from "notistack";
import { useEffect } from "react";

import { RootState } from "../../app/store";
import { QtyDiscardedType } from "../../models";
import {
  createQtyDiscardedAsync,
  deleteQtyDiscardedAsync,
  getQtyDiscardedAsync,
  updateQtyDiscardedAsync,
} from "../../slices/qtyDiscarded";
import { useAppSelector } from "../useAppSelector";

export function fetchQtyDiscarded(dispatch: any) {
  (async function () {
    try {
      await dispatch(getQtyDiscardedAsync());
    } catch (e) {
      alert("Error while re-fetching: see logs");
    }
  })();
}

export function useFetchQtyDiscarded(dispatch: any) {
  const { qtyDiscarded, error } = useAppSelector(
    (state: RootState) => state.qtyDiscarded
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async function () {
      try {
        await dispatch(getQtyDiscardedAsync());
      } catch (e) {
        enqueueSnackbar(error, {
          variant: "error",
        });
      }
    })();
  }, []);

  return { error, qtyDiscarded };
}

export function createQtyDiscarded(
  dispatch: any,
  qtyDiscarded: QtyDiscardedType
) {
  (async function () {
    await dispatch(createQtyDiscardedAsync(qtyDiscarded));
  })();
  fetchQtyDiscarded(dispatch);
}

export function updateQtyDiscarded(
  dispatch: any,
  qtyDiscarded: QtyDiscardedType
) {
  (async function () {
    await dispatch(updateQtyDiscardedAsync(qtyDiscarded));
  })();
  fetchQtyDiscarded(dispatch);
}

export function deleteQtyDiscarded(dispatch: any, id: number) {
  (async function () {
    await dispatch(deleteQtyDiscardedAsync(id));
  })();
  fetchQtyDiscarded(dispatch);
}
