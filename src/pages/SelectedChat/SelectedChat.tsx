import { LinearProgress, useMediaQuery } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Chat from "../../components/Chat";
import Chats from "../../components/Chats";
import { useAuthContext } from "../../context/AuthContext";
import messageService from "../../services/messagesService";

import "./selectedChat.css";

const SelectedChat = () => {
  const bkWidth = getComputedStyle(document.body).getPropertyValue(
    "--mobile-breakpoint-width"
  );
  const matches = useMediaQuery(`(min-width: ${bkWidth})`);

  const { chatId } = useParams();

  const { user } = useAuthContext();

  const { isLoading, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => messageService.getChat(chatId || ""),
  });

  if (!user) return <></>;

  return (
    <div className="selectedChatContainer">
      {matches && <Chats />}
      {isLoading || !data ? (
        <LinearProgress />
      ) : (
        <Chat user={user} chatData={data} />
      )}
    </div>
  );
};

export default SelectedChat;
