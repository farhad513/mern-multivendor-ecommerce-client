import axios from "axios";
const local = "http://localhost:8080";
const pro = "http://localhost:5000";

let api_url = "";
let mode = "dev";
if (mode === "pro") {
  api_url = pro;
} else {
  api_url = local;
}
const api = axios.create({
  baseURL: `${api_url}/api`,
});

export default api;
