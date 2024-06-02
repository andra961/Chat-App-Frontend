import { LoginData } from "../context/AuthContext";
import client from "./axios";

const authService = {
  login: async (username: string, password: string) => {
    const res = await client.post<LoginData>("/login", { username, password });

    console.log(res);

    localStorage.setItem("session_token", res.data.token);

    return res.data;
  },
  isAuthenticated: async () => {
    const res = await client.post<LoginData>("/is-authenticated");

    console.log(res);

    localStorage.setItem("session_token", res.data.token);

    return res.data;
  },
  register: async (username: string, password: string) => {
    const res = await client.post<LoginData>("/register", {
      username,
      password,
    });

    localStorage.setItem("session_token", res.data.token);

    return res.data;
  },
  getWSTicket: async () => {
    const res = await client.get<{ ticket: string }>("/ws-ticket");

    // localStorage.setItem("ws_ticket", res.data.ticket);

    return res.data;
  },
};

export default authService;
