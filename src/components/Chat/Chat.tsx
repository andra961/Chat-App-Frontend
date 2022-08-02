import React, { useEffect, useRef, useState } from "react";

import { BiSend } from "react-icons/bi";
import CustomHeader from "../CustomHeader";

import "./chat.css";
import Message from "./components/Message";
import { MessageData } from "./components/Message";

const Chat = ({ username }: { username: string }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageData[]>([]);
  const ws = useRef<WebSocket | null>(null);

  const msgScroll = useRef<HTMLDivElement>(null);

  const inputText = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(messages);
    msgScroll.current?.scrollBy(0, msgScroll.current?.scrollHeight);
  }, [messages]);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const oldMsg = await (
          await fetch(
            `${
              process.env.REACT_APP_HTTP_SERVER_URL || "http://localhost:4000"
            }/messages`
          )
        ).json();
        setMessages(oldMsg);
      } catch (e) {
        console.log(e);
      } finally {
        ws.current = new WebSocket(
          process.env.REACT_APP_WS_SERVER_URL || "ws://localhost:8080"
        );

        ws.current.onopen = () => {
          console.log("WebSocket Connected");
        };

        ws.current.onmessage = async (e) => {
          const message = JSON.parse(e.data);
          setMessages((messages) => [...messages, message]);
        };

        inputText.current?.focus();
      }
    };

    initializeApp();

    return () => {
      ws.current?.close();
    };
  }, []);

  const onSubmit = () => {
    if (message.length === 0) return;
    const newMessage = { text: message, op: username };
    ws.current?.send(JSON.stringify(newMessage));
    setMessages((messages) => [...messages, newMessage]);
    setMessage("");
    inputText.current?.focus();
  };

  return (
    <div className="chatContainer">
      <CustomHeader username={username} />
      <div className="msgContainer" ref={msgScroll}>
        <div className="fillMsgContainerTop" />
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
          ref={inputText}
        />
        {message.length > 0 && (
          <BiSend onClick={onSubmit} className="sendIcon" />
        )}
      </form>
    </div>
  );
};

export default Chat;
