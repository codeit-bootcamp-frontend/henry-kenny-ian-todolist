"use client";

import { useState, useEffect, useMemo } from "react";
import Modal from "./components/Modal/Modal";
import DoneModal from "./components/Modal/DoneModal";
import TodoListItem from "./components/TodoList/TodoListItem";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Button from "./components/Button/Button";
import firestore from "./lib/firebase/firestore";
import {
  collection,
  query,
  where,
  updateDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import styles from "./HomePage.module.css";
import { AnimatePresence } from "framer-motion";
import { userState } from "./recoil/atoms";
import { useRecoilValue } from "recoil";

const HomePage = () => {
  const user = useRecoilValue(userState);
  const [showModal, setShowModal] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const queryPath = `/users/${user?.uid}/todos`;
  const _query = collection(firestore, queryPath);
  const [todos, loading, error] = useCollectionData(_query);
  const [editTarget, setEditTarget] = useState();
  const [showDone, setShowDone] = useState(false);

  const progressPercentage = useMemo(() => {
    let ret = 0;
    if (todoItems) {
      if (todoItems.length > 0)
        ret = todoItems.filter((el) => el.isComplete).length / todoItems.length;
      else ret = 0;
    }
    return ret;
  }, [todoItems, todos]);

  const handleClickOpenModal = (targetId) => {
    setShowModal(true);
    if (targetId) {
      setEditTarget(
        todoItems.find((item) => {
          return item.id === targetId;
        })
      );
    }
  };
  const handleCloseDoneModal = () => {
    setShowDone(false);
  };
  const handleClickCloseModal = () => {
    setShowModal(false);
  };

  const handleClickCheckBox = async (id) => {
    const q = query(collection(firestore, queryPath), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      await updateDoc(doc.ref, {
        isComplete: !data.isComplete,
      });
    });
  };

  const handleDeleteItem = async (id) => {
    const q = query(collection(firestore, queryPath), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };

  useEffect(() => {
    setTodoItems(todos);
  }, [todos]);

  useEffect(() => {
    if (progressPercentage === 1) {
      setShowDone(true);
    } else {
      setShowDone(false);
    }
  }, [progressPercentage]);

  if (!user) return null;
  return (
    <>
      <main className={styles.main}>
        <div
          className={styles.title}
        >{`${user.displayName}님의 할일 목록`}</div>
        <ProgressBar progress={progressPercentage} />
        <ul className={styles.todolistContainer}>
          {todoItems &&
            todoItems.map((item) => (
              <li key={item.id}>
                <TodoListItem
                  {...item}
                  onClickCheckBox={handleClickCheckBox}
                  onClickEdit={handleClickOpenModal}
                  onClickDelete={handleDeleteItem}
                />
              </li>
            ))}
        </ul>
        <div style={{ marginTop: "40px" }}>
          <Button buttonType="create" onClick={handleClickOpenModal} />
        </div>
      </main>

      <AnimatePresence mode="wait">
        {showModal && (
          <Modal
            onClose={handleClickCloseModal}
            userInfo={user}
            todoItem={editTarget ?? undefined}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {showDone && (
          <DoneModal
            onClose={handleCloseDoneModal}
            message="달성률 100%를 축하합니다!"
          ></DoneModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePage;
