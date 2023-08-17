import React, { useEffect, useRef, useState } from "react";

import { BiSend } from "react-icons/bi";
import CustomHeader from "../CustomHeader";

import Message from "./components/Message";
import { MessageData } from "./components/Message";

import "react-toastify/dist/ReactToastify.min.css";
import "./chat.css";
import { toast, ToastContainer } from "react-toastify";
import messageService from "../../services/messagesService";

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
    const fetchMessages = async () => {
      try {
        const oldMsg = await messageService.getMessages();
        setMessages(oldMsg);
      } catch (e) {
        console.log(e);
      }
    };

    void fetchMessages();

    ws.current = new WebSocket(
      `${process.env.REACT_APP_WS_SERVER_URL || "ws://localhost:8080"}?ticket=${
        localStorage.getItem("ws_ticket") || ""
      }`
    );

    ws.current.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.current.onmessage = async (e) => {
      const message = JSON.parse(e.data) as MessageData;
      if (message.op !== username) {
        toast.info(`${message.op}: ${message.text}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setMessages((messages) => [...messages, message]);
    };

    inputText.current?.focus();

    return () => {
      ws.current?.close();
    };
  }, [username]);

  const onSubmit = () => {
    if (message.length === 0) return;
    const newMessage = { text: message };
    ws.current?.send(JSON.stringify(newMessage));
    setMessages((messages) => [...messages, { ...newMessage, op: username }]);
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
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            type="submit"
          >
            <BiSend className="sendIcon" />
          </button>
        )}
        <ToastContainer />
      </form>
    </div>
  );
};

export default Chat;
