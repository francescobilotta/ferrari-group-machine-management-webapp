import { useSnackbar } from "notistack";
import { useEffect } from "react";

import { RootState } from "../../app/store";
import { getReasonsAsync } from "../../slices/reason";
import { useAppSelector } from "../useAppSelector";

export function fetchReasons(dispatch: any) {
  (async function () {
    try {
      await dispatch(getReasonsAsync());
    } catch (e) {
      alert("Error while re-fetching: see logs");
    }
  })();
}

export function useFetchReasons(dispatch: any) {
  const { reasons, error } = useAppSelector((state: RootState) => state.reason);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async function () {
      try {
        await dispatch(getReasonsAsync());
      } catch (e) {
        enqueueSnackbar(error, {
          variant: "error",
        });
      }
    })();
  }, []);

  return { error, reasons };
}
