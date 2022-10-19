import { ProgressType } from "../../models";
import api, { EndPoints } from "../axios";

export async function getProgressesAxios() {
  return api.get<ProgressType[]>(`${EndPoints.progress}/get`);
}

export async function postProgressAxios(progress: ProgressType) {
  return api.get<ProgressType>(
    `${EndPoints.progress}/post?id=${progress.id}&opsid=${progress.opsid}&data=${progress.data}&inizioavanzamento=${progress.inizioavanzamento}&fineavanzamento=${progress.fineavanzamento}&datacreazione=${progress.datacreazione}&disabilitato=${progress.disabilitato}`
  );
}

export async function putProgressAxios(progress: ProgressType) {
  return api.get<ProgressType>(
    `${EndPoints.progress}/put?id=${progress.id}&opsid=${progress.opsid}&data=${progress.data}&inizioavanzamento=${progress.inizioavanzamento}&fineavanzamento=${progress.fineavanzamento}&datacreazione=${progress.datacreazione}&disabilitato=${progress.disabilitato}`
  );
}

export async function deleteProgressAxios(id: number) {
  return api.get<number>(`${EndPoints.progress}/delete?id=${id}`);
}
