import { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import Modal from "../Components/Modal/Modal";
import TodoListItem from "../Components/TodoList/TodoListItem";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import Button from "../Components/Button/Button";
import "../App.css";
import { firestore } from "../service/firebase";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const HomePage = ({ userInfo, isLoggedIn }) => {
  const [showModal, setShowModal] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const queryPath = `/users/${userInfo?.uid}/todos`;
  const query = collection(firestore, queryPath);
  const [todos, loading, error] = useCollectionData(query);
  const progressPercentage = useMemo(() => {
    if (todoItems)
      return todoItems.filter((el) => el.isComplete).length / todoItems.length;
    return 0;
  }, [todoItems, todos]);

  const handleClickOpenModal = () => {
    setShowModal(true);
  };

  const handleClickCloseModal = () => {
    setShowModal(false);
  };

  const handleClickCheckBox = (id) => {
    const temp = [...todoItems];
    const targetIndex = temp.findIndex((todoItem) => todoItem.id === id);
    temp[targetIndex].isComplete = !temp[targetIndex].isComplete;

    setTodoItems(temp);
  };

  useEffect(() => {
    setTodoItems(todos);
  }, [todos]);

  if (!isLoggedIn) return <Navigate to="/signin" />;
  return (
    <>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "60px",
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
                <TodoListItem {...item} onClickCheckBox={handleClickCheckBox} />
              </li>
            ))}
        </ul>
        <div>
          <Button buttonType="create" onClick={handleClickOpenModal} />
        </div>
      </main>
      {showModal && (
        <Modal onClose={handleClickCloseModal} userInfo={userInfo} />
      )}
    </>
  );
};

export default HomePage;
