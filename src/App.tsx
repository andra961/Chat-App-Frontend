import React, { ReactNode, useEffect, useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./pages/Login/Login";
import "./App.css";
import authService from "./services/authentication";

const Protected = ({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: ReactNode;
}) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const LoginProtected = ({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: ReactNode;
}) => {
  if (isLoggedIn) {
    return <Navigate to="/chat" replace />;
  }
  return <>{children}</>;
};

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [ticket, setTicket] = useState<string | null>(null);

  // useEffect(() => {
  //   let username = localStorage.getItem("username");
  //   if (username === null) {
  //     username = generateUsername();
  //     localStorage.setItem("username", username);
  //   }
  //   setUsername(username);
  // }, []);

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

  useEffect(() => {
    const getWsTicket = async () => {
      const { ticket } = await authService.getWSTicket();
      setTicket(ticket);
    };

    void getWsTicket();
  }, [username]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginProtected isLoggedIn={username !== null}>
                <Login setUser={setUsername} />
              </LoginProtected>
            }
          />
          <Route
            path="/chat"
            element={
              <Protected isLoggedIn={username !== null}>
                {username !== null && ticket !== null && (
                  <Chat username={username} />
                )}
              </Protected>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
