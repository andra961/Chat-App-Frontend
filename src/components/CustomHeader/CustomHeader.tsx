import {
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import ModalContainer from "../ModalContainer";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import "./customHeader.css";
import { getCallbackWithMenuClosure } from "../../utils/menu";

const CustomHeader = ({ username }: { username: string }) => {
  const [createChatModalOpen, setCreateChatModalOpen] = useState(false);

  const [hamburgerAnchor, setHamburgerAnchor] =
    useState<HTMLButtonElement | null>(null);
  const [accountMenuAnchor, setAccountMenuAnchor] =
    useState<HTMLButtonElement | null>(null);

  const withHamburgerClose = getCallbackWithMenuClosure(() =>
    setHamburgerAnchor(null)
  );
  const withAccountMenuClose = getCallbackWithMenuClosure(() =>
    setAccountMenuAnchor(null)
  );

  return (
    <div className="headerContainer">
      <IconButton onClick={(e) => setHamburgerAnchor(e.currentTarget)}>
        <MenuIcon />
      </IconButton>
      <div className="usernameText">
        {username}
        <IconButton onClick={(e) => setAccountMenuAnchor(e.currentTarget)}>
          <AccountCircleIcon />
        </IconButton>
      </div>
      <Menu
        id="account-menu"
        anchorEl={accountMenuAnchor}
        open={Boolean(accountMenuAnchor)}
        keepMounted
        onClose={() => setAccountMenuAnchor(null)}
      >
        <MenuItem
          divider
          onClick={withAccountMenuClose(() => setCreateChatModalOpen(true))}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Menu
        id="chats-menu"
        anchorEl={hamburgerAnchor}
        open={Boolean(hamburgerAnchor)}
        keepMounted
        onClose={() => setHamburgerAnchor(null)}
      >
        <MenuItem
          divider
          onClick={withHamburgerClose(() => setCreateChatModalOpen(true))}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          New Group Chat
        </MenuItem>
        <MenuItem
          divider
          onClick={withHamburgerClose(() => setCreateChatModalOpen(true))}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          Direct msg
        </MenuItem>
      </Menu>
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
