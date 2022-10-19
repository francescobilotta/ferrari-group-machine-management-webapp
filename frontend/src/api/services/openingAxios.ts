import { OpeningType } from "../../models";
import api, { EndPoints } from "../axios";

export async function getOpeningsAxios() {
  return api.get<OpeningType[]>(`${EndPoints.opening}/get`);
}

export async function postOpeningAxios(opening: OpeningType) {
  return api.get<OpeningType>(
    `${EndPoints.opening}/post?id=${opening.id}&macchina=${opening.macchina}&data=${opening.data}&iniziopianificato=${opening.iniziopianificato}&inizioeffettivo=${opening.inizioeffettivo}&finepianificata=${opening.finepianificata}&fineeffettiva=${opening.fineeffettiva}&datacreazione=${opening.datacreazione}&modificato=${opening.modificato}&disabilitato=${opening.disabilitato}`
  );
}

export async function putOpeningAxios(opening: OpeningType) {
  return api.get<OpeningType>(
    `${EndPoints.opening}/put?id=${opening.id}&macchina=${opening.macchina}&data=${opening.data}&iniziopianificato=${opening.iniziopianificato}&inizioeffettivo=${opening.inizioeffettivo}&finepianificata=${opening.finepianificata}&fineeffettiva=${opening.fineeffettiva}&datacreazione=${opening.datacreazione}&modificato=${opening.modificato}&disabilitato=${opening.disabilitato}`
  );
}

export async function deleteOpeningAxios(openingId: number) {
  return api.get<number>(`${EndPoints.opening}/delete?id=${openingId}`);
}
