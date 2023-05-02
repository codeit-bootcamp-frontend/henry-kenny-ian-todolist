import React from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal-portal");
  return createPortal(children, el);
};

export default ModalPortal;
