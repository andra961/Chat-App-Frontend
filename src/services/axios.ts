import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_HTTP_SERVER_URL || "http://localhost:4000",
});

client.interceptors.request.use((opt) => {
  opt.headers["Authorization"] =
    localStorage.getItem("session_token") || undefined;
  return opt;
});

export default client;
