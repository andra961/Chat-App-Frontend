import React from "react";

import "./customHeader.css";

const CustomHeader = ({
  username,
  status,
}: {
  username: string;
  status: string;
}) => {
  return (
    <div className="headerContainer">
      <div className="usernameText">{username}</div>
      {status}
    </div>
  );
};

export default CustomHeader;
