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
import CreateGroupModal from "../CreateGroupModal";
import { useAuthContext } from "../../context/AuthContext";

const CustomHeader = ({ username }: { username: string }) => {
  const [createChatModalOpen, setCreateChatModalOpen] = useState(false);
  const { setUser } = useAuthContext();

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
        <MenuItem divider onClick={withAccountMenuClose(() => setUser(null))}>
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
        <MenuItem divider>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          Direct msg
        </MenuItem>
      </Menu>
      <CreateGroupModal
        isOpen={createChatModalOpen}
        onClose={() => setCreateChatModalOpen(false)}
      />
    </div>
  );
};

export default CustomHeader;
