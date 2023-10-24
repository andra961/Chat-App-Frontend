import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import "./App.css";
import authService from "./services/authentication";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import SelectedChat from "./pages/SelectedChat";
import CustomHeader from "./components/CustomHeader";
import { AuthContext, useAuthContext } from "./context/AuthContext";

const Protected = () => {
  const { username } = useAuthContext();
  if (username === null) {
    return <Navigate to="/login" replace />;
  }

  // console.log(width);

  return (
    <>
      <CustomHeader username={username} />
      <Outlet />
    </>
  );
};

const LoginProtected = () => {
  const { username } = useAuthContext();

  const isLoggedIn = Boolean(username);
  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};

// Create a client
const queryClient = new QueryClient();

function App() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem("session_token") !== null) {
        try {
          const res = await authService.isAuthenticated();
          setUsername(res.username);
          console.log(res);
        } catch (e) {}
      }
    };

    void checkAuth();
  }, []);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ username, setUsername }}>
          <BrowserRouter>
            <Routes>
              <Route element={<LoginProtected />}>
                <Route
                  path="/login"
                  element={<Login setUser={setUsername} />}
                />
              </Route>
              <Route path="/home" element={<Protected />}>
                <Route index element={<Home />} />
                <Route
                  path="chat/:chatId"
                  element={
                    <>
                      {username !== null && (
                        <SelectedChat username={username} />
                      )}
                    </>
                  }
                />
              </Route>
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
