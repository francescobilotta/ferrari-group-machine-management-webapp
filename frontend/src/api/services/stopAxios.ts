import { StopType } from "../../models";
import api, { EndPoints } from "../axios";

export async function getStopsAxios() {
  return api.get<StopType[]>(`${EndPoints.stop}/get`);
}

export async function postStopAxios(stop: StopType) {
  return api.get<StopType>(
    `${EndPoints.stop}/post?id=${stop.id}&macchina=${stop.macchina}&data=${stop.data}&iniziofermo=${stop.iniziofermo}&finefermo=${stop.finefermo}&causale=${stop.causale}&datacreazione=${stop.datacreazione}&disabilitato=${stop.disabilitato}`
  );
}

export async function putStopAxios(stop: StopType) {
  return api.get<StopType>(
    `${EndPoints.stop}/put?id=${stop.id}&macchina=${stop.macchina}&data=${stop.data}&iniziofermo=${stop.iniziofermo}&finefermo=${stop.finefermo}&causale=${stop.causale}&datacreazione=${stop.datacreazione}&disabilitato=${stop.disabilitato}`
  );
}

export async function deleteStopAxios(id: number) {
  return api.get<number>(`${EndPoints.stop}/delete?id=${id}`);
}
