import React from "react";

import "./message.css";

export type MessageData = {
  text: string;
  op: string;
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
        justifyContent: username === message.op ? "flex-end" : "flex-start",
      }}
    >
      <div className="message">
        {showOp && (
          <div
            className="op"
            style={{
              textAlign: username === message.op ? "end" : "start",
            }}
          >
            {message.op === username ? "you" : message.op}
          </div>
        )}
        <div className="text">{message.text}</div>
      </div>
    </div>
  );
};

export default Message;
