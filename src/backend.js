import axios from "axios";
import config from "./config/backend";
import { retrieveToken } from "./utils";

const api = axios.create({
  baseURL: config.url,
  timeout: 5000
});

const auth = token => ({ headers: { Authorization: "Bearer " + token } });

const backend = {};

backend.login = (username, password) =>
  api.post("/login", { username, password });

backend.account = (token = retrieveToken()) => {
  console.log("running backend.account");
  return api.get("/account", auth(token));
};

export default backend;
