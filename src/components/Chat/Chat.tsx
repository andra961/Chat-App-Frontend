import React, { useEffect, useRef, useState } from "react";

import { BiSend } from "react-icons/bi";
import CustomHeader from "../CustomHeader";

import Message from "./components/Message";
import { MessageData } from "./components/Message";

import "react-toastify/dist/ReactToastify.min.css";
import "./chat.css";
import { toast, ToastContainer } from "react-toastify";
import messageService from "../../services/messagesService";
import { useParams } from "react-router-dom";
import authService from "../../services/authentication";

const Chat = ({ username }: { username: string }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageData[]>([]);
  const ws = useRef<WebSocket | null>(null);

  const { chatId } = useParams();

  const msgScroll = useRef<HTMLDivElement>(null);

  const inputText = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(messages);
    msgScroll.current?.scrollBy(0, msgScroll.current?.scrollHeight);
  }, [messages]);

  useEffect(() => {
    let mounted = true;
    if (chatId === undefined) return;
    const initWs = async () => {
      const { ticket: ws_ticket } = await authService.getWSTicket();
      if (!mounted) return;
      ws.current = new WebSocket(
        `${
          process.env.REACT_APP_WS_SERVER_URL || "ws://localhost:8080"
        }?ticket=${ws_ticket}`
      );

      ws.current.onopen = () => {
        console.log("WebSocket Connected");
      };

      ws.current.onmessage = async (e) => {
        const message = JSON.parse(e.data) as MessageData;
        if (message.senderId !== username) {
          toast.info(`${message.senderId}: ${message.text}`, {
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
    };
    const fetchMessages = async () => {
      try {
        const oldMsg = await messageService.getMessages(chatId);
        setMessages(oldMsg);
      } catch (e) {
        console.log(e);
      }
    };

    void fetchMessages();
    void initWs();

    inputText.current?.focus();

    return () => {
      mounted = false;
      ws.current?.close();
    };
  }, [username, chatId]);

  const onSubmit = () => {
    if (message.length === 0) return;
    if (chatId === undefined) return;
    const newMessage = { text: message, chatId: chatId };
    ws.current?.send(JSON.stringify(newMessage));

    //optimistic ui update
    // setMessages((messages) => [...messages, { ...newMessage, op: username }]);
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
            showOp={
              index === 0 || messages[index - 1].senderId !== msg.senderId
            }
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
