import { useSnackbar } from "notistack";
import { useEffect } from "react";

import { RootState } from "../../app/store";
import { OpeningType } from "../../models";
import {
  createOpeningAsync,
  deleteOpeningAsync,
  getOpeningsAsync,
  updateOpeningAsync,
} from "../../slices/opening";
import { useAppSelector } from "../useAppSelector";

export function fetchOpenings(dispatch: any) {
  (async function () {
    try {
      await dispatch(getOpeningsAsync());
    } catch (e) {
      alert("Error while re-fetching: see logs");
    }
  })();
}

export function useFetchOpenings(dispatch: any) {
  const { openings, error } = useAppSelector(
    (state: RootState) => state.opening
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async function () {
      try {
        await dispatch(getOpeningsAsync());
      } catch (e) {
        enqueueSnackbar(error, {
          variant: "error",
        });
      }
    })();
  }, []);

  return { error, openings };
}

export function createOpening(dispatch: any, opening: OpeningType) {
  (async function () {
    await dispatch(createOpeningAsync(opening));
  })();
  fetchOpenings(dispatch);
}

export function updateOpening(dispatch: any, opening: OpeningType) {
  (async function () {
    await dispatch(updateOpeningAsync(opening));
  })();
  fetchOpenings(dispatch);
}

export function deleteOpening(dispatch: any, id: number) {
  (async function () {
    await dispatch(deleteOpeningAsync(id));
  })();
  fetchOpenings(dispatch);
}
