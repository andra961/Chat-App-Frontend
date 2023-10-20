import React from "react";

import "./message.css";

export type MessageData = {
  text: string;
  senderId: string;
  chatId: string;
};

const Message = ({
  username,
  message,
  showOp,
}: {
  username: string;
  message: MessageData;
  showOp: boolean;
}) => {
  return (
    <div
      className="messageContainer"
      style={{
        justifyContent:
          username === message.senderId ? "flex-end" : "flex-start",
        marginTop: showOp ? "10px" : "3px",
      }}
    >
      <div className="message">
        {showOp && (
          <div
            className={
              username === message.senderId ? "rightPoint" : "leftPoint"
            }
          />
        )}
        {showOp && (
          <div
            className="sender"
            style={{
              textAlign: username === message.senderId ? "end" : "start",
            }}
          >
            {message.senderId === username ? "you" : message.senderId}
          </div>
        )}
        <div className="text">{message.text}</div>
      </div>
    </div>
  );
};

export default Message;
