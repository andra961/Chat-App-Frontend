import { TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import messageService from "../../services/messagesService";
import ConfirmActionModal, {
  ConfirmActionModalProps,
} from "../ConfirmActionModal/ConfirmActionModal";

import "./createGroupModal.css";

type CreateGroupModalProps = {} & Omit<
  ConfirmActionModalProps,
  "children" | "onConfirm"
>;

const CreateGroupModal = ({ onClose, ...props }: CreateGroupModalProps) => {
  const [name, setName] = useState("");

  const queryClient = useQueryClient();

  const onConfirm = async () => {
    await messageService.createChat(name);
    queryClient.invalidateQueries({ queryKey: ["chats"] });
    onClose();
  };

  return (
    <ConfirmActionModal onConfirm={onConfirm} onClose={onClose} {...props}>
      <TextField
        label={"Name"}
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
    </ConfirmActionModal>
  );
};

export default CreateGroupModal;
