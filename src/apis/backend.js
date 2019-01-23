import axios from "axios";
import config from "../config/backend";
import { retrieveToken } from "../utils";
const backend = {};

// Configure Axios /////////////////////////////////
const api = axios.create({
  baseURL: config.url,
  timeout: 10000
});

// Helper method for Authorization header //////////
const auth = (token = retrieveToken()) => ({
  headers: { Authorization: "Bearer " + token }
});

// Non-authenticated calls /////////////////////////

backend.initOauth = data => api.post("/oauth/init", data); // Init Oauth (to get state)

backend.providerLogin = data => api.post("/oauth/login", data); // Finalize Oauth login

backend.signup = (email, password, language) =>
  api.post("/signup", { email, password, language }); // Signup

backend.confirm = confirmId => api.post("/confirm", { id: confirmId }); // Confirm

backend.createAccount = confirmId => api.post("/user", { id: confirmId }); // Create account

backend.login = (username, password) =>
  api.post("/login", { username, password }); // Login

backend.profile = username => api.get("/users/" + username); // Load user profile

backend.loadGist = handle => {
  console.log("loading gist", handle);
  return api.get("/gist/" + handle); // Load draft/gist anonymously
};

// Users //////////////////////////

backend.account = () => api.get("/account", auth()); // Try to authenticate based on stored token

backend.export = () => api.get("/export", auth()); // Export data

backend.restrict = () => api.get("/restrict", auth()); // Restrict data processing (freeze account)

backend.remove = () => api.get("/remove", auth()); // Remove account

backend.saveAccount = data => api.put("/user", data, auth()); // Update account

backend.availableUsername = data =>
  api.post("/available/username", data, auth()); // Check is a username is available

backend.resetPassword = username =>
  api.post("/reset/password", { username: username }, auth()); // Ask for a password reset

backend.setPassword = data => api.post("/set/password", data, auth()); // (re)set a new password

// Models //////////////////////////

backend.removeModels = data => api.post("/remove/models", data, auth()); // Delete multiple models

backend.createModel = data => api.post("/model", data, auth()); // Create model

backend.saveModel = (handle, data) => api.put("/model/" + handle, data, auth()); // Update model

// Drafts /////////////////////////

backend.createDraft = data => api.post("/draft", data, auth()); // Create draft

backend.saveDraft = (handle, data) => api.put("/draft/" + handle, data, auth()); // Update draft

backend.removeDraft = handle => api.delete("/draft/" + handle, auth()); // Remove draft

backend.removeDrafts = data => api.post("/remove/drafts", data, auth()); // Delete multiple drafts

// Tiler //////////////////////////
const tiler = axios.create({
  baseURL: config.tiler,
  timeout: 5000
});

backend.tiler = (svg, format, size) =>
  tiler.post("/api", { svg, format: "pdf", size }); // Tile SVG

// Editor //////////////////////////////////////////

backend.editor = {};
backend.editor.save = data => api.put("/github/file", data, auth()); // Save file

export default backend;
