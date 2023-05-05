import React, { useContext } from "react";
import ModalPortal from "./ModalPortal";
import Button from "../Button/Button";
import styles from "./Modal.module.css";
import { ThemeContext } from "../../Contexts/ThemeContext";

const NoticeModal = ({ onClose, message }) => {
  const { theme } = useContext(ThemeContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <ModalPortal>
      <div className={styles.overlay} onClick={onClose} />
      <div className={`${styles.wrapper} ${theme} modal-box-${theme}`}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={`${styles.input} ${styles.doneInput} convex-${theme}-md ${theme}`}
            type="text"
            readOnly
            placeholder={message}
          ></input>
          <div className={styles.doneButtonsContainer}>
            <Button
              buttonType="close"
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

export default NoticeModal;
