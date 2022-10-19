import axios from "axios";
/* create an instance of axios with a default base URI when sending HTTP requests */
/* JSON Server has CORS Policy by default */
const api = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL:
    "http://localhost/ferrari-group-machine-management-webapp/backend/public/index.php",
});
export default api;
export const EndPoints = {
  machine: "machine",
  opening: "opening",
  order: "order",
  progress: "progress",
  qtydiscarded: "qtydiscarded",
  qtyprogressed: "qtyprogressed",
  reason: "reason",
  stop: "stop",
};
