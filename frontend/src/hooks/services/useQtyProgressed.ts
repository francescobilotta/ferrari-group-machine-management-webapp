import { useSnackbar } from "notistack";
import { useEffect } from "react";

import { RootState } from "../../app/store";
import { QtyProgressedType } from "../../models";
import {
  createQtyProgressedAsync,
  deleteQtyProgressedAsync,
  getQtyProgressedAsync,
  updateQtyProgressedAsync,
} from "../../slices/qtyProgressed";
import { useAppSelector } from "../useAppSelector";

export function fetchQtyProgressed(dispatch: any) {
  (async function () {
    try {
      await dispatch(getQtyProgressedAsync());
    } catch (e) {
      alert("Error while re-fetching: see logs");
    }
  })();
}

export function useFetchQtyProgressed(dispatch: any) {
  const { qtyProgressed, error } = useAppSelector(
    (state: RootState) => state.qtyProgressed
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async function () {
      try {
        await dispatch(getQtyProgressedAsync());
      } catch (e) {
        enqueueSnackbar(error, {
          variant: "error",
        });
      }
    })();
  }, []);

  return { error, qtyProgressed };
}

export function createQtyProgressed(
  dispatch: any,
  qtyProgressed: QtyProgressedType
) {
  (async function () {
    await dispatch(createQtyProgressedAsync(qtyProgressed));
  })();
  fetchQtyProgressed(dispatch);
}

export function updateQtyProgressed(
  dispatch: any,
  qtyProgressed: QtyProgressedType
) {
  (async function () {
    await dispatch(updateQtyProgressedAsync(qtyProgressed));
  })();
  fetchQtyProgressed(dispatch);
}

export function deleteQtyProgressed(dispatch: any, id: number) {
  (async function () {
    await dispatch(deleteQtyProgressedAsync(id));
  })();
  fetchQtyProgressed(dispatch);
}
