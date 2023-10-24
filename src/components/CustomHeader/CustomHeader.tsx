import { Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import ModalContainer from "../ModalContainer";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "./customHeader.css";

const CustomHeader = ({ username }: { username: string }) => {
  const [createChatModalOpen, setCreateChatModalOpen] = useState(false);
  return (
    <div className="headerContainer">
      <IconButton onClick={() => setCreateChatModalOpen(true)}>
        <MenuIcon />
      </IconButton>
      <div className="usernameText">
        {username}
        <AccountCircleIcon />
      </div>
      <ModalContainer
        isOpen={createChatModalOpen}
        onClose={() => setCreateChatModalOpen(false)}
      >
        <form>
          <TextField placeholder="name" />
          <Button>Create</Button>
        </form>
      </ModalContainer>
    </div>
  );
};

export default CustomHeader;
