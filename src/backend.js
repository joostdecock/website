import axios from "axios";
import config from "./config/backend";
import { retrieveToken } from "./utils";

// Configure Axios
const api = axios.create({
  baseURL: config.url,
  timeout: 5000
});

// Helper method to construct Authorization header
const auth = (token = retrieveToken()) => ({
  headers: { Authorization: "Bearer " + token }
});

const backend = {};

/**
 * Anonymous calls
 */

// Signup
backend.signup = (email, password, language) =>
  api.post("/signup", { email, password, language });

// Confirm
backend.confirm = confirmId => api.post("/confirm", { id: confirmId });

// Create account (after profile data consent)
backend.createAccount = confirmId => api.post("/user", { id: confirmId });

// Login
backend.login = (username, password) =>
  api.post("/login", { username, password });

/**
 * Authenticated calls
 */

// Read/Load (GET)

// Try to authenticate based on stored token
backend.account = () => api.get("/account", auth());

// Update (PUT)
backend.saveAccount = data => api.put("/user", data, auth());

export default backend;
