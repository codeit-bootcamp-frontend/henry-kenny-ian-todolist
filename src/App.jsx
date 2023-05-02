import { useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import Button from "./Components/Button/Button";
import Modal from "./Components/Modal/Modal";
import Header from "./Components/Header/Header";
import "./App.css";
function App() {
  const [theme, setTheme] = useState("light");
  const [showModal, setShowModal] = useState(false);

  const handleClickOpenModal = () => {
    setShowModal(true);
  };

  const handleClickCloseModal = () => {
    setShowModal(false);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header></Header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
          margin: "0 auto",
          width: "200px",
          height: "400px",
          marginTop: "66px",
          backgroundColor: theme === "light" ? "#ECECF1" : "#36393B",
          borderRadius: "16px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            marginBottom: "66px",
            color: theme === "light" ? "#575F6B" : "#F8F8F8",
          }}
        >
          Todo List
        </h1>
        <Button text={"+"} onClick={handleClickOpenModal} />
      </div>
      {showModal && <Modal onClose={handleClickCloseModal} />}
    </ThemeContext.Provider>
  );
}

export default App;
