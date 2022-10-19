import { QtyProgressedType } from "../../models";
import api, { EndPoints } from "../axios";

export async function getQtyProgressedAxios() {
  return api.get<QtyProgressedType[]>(`${EndPoints.qtyprogressed}/get`);
}

export async function postQtyProgressedAxios(qtyProgressed: QtyProgressedType) {
  return api.get<QtyProgressedType>(
    `${EndPoints.qtyprogressed}/post?id=${qtyProgressed.id}&opsid=${qtyProgressed.opsid}&data=${qtyProgressed.data}&qtaavanzata=${qtyProgressed.qtaavanzata}&datacreazione=${qtyProgressed.datacreazione}&disabilitato=${qtyProgressed.disabilitato}`
  );
}

export async function putQtyProgressedAxios(qtyProgressed: QtyProgressedType) {
  return api.get<QtyProgressedType>(
    `${EndPoints.qtyprogressed}/put?id=${qtyProgressed.id}&opsid=${qtyProgressed.opsid}&data=${qtyProgressed.data}&qtaavanzata=${qtyProgressed.qtaavanzata}&datacreazione=${qtyProgressed.datacreazione}&disabilitato=${qtyProgressed.disabilitato}`
  );
}

export async function deleteQtyProgressedAxios(id: number) {
  return api.get<number>(`${EndPoints.qtyprogressed}/delete?id=${id}`);
}
