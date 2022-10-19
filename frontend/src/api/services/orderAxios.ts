import { OrderType } from "../../models";
import api, { EndPoints } from "../axios";

export async function getOrdersAxios() {
  return api.get<OrderType[]>(`${EndPoints.order}/get`);
}
