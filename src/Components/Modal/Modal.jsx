import React, { useRef, useState } from "react";
import ModalPortal from "./ModalPortal";

import Button from "../Button/Button";

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
  paddingTop: "66px",
  paddingBottom: "40px",
};

const OVERLAY_STYLE = {
  position: "fixed",
  inset: "0",
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: "1",
};

const ADD_BUTTON = {
  width: "122px",
  height: "50px",
  filter:
    "drop-shadow(-4px -4px 20px #FFFFFF) drop-shadow(3px 3px 20px rgba(36, 65, 93, 0.302))",
  background: "linear-gradient(309.34deg, #F2F3F6 -13.68%, #E5E6EC 171.92%)",
  border: "none",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const MODAL_INPUT = {
  width: "450px",
  height: "74px",
  boxShadow: "inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff",
  fontSize: "28px",
  borderRadius: "20px",
  textIndent: "16px",
};

const MODAL_FORM = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "40px",
};

const Modal = ({ onClose }) => {
  const titleRef = useRef(null);
  const [title, setTitle] = useState("");
  const handleChange = () => {
    if (!titleRef.current) return;
    setTitle(titleRef.current.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ModalPortal>
      <div style={OVERLAY_STYLE} onClick={onClose} />
      <div style={MODAL_BOX_STYLE_1}></div>
      <div style={MODAL_BOX_STYLE_2}>
        <form style={MODAL_FORM} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="내용을 입력하세요..."
            ref={titleRef}
            onChange={handleChange}
            style={MODAL_INPUT}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "322px",
            }}
          >
            <Button
              src="assets/cancelmark.png"
              onClick={onClose}
              style={ADD_BUTTON}
              type="edit"
            />
            <Button
              src="assets/checkmark.png"
              style={ADD_BUTTON}
              type="edit"
              buttonType="submit"
            />
          </div>
        </form>
      </div>
    </ModalPortal>
  );
};

export default Modal;
