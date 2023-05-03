import { useState, useEffect, useMemo } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import Modal from "../Components/Modal/Modal";
import Header from "../Components/Header/Header";
import TodoListItem from "../Components/TodoList/TodoListItem";
import ProgressBar from "../Components/ProgressBar/ProgressBar";

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

const TODOLIST_CONTAINER = {
  display: "flex",
  gap: "32px",
  flexDirection: "column",
  height: "500px",
  padding: "30px 24px",
  overflow: "scroll",
  width: "fit-content",
  margin: "0 auto",
};

const HomePage = ({ userInfo }) => {
  const [theme, setTheme] = useState("light");
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

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header></Header>
      <ProgressBar progress={progressPercentage} />
      <main>
        {`welcome ${userInfo.displayName}!`}
        <ul style={TODOLIST_CONTAINER}>
          {todoItems &&
            todoItems.map((item) => (
              <li key={item.id}>
                <TodoListItem {...item} onClickCheckBox={handleClickCheckBox} />
              </li>
            ))}
        </ul>
      </main>
      {showModal && <Modal onClose={handleClickCloseModal} />}
    </ThemeContext.Provider>
  );
};

export default HomePage;
