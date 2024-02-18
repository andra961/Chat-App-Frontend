import { useMediaQuery } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import Chat from "../../components/Chat";
import Chats from "../../components/Chats";

import "./selectedChat.css";

type SelectedChatProps = {
  username: string;
};

const SelectedChat = ({ username }: SelectedChatProps) => {
  const bkWidth = getComputedStyle(document.body).getPropertyValue(
    "--mobile-breakpoint-width"
  );
  const matches = useMediaQuery(`(min-width: ${bkWidth})`);

  const [searchParams] = useSearchParams();

  const name = searchParams.get("name");

  return (
    <div className="selectedChatContainer">
      {matches && <Chats />}
      <Chat username={username} chatName={name || "chat"} />
    </div>
  );
};

export default SelectedChat;
