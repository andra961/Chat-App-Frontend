import { createContext, useContext } from "react";

export const ModalContext = createContext<{
  closeModal: () => void;
}>({
  closeModal: () => console.log("should close"),
});

export const useModalContext = () => useContext(ModalContext);
