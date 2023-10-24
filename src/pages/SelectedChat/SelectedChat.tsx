import { useMediaQuery } from "@mui/material";
import React from "react";
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

  return (
    <div className="selectedChatContainer">
      {matches && <Chats />}
      <Chat username={username} />
    </div>
  );
};

export default SelectedChat;
