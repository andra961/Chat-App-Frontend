import { createContext, useContext } from "react";

export const AuthContext = createContext<{
  username: string | null;
  setUsername: (username: string) => void;
}>({
  username: null,
  setUsername: () => console.log("should close"),
});

export const useAuthContext = () => useContext(AuthContext);
