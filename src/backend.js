import axios from "axios";
import config from "./config/backend";

const backend = axios.create({
  baseURL: config.url,
  timeout: 1000
});

const login = (username, password) => {
  return new Promise(function(resolve, reject) {
    console.log("logging in with", username, password);
    backend
      .post("/login", { username, password })
      .then(res => {
        console.log("in backend.js", res);
        if (res.status === 200 && res.statusText === "OK") resolve(res.data);
        else reject(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export { login };
