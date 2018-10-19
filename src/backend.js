import axios from "axios";
import config from "./config/backend";

const api = axios.create({
  baseURL: config.url,
  timeout: 1000
});

const backend = {};

backend.login = (username, password) =>
  api.post("/login", { username, password });

export default backend;
