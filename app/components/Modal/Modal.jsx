import React, { useContext, useRef, useState, useEffect } from "react";
import ThemeContext from "../../Contexts/ThemeContext";
import ModalPortal from "./ModalPortal";
import Button from "../Button/Button";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import firestore from "../../lib/firebase/firestore";
import styles from "./Modal.module.css";
import { motion } from "framer-motion";

const Modal = ({ onClose, userInfo, todoItem }) => {
  const { theme } = useContext(ThemeContext);
  const titleRef = useRef(null);
  const queryPath = `/users/${userInfo?.uid}/todos`;
  const [title, setTitle] = useState(todoItem ? todoItem.title : "");
  const [warning, setWarning] = useState(false);
  let warningClass = warning ? "warning" : "";

  const handleChange = () => {
    if (!titleRef.current) return;
    setTitle(titleRef.current.value);
  };

  const toastPopUpAnimation = {
    initial: {
      y: 200,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: 200,
      opacity: 0,
    },
  };

  const validateForm = (e) => {
    e.preventDefault();
    if (titleRef.current.value === "") {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 400);
      return;
    }
    handleSubmit(e);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todoItem) {
      editItem();
      return;
    }
    addItem();
  };

  const editItem = async () => {
    // 수정 용도로 사용하는 경우 submit 함수
    const q = query(
      collection(firestore, queryPath),
      where("id", "==", todoItem.id)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        title,
      });
    });
  };

  const addItem = async () => {
    // 추가 용도로 사용하는 경우 submit 함수
    await addDoc(collection(firestore, `users/${userInfo.uid}/todos`), {
      title,
      isComplete: false,
      id: new Date().getTime(),
    });
  };

  useEffect(() => {
    if (warning) warningClass = "warning";
  }, [warning]);

  return (
    <ModalPortal>
      <div className={styles.overlay} onClick={onClose}>
        <motion.div
          variants={toastPopUpAnimation}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          className={`${styles.wrapper} ${theme} modal-box-${theme} ${styles[warningClass]}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <form className={styles.form} onSubmit={handleSubmit}>
            <textarea
              className={`${styles.input} ${theme} concave-${theme}-sm`}
              type="text"
              placeholder={
                warning ? "내용을 입력하라고요!!" : "내용을 입력하세요..."
              }
              value={title}
              ref={titleRef}
              onChange={handleChange}
            />
            <div className={styles.buttonsContainer}>
              <Button buttonType="close" onClick={onClose} />
              <Button buttonType="confirm" onClick={validateForm} />
            </div>
          </form>
        </motion.div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
