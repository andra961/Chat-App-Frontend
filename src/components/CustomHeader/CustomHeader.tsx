import React from "react";

import "./customHeader.css";

const CustomHeader = ({ username }: { username: string }) => {
  return (
    <div className="headerContainer">
      <div className="usernameText">{username}</div>
    </div>
  );
};

export default CustomHeader;
