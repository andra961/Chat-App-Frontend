import React, { useEffect, useState } from "react";
import { generateUsername } from "unique-username-generator";
import "./App.css";
import Chat from "./components/Chat";

/*fallback: {
  "stream": require.resolve("stream-browserify"),
  "crypto": require.resolve("crypto-browserify")
},*/

function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    let username = localStorage.getItem("username");
    if (username === null) {
      username = generateUsername();
      localStorage.setItem("username", username);
    }
    setUsername(username);
  }, []);

  return (
    <div className="App">
      <Chat username={username} />
    </div>
  );
}

export default App;
