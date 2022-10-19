import { useSnackbar } from "notistack";
import { useEffect } from "react";

import { RootState } from "../../app/store";
import { MachineType } from "../../models";
import { getMachinesAsync, updateMachineAsync } from "../../slices/machine";
import { useAppSelector } from "../useAppSelector";

export function fetchMachines(dispatch: any) {
  (async function () {
    try {
      await dispatch(getMachinesAsync());
    } catch (e) {
      alert("Error while re-fetching: see logs");
    }
  })();
}

export function useFetchMachines(dispatch: any) {
  const { machines, error } = useAppSelector(
    (state: RootState) => state.machine
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async function () {
      const call = await dispatch(getMachinesAsync());
      if (call.meta.requestStatus === "rejected") {
        enqueueSnackbar(error, {
          variant: "error",
        });
      }
    })();
  }, []);

  return { error, machines };
}

export function updateMachine(dispatch: any, machine: MachineType) {
  (async function () {
    await dispatch(updateMachineAsync(machine));
  })();
  fetchMachines(dispatch);
}
