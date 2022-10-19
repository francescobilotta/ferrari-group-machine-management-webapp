import { QtyDiscardedType } from "../../models";
import api, { EndPoints } from "../axios";

export async function getQtyDiscardedAxios() {
  return api.get<QtyDiscardedType[]>(`${EndPoints.qtydiscarded}/get`);
}

export async function postQtyDiscardedAxios(qtyDiscarded: QtyDiscardedType) {
  return api.get<QtyDiscardedType>(
    `${EndPoints.qtydiscarded}/post?id=${qtyDiscarded.id}&opsid=${qtyDiscarded.opsid}&data=${qtyDiscarded.data}&qtascartata=${qtyDiscarded.qtascartata}&causale=${qtyDiscarded.causale}&datacreazione=${qtyDiscarded.datacreazione}&disabilitato=${qtyDiscarded.disabilitato}`
  );
}

export async function putQtyDiscardedAxios(qtyDiscarded: QtyDiscardedType) {
  return api.get<QtyDiscardedType>(
    `${EndPoints.qtydiscarded}/put?id=${qtyDiscarded.id}&opsid=${qtyDiscarded.opsid}&data=${qtyDiscarded.data}&qtascartata=${qtyDiscarded.qtascartata}&causale=${qtyDiscarded.causale}&datacreazione=${qtyDiscarded.datacreazione}&disabilitato=${qtyDiscarded.disabilitato}`
  );
}

export async function deleteQtyDiscardedAxios(id: number) {
  return api.get<number>(`${EndPoints.qtydiscarded}/delete?id=${id}`);
}
