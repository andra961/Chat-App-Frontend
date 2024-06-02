import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import authService from "../services/authentication";

export type LoginData = {
  username: string;
  token: string;
  id: number;
};

export const AuthContext = createContext<{
  user: LoginData | null;
  setUser: (user: LoginData | null) => void;
}>({
  user: null,
  setUser: () => console.log("should close"),
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginData | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem("session_token") !== null) {
        try {
          const res = await authService.isAuthenticated();
          setUser(res);
        } catch (e) {}
      }
    };

    void checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
