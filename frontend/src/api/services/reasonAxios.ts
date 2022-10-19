import { ReasonType } from "../../models";
import api, { EndPoints } from "../axios";

export async function getReasonsAxios() {
  return api.get<ReasonType[]>(`${EndPoints.reason}/get`);
}
