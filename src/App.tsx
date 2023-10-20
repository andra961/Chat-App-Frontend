import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./pages/Login/Login";
import "./App.css";
import authService from "./services/authentication";
import Chats from "./components/Chats";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Protected = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="chatsWrapper">
      <Chats />
      <Outlet />
    </div>
  );
};

const LoginProtected = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
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
        <BrowserRouter>
          <Routes>
            <Route element={<LoginProtected isLoggedIn={username !== null} />}>
              <Route path="/login" element={<Login setUser={setUsername} />} />
            </Route>
            <Route
              path="/home"
              element={<Protected isLoggedIn={username !== null} />}
            >
              <Route index element={<span>Select a chat</span>} />
              <Route
                path="chat/:chatId"
                element={
                  <>{username !== null && <Chat username={username} />}</>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
