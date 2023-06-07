import { createPortal } from "react-dom";

const ToastPortal = ({ children }) => {
  const el = document.getElementById("toast-portal");
  return createPortal(children, el);
};

export default ToastPortal;
