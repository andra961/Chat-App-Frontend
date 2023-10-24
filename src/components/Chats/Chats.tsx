import React from "react";
import { useMediaQuery } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Link } from "react-router-dom";
import messageService from "../../services/messagesService";
import JazzIcon from "../Chat/components/JazzIcon";
// import Jazzicon from "react-jazzicon";
import "./chats.css";

const Chats = () => {
  const bkWidth = getComputedStyle(document.body).getPropertyValue(
    "--mobile-breakpoint-width"
  );
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["chats"],
    queryFn: messageService.getChats,
  });

  const matches = useMediaQuery(`(max-width: ${bkWidth})`);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className={clsx("chatsContainer", { chatsContainerMobile: matches })}>
      {data !== undefined && (
        <ul>
          {data.map((chat) => (
            <Link key={chat.id} to={`/home/chat/${chat.id}`}>
              <li className="chatsChatMiniature">
                <JazzIcon diameter={30} seed={chat.id} />
                {chat.name}
              </li>
            </Link>
          ))}
        </ul>
      )}
      {data !== undefined && data.length === 0 && <span>No chats to show</span>}
    </div>
  );
};

export default Chats;
