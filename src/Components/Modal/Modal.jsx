import React from "react";
import ModalPortal from "./ModalPortal";

const MODAL_BOX_STYLE_1 = {
  position: "fixed",
  top: "50%",
  left: "50%",
  borderRadius: "10px",
  transform: "translate(-50%, -50%",
  textAlign: "center",
  padding: "40px",
  width: "556px",
  height: "278px",
  background: "linear-gradient(310.59deg, #F2F3F6 3.8%, #E5E6EC 119.99%)",
  filter: "drop-shadow(3px 3px 20px rgba(36, 65, 93, 0.302))",
  zIndex: "10",
};

const MODAL_BOX_STYLE_2 = {
  position: "fixed",
  top: "50%",
  left: "50%",
  borderRadius: "10px",
  transform: "translate(-50%, -50%",
  textAlign: "center",
  width: "556px",
  height: "278px",
  background: "#EDEEF2",
  filter: "drop-shadow(3px 3px 20px rgba(36, 65, 93, 0.302))",
  zIndex: "11",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const OVERLAY_STYLE = {
  position: "fixed",
  inset: "0",
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: "1",
};

const Modal = ({ onClose }) => {
  return (
    <ModalPortal>
      <div style={OVERLAY_STYLE} onClick={onClose} />
      <div style={MODAL_BOX_STYLE_1}></div>
      <div style={MODAL_BOX_STYLE_2}>
        <p style={{ marginBottom: "20px" }}>모달창입니다.</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </ModalPortal>
  );
};

export default Modal;
