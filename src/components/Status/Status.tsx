import { Theme, useTheme } from "@mui/material";
import React from "react";

import "./status.css";

export enum ConnectionStatus {
  Online = "online",
  Connecting = "connecting",
  Offline = "offline",
}

type StatusProps = {
  status: ConnectionStatus;
};

const getColor = (theme: Theme, status: ConnectionStatus) => {
  const colors: { [key in ConnectionStatus]: string } = {
    [ConnectionStatus.Online]: theme.palette.success.main,
    [ConnectionStatus.Offline]: theme.palette.error.main,
    [ConnectionStatus.Connecting]: theme.palette.warning.main,
  };

  return colors[status];
};
const Status = ({ status }: StatusProps) => {
  const theme = useTheme();

  return (
    <div
      className="statusContainer"
      style={{
        backgroundColor: getColor(theme, status),
      }}
    />
  );
};

export default Status;
