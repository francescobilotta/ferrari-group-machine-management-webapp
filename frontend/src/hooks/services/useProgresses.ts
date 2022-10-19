import { useSnackbar } from "notistack";
import { useEffect } from "react";

import { RootState } from "../../app/store";
import { ProgressType } from "../../models";
import {
  createProgressAsync,
  deleteProgressAsync,
  getProgressesAsync,
  updateProgressAsync,
} from "../../slices/progress";
import { useAppSelector } from "../useAppSelector";

export function fetchProgresses(dispatch: any) {
  (async function () {
    try {
      await dispatch(getProgressesAsync());
    } catch (e) {
      alert("Error while re-fetching: see logs");
    }
  })();
}

export function useFetchProgresses(dispatch: any) {
  const { progresses, error } = useAppSelector(
    (state: RootState) => state.progress
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async function () {
      try {
        await dispatch(getProgressesAsync());
      } catch (e) {
        enqueueSnackbar(error, {
          variant: "error",
        });
      }
    })();
  }, []);

  return { error, progresses };
}

export function createProgress(dispatch: any, progress: ProgressType) {
  (async function () {
    await dispatch(createProgressAsync(progress));
  })();
  fetchProgresses(dispatch);
}

export function updateProgress(dispatch: any, progress: ProgressType) {
  (async function () {
    await dispatch(updateProgressAsync(progress));
  })();
  fetchProgresses(dispatch);
}

export function deleteProgress(dispatch: any, id: number) {
  (async function () {
    await dispatch(deleteProgressAsync(id));
  })();
  fetchProgresses(dispatch);
}
