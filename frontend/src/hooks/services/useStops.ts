import { useSnackbar } from "notistack";
import { useEffect } from "react";

import { RootState } from "../../app/store";
import { StopType } from "../../models";
import {
  createStopAsync,
  deleteStopAsync,
  getStopsAsync,
  updateStopAsync,
} from "../../slices/stop";
import { useAppSelector } from "../useAppSelector";

export function fetchStops(dispatch: any) {
  (async function () {
    try {
      await dispatch(getStopsAsync());
    } catch (e) {
      alert("Error while re-fetching: see logs");
    }
  })();
}

export function useFetchStops(dispatch: any) {
  const { stops, error } = useAppSelector((state: RootState) => state.stop);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async function () {
      try {
        await dispatch(getStopsAsync());
      } catch (e) {
        enqueueSnackbar(error, {
          variant: "error",
        });
      }
    })();
  }, []);

  return { error, stops };
}

export function createStop(dispatch: any, stop: StopType) {
  (async function () {
    await dispatch(createStopAsync(stop));
  })();
  fetchStops(dispatch);
}

export function updateStop(dispatch: any, stop: StopType) {
  (async function () {
    await dispatch(updateStopAsync(stop));
  })();
  fetchStops(dispatch);
}

export function deleteStop(dispatch: any, id: number) {
  (async function () {
    await dispatch(deleteStopAsync(id));
  })();
  fetchStops(dispatch);
}
