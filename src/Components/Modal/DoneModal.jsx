import React from "react";
import ModalPortal from "./ModalPortal";
import Button from "../Button/Button";
import styles from "./Modal.module.css";

const DoneModal = ({ onClose }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <ModalPortal>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={`${styles.input} ${styles.doneInput} convex-light-md`}
            type="text"
            readOnly
            placeholder="달성률 100%를 축하합니다!!"
          ></input>
          <div className={styles.doneButtonsContainer}>
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
