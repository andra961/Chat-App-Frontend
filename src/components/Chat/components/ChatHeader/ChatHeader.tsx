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
import messageService, { ChatData } from "../../../../services/messagesService";
import Status from "../../../Status";
import { ConnectionStatus } from "../../../Status/Status";
import { useAuthContext } from "../../../../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

type ChatHeaderProps = {
  chatData: ChatData;
  status: ConnectionStatus;
};

const ChatHeader = ({ chatData, status }: ChatHeaderProps) => {
  const [chatMenuAnchor, setChatMenuAnchor] =
    useState<HTMLButtonElement | null>(null);

  const withMenuClose = getCallbackWithMenuClosure(() =>
    setChatMenuAnchor(null)
  );

  const queryClient = useQueryClient();

  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (!user) return <></>;

  return (
    <div className="chatHeaderContainer">
      <div>
        <IconButton onClick={() => navigate("/home")}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div className="chatHeaderTitleContainer">
        <Status status={status} />
        <h3>{chatData.name}</h3>-<span>{chatData.members.length} Members</span>
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
        {user.id === chatData.ownerId && (
          <MenuItem divider onClick={withMenuClose(() => console.log("add"))}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            Add Members
          </MenuItem>
        )}
        {user.id === chatData.ownerId && (
          <MenuItem
            divider
            onClick={withMenuClose(async () => {
              await messageService.deleteGroup(chatData.id);
              navigate("/home");
              queryClient.invalidateQueries({ queryKey: ["chats"] });
            })}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            Delete chat
          </MenuItem>
        )}
        {user.id !== chatData.ownerId && (
          <MenuItem divider onClick={withMenuClose(() => console.log("exit"))}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            Exit chat
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default ChatHeader;
