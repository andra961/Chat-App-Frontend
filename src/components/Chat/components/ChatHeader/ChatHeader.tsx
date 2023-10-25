import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCallbackWithMenuClosure } from "../../../../utils/menu";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";

import "./chatHeader.css";

type ChatHeaderProps = {
  chatName: string;
  status: string;
};

const ChatHeader = ({ chatName = "chat", status }: ChatHeaderProps) => {
  const [chatMenuAnchor, setChatMenuAnchor] =
    useState<HTMLButtonElement | null>(null);

  const withMenuClose = getCallbackWithMenuClosure(() =>
    setChatMenuAnchor(null)
  );
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
        <IconButton onClick={(e) => setChatMenuAnchor(e.currentTarget)}>
          <MoreVertIcon />
        </IconButton>
      </div>
      <Menu
        id="chat-menu"
        anchorEl={chatMenuAnchor}
        open={Boolean(chatMenuAnchor)}
        keepMounted
        onClose={() => setChatMenuAnchor(null)}
      >
        <MenuItem divider onClick={withMenuClose(() => console.log("add"))}>
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          Add Members
        </MenuItem>
        <MenuItem divider onClick={withMenuClose(() => console.log("delete"))}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete chat
        </MenuItem>
        <MenuItem divider onClick={withMenuClose(() => console.log("exit"))}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Exit chat
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ChatHeader;
