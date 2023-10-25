export const getCallbackWithMenuClosure = (onClose: () => void) => {
  return (cb: () => void) => {
    return () => {
      onClose();
      cb();
    };
  };
};
