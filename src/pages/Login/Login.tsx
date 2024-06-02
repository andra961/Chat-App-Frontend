import { Button } from "@mui/material";
import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import authService from "../../services/authentication";

const Login = () => {
  const [loginOrRegister, setLoginOrRegister] = useState(true);
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const { setUser } = useAuthContext();

  const onSubmitLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await authService.login(username, password);
    setUser(res);
  };

  const onSubmitRegister: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    const res = await authService.register(username, password);
    setUser(res);
  };

  return (
    <div>
      {loginOrRegister ? (
        <form onSubmit={onSubmitLogin}>
          <label>
            <input
              type={"text"}
              required
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              placeholder={"username"}
            />
          </label>
          <label>
            <input
              type={"password"}
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder={"password"}
            />
          </label>
          <Button type="submit">login</Button>
        </form>
      ) : (
        <form onSubmit={onSubmitRegister}>
          <label>
            <input
              type={"text"}
              required
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              placeholder={"username"}
            />
          </label>
          <label>
            <input
              type={"password"}
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder={"password"}
            />
          </label>
          <button>register</button>
        </form>
      )}
      <button onClick={() => setLoginOrRegister((old) => !old)}>
        Go to {loginOrRegister ? "register" : "login"}
      </button>
    </div>
  );
};

export default Login;
