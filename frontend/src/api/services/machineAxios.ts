import { MachineType } from "../../models";
import api, { EndPoints } from "../axios";

export async function getMachinesAxios() {
  return api.get<MachineType[]>(`${EndPoints.machine}/get`);
}

export async function putMachineAxios(machine: MachineType) {
  return api.get<MachineType>(
    `${EndPoints.machine}/put?COD_MACCHINA=${machine.COD_MACCHINA}&DESCRIZIONE=${machine.DESCRIZIONE}&PRIORITA=${machine.PRIORITA}&CORRIDOIO=${machine.CORRIDOIO}&PI_NOTE=${machine.PI_NOTE}`
  );
}
