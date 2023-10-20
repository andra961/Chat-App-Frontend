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
          <button>login</button>
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
