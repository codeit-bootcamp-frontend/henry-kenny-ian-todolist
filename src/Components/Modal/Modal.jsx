import React, { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";
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
import { firestore } from "../../service/firebase";
import styles from "./Modal.module.css";
import { motion } from "framer-motion";

const animation = {
  initial: {},
};

const Modal = ({ onClose, userInfo, todoItem }) => {
  const { theme } = useContext(ThemeContext);
  const titleRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  const queryPath = `/users/${userInfo?.uid}/todos`;
  const [title, setTitle] = useState(todoItem ? todoItem.title : "");
  const handleChange = () => {
    if (!titleRef.current) return;
    setTitle(titleRef.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (todoItem) {
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
    } else {
      // 추가 용도로 사용하는 경우 submit 함수
      await addDoc(collection(firestore, `users/${userInfo.uid}/todos`), {
        title,
        isComplete: false,
        id: new Date().getTime(),
      });
    }
  };

  return (
    <ModalPortal>
      <div className={styles.overlay} onClick={onClose}>
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          className={`${styles.wrapper} ${theme} modal-box-${theme}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <form className={styles.form} onSubmit={handleSubmit}>
            <textarea
              className={`${styles.input} ${theme} concave-${theme}-sm`}
              type="text"
              placeholder="내용을 입력하세요..."
              value={title}
              ref={titleRef}
              onChange={handleChange}
            />
            <div className={styles.buttonsContainer}>
              <Button buttonType="close" onClick={onClose} />
              <Button
                buttonType="confirm"
                onClick={(e) => {
                  handleSubmit(e);
                  setIsClosing(true);
                  setTimeout(() => {
                    onClose();
                  }, 200);
                }}
              />
            </div>
          </form>
        </motion.div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
