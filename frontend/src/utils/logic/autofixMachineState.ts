import { updateMachine } from "../../hooks/services/useMachines";
import { MachineType, ProgressType, StopType } from "../../models";

export function autofixMachineState(
  dispatch: any,
  machine: MachineType,
  openProgress: ProgressType[],
  openStop: StopType[]
) {
  if (
    openProgress.length > 0 &&
    openStop.length === 0 &&
    machine.PRIORITA !== 3
  ) {
    const newMachine = {
      COD_MACCHINA: machine.COD_MACCHINA,
      CORRIDOIO: machine.CORRIDOIO,
      DESCRIZIONE: machine.DESCRIZIONE,
      PI_NOTE: machine.PI_NOTE,
      PRIORITA: machine.PRIORITA,
    };
    newMachine.PRIORITA = 3;
    updateMachine(dispatch, newMachine);
  }

  if (
    openProgress.length === 0 &&
    openStop.length > 0 &&
    machine.PRIORITA !== 2
  ) {
    const newMachine = {
      COD_MACCHINA: machine.COD_MACCHINA,
      CORRIDOIO: machine.CORRIDOIO,
      DESCRIZIONE: machine.DESCRIZIONE,
      PI_NOTE: machine.PI_NOTE,
      PRIORITA: machine.PRIORITA,
    };
    newMachine.PRIORITA = 2;
    updateMachine(dispatch, newMachine);
  }

  if (
    openProgress.length === 0 &&
    openStop.length === 0 &&
    machine.PRIORITA !== 1
  ) {
    const newMachine = {
      COD_MACCHINA: machine.COD_MACCHINA,
      CORRIDOIO: machine.CORRIDOIO,
      DESCRIZIONE: machine.DESCRIZIONE,
      PI_NOTE: machine.PI_NOTE,
      PRIORITA: machine.PRIORITA,
    };
    console.log(openProgress.length);
    console.log(typeof openProgress.length);
    console.log(openStop.length);
    console.log(typeof openStop.length);
    console.log(machine.PRIORITA);
    console.log(typeof machine.PRIORITA);
    newMachine.PRIORITA = 1;
    updateMachine(dispatch, newMachine);
  }
}
