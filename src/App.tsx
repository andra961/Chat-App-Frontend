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
import {
  AuthContext,
  AuthProvider,
  useAuthContext,
} from "./context/AuthContext";
import { ThemeProvider } from "@mui/material";
import { theme } from "./muiTheme";

const Protected = () => {
  const { user } = useAuthContext();
  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  // console.log(width);

  return (
    <>
      <CustomHeader username={user.username} />
      <Outlet />
    </>
  );
};

const LoginProtected = () => {
  const { user } = useAuthContext();

  const isLoggedIn = Boolean(user);
  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<LoginProtected />}>
                  <Route path="/login" element={<Login />} />
                </Route>
                <Route path="/home" element={<Protected />}>
                  <Route index element={<Home />} />
                  <Route path="chat/:chatId" element={<SelectedChat />} />
                </Route>
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
