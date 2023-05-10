import { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import Modal from "../Components/Modal/Modal";
import NoticeModal from "../Components/Modal/NoticeModal";
import DoneModal from "../Components/Modal/DoneModal";
import TodoListItem from "../Components/TodoList/TodoListItem";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import Button from "../Components/Button/Button";
import "../App.css";
import { firestore } from "../service/firebase";
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

const HomePage = ({ userInfo, isLoggedIn }) => {
  const [showModal, setShowModal] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const queryPath = `/users/${userInfo?.uid}/todos`;
  const _query = collection(firestore, queryPath);
  const [todos, loading, error] = useCollectionData(_query);
  const [editTarget, setEditTarget] = useState();
  const [showDone, setShowDone] = useState(false);

  const progressPercentage = useMemo(() => {
    if (!todoItems || todoItems.length === 0) return 0;
    return todoItems.filter((el) => el.isComplete).length / todoItems.length;
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
    setShowDone(progressPercentage === 1);
  }, [progressPercentage]);

  if (!isLoggedIn) return <Navigate to="/signin" />;
  return (
    <>
      <main>
        <div
          className={styles.title}
        >{`${userInfo.displayName}님의 할일 목록`}</div>
        <ProgressBar progress={progressPercentage} />
        <ul className={styles.todolistContainer}>
          {todoItems?.map((item) => (
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
            userInfo={userInfo}
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
