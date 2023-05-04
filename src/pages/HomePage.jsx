import { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import Modal from "../Components/Modal/Modal";
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

const HomePage = ({ userInfo, isLoggedIn }) => {
  const [showModal, setShowModal] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const queryPath = `/users/${userInfo?.uid}/todos`;
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
    }
  }, [progressPercentage]);

  if (!isLoggedIn) return <Navigate to="/signin" />;
  return (
    <>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "60px",
          paddingBottom: "90px",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            fontWeight: "500",
            color: "#767676",
          }}
        >{`${userInfo.displayName}님의 할일 목록`}</div>
        <ProgressBar progress={progressPercentage} />

        <ul className="todolist-container">
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
        <div>
          <Button buttonType="create" onClick={handleClickOpenModal} />
        </div>
      </main>
      {showModal && (
        <Modal
          onClose={handleClickCloseModal}
          userInfo={userInfo}
          todoItem={editTarget ?? undefined}
        />
      )}
      {showDone && <DoneModal onClose={handleCloseDoneModal} />}
    </>
  );
};

export default HomePage;
