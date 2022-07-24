import React, { useEffect, useRef, useState } from "react";

import { BiSend } from "react-icons/bi";
import CustomHeader from "../CustomHeader";

import "./chat.css";
import Message from "./components/Message";
import { MessageData } from "./components/Message";

const Chat = ({ username }: { username: string }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [ws, setWs] = useState(
    new WebSocket(process.env.REACT_APP_WS_SERVER_URL || "ws://localhost:8080")
  );

  const msgScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(messages);
    msgScroll.current?.scrollBy(0, msgScroll.current?.scrollHeight);
    console.log("scroll");
  }, [messages]);

  useEffect(() => {
    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = async (e) => {
      console.log("new mgs", await e.data.text());
      const message = JSON.parse(await e.data.text());
      setMessages([...messages, message]);
    };

    /*return () => {
      ws.onclose = () => {
        console.log("WebSocket Disconnected");
        setWs(
          new WebSocket(
            process.env.REACT_APP_WS_SERVER_URL || "ws://localhost:8080"
          )
        );
      };
    };*/
  }, [ws.onmessage, ws.onopen, ws.onclose, messages, ws]);

  const onSubmit = () => {
    if (message.length === 0) return;
    const newMessage = { text: message, op: username };
    ws.send(JSON.stringify(newMessage));
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="chatContainer">
      <CustomHeader username={username} />
      <div className="msgContainer" ref={msgScroll}>
        {messages.map((msg, index) => (
          <Message
            username={username}
            message={msg}
            key={index}
            showOp={index === 0 || messages[index - 1].op !== msg.op}
          />
        ))}
      </div>
      <form
        className="sendContainer"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          className="textInput"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message..."
        />
        {message.length > 0 && (
          <BiSend onClick={onSubmit} className="sendIcon" />
        )}
      </form>
    </div>
  );
};

export default Chat;
