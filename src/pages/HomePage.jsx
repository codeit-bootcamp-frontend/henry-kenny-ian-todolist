import { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import Modal from "../Components/Modal/Modal";
import TodoListItem from "../Components/TodoList/TodoListItem";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import Button from "../Components/Button/Button";
import "../App.css";

const LISTS = [
  {
    id: 1,
    title: "밥 먹기",
    isComplete: false,
  },
  {
    id: 2,
    title: "개 밥 주기",
    isComplete: false,
  },
  {
    id: 3,
    title: "고양이 밥 주기",
    isComplete: true,
  },
  {
    id: 4,
    title: "개 산책",
    isComplete: false,
  },
  {
    id: 5,
    title: "고양이 산책",
    isComplete: true,
  },
];

const ADD_BUTTON = {
  width: "300px",
  height: "80px",
  margin: "0 auto",
  filter:
    "drop-shadow(-4px -4px 20px #FFFFFF) drop-shadow(3px 3px 20px rgba(36, 65, 93, 0.302))",
  background: "linear-gradient(309.34deg, #F2F3F6 -13.68%, #E5E6EC 171.92%)",
  border: "none",
  borderRadius: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "46px",
};

const HomePage = ({ userInfo }) => {
  const [showModal, setShowModal] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const progressPercentage = useMemo(() => {
    return todoItems.filter((el) => el.isComplete).length / todoItems.length;
  }, [todoItems]);

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
    //prop으로 받은 userInfo로 firestore에서 해당 유저의 todolist를 가져오는 코드
    setTodoItems(LISTS);
  }, []);
  if (!userInfo) return <Navigate to="/signin" />;
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
      {showModal && <Modal onClose={handleClickCloseModal} />}
    </>
  );
};

export default HomePage;
