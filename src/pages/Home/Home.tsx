import { useMediaQuery } from "@mui/material";
import React from "react";
import Chats from "../../components/Chats";

import "./home.css";

const Home = () => {
  const bkWidth = getComputedStyle(document.body).getPropertyValue(
    "--mobile-breakpoint-width"
  );
  const matches = useMediaQuery(`(min-width: ${bkWidth})`);
  return (
    <div className="homeContainer">
      <Chats />
      {matches && (
        <div className="homeEmptyChat">
          <h3>Select a chat...</h3>
        </div>
      )}
    </div>
  );
};

export default Home;
