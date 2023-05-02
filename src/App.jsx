import { useState } from "react";
import ToggleSwitch from "./Components/Switch/ToggleSwitch";
import { ThemeContext } from "./contexts/ThemeContext";
import { useMediaQuery } from "react-responsive";
import Button from "./Components/Button/Button";
import Modal from "./Components/Modal/Modal";

function App() {
  const [theme, setTheme] = useState("light");
  const [showModal, setShowModal] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 430px)" });

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleClickOpenModal = () => {
    setShowModal(true);
  };

  const handleClickCloseModal = () => {
    setShowModal(false);
  };

  return (
    <ThemeContext.Provider value={{ theme }}>
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
        <ToggleSwitch
          checked={theme === "light"}
          onChange={handleChange}
          isMobile={isMobile}
        />
      </div>
      {showModal && <Modal onClose={handleClickCloseModal} />}
    </ThemeContext.Provider>
  );
}

export default App;
