import React, { useState } from "react";
import authService from "../../services/authentication";

const Login = ({ setUser }: { setUser: (username: string) => void }) => {
  const [loginOrRegister, setLoginOrRegister] = useState(true);
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const onSubmitLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await authService.login(username, password);
    setUser(res.username);
  };

  const onSubmitRegister: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    const res = await authService.register(username, password);
    setUser(res.username);
  };

  return (
    <div>
      <label>
        {loginOrRegister ? "register" : "login"}
        <input
          type={"checkbox"}
          checked={loginOrRegister}
          onChange={(e) => setLoginOrRegister(e.currentTarget.checked)}
        />
      </label>
      {loginOrRegister ? (
        <form onSubmit={onSubmitLogin}>
          <label>
            <input
              type={"text"}
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              placeholder={"username"}
            />
          </label>
          <label>
            <input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder={"username"}
            />
          </label>
          <button>login</button>
        </form>
      ) : (
        <form onSubmit={onSubmitRegister}>
          <label>
            <input
              type={"text"}
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              placeholder={"username"}
            />
          </label>
          <label>
            <input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder={"username"}
            />
          </label>
          <button>register</button>
        </form>
      )}
    </div>
  );
};

export default Login;
