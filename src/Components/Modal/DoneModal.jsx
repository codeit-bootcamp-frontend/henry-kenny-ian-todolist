import React from "react";
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

const MODAL_INPUT = {
  width: "450px",
  height: "74px",
  backgroundColor: "#EDEEF2",
  boxShadow: "inset 2px 2px 4px #bebebe, inset -2px -2px 4px #ffffff",
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

const DoneModal = ({ onClose }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <ModalPortal>
      <div style={OVERLAY_STYLE} onClick={onClose} />
      <div style={MODAL_BOX_STYLE_1}></div>
      <div style={MODAL_BOX_STYLE_2}>
        <form style={MODAL_FORM} onSubmit={handleSubmit}>
          <input
            style={MODAL_INPUT}
            type="text"
            readOnly
            placeholder="축하합니다!!!전부 달성하셨네요!"
          ></input>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "322px",
            }}
          >
            <Button
              buttonType="confirm"
              onClick={(e) => {
                onClose();
              }}
            />
          </div>
        </form>
      </div>
    </ModalPortal>
  );
};

export default DoneModal;
