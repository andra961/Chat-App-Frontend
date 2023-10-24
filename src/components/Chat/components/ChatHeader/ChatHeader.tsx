import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import "./chatHeader.css";

type ChatHeaderProps = {
  chatName: string;
  status: string;
};

const ChatHeader = ({ chatName = "chat", status }: ChatHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="chatHeaderContainer">
      <div>
        <IconButton onClick={() => navigate("/home")}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div className="chatHeaderTitleContainer">
        <h3>{chatName}</h3>
        <span>{status}</span>
      </div>
      <div>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatHeader;
