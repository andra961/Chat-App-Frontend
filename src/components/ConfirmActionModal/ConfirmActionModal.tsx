import { Box, Button } from "@mui/material";
import React from "react";
import ModalContainer from "../ModalContainer";
import { ModalContainerProps } from "../ModalContainer/ModalContainer";

import "./confirmActionModal.css";

export type ConfirmActionModalProps = {
  onConfirm: (() => void) | (() => Promise<void>);
} & ModalContainerProps;

const ConfirmActionModal = ({
  children,
  onConfirm,
  onClose,
  ...props
}: ConfirmActionModalProps) => {
  return (
    <ModalContainer onClose={onClose} {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm();
        }}
      >
        {children}
        <Box
          sx={{
            marginTop: "8px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button type="button" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Confirm
          </Button>
        </Box>
      </form>
    </ModalContainer>
  );
};

export default ConfirmActionModal;
