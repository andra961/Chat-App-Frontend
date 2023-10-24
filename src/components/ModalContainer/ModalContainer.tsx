import React, { ReactNode } from "react";

import { ModalContext } from "../../context/ModalContext";
import { Box, Modal } from "@mui/material";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "visible",

  bgcolor: "background.paper",
  border: "1px solid #b1b4b6",
  boxShadow: "none",
};

const modalContentStyle = {
  flexDirection: "column",
  padding: "15px",
  overflow: "hidden",
  display: "flex",
};

const ModalContainer = ({
  isOpen,
  onClose,
  children,
  closeOnClickAway = true,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnClickAway?: boolean;
}) => {
  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-label"
      aria-describedby="modal-modal-description"
      onClose={(e, reason) => {
        if (reason !== "backdropClick" || closeOnClickAway) onClose();
      }}
    >
      <Box sx={{ ...modalStyle, ...modalContentStyle }}>
        <ModalContext.Provider value={{ closeModal: onClose }}>
          {children}
        </ModalContext.Provider>
      </Box>
    </Modal>
  );
};

export default ModalContainer;
