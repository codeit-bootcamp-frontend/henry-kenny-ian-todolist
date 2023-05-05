import React, { useContext } from "react";
import Button from "../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import { ThemeContext } from "../Contexts/ThemeContext";

const NotFoundPage = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const themeClass = `${theme}Theme`;
  const shadow = `convex-${theme}-lg`;
  return (
    <main className={theme}>
      <div className={`${styles.wrapper}`}>
        <h1 className={`${styles.heading} ${styles[themeClass]}`}>404</h1>
        <h2 className={`${styles.content} ${styles[themeClass]}`}>Not Found</h2>
        <Button onClick={handleGoBack} buttonType="goback" />
      </div>
    </main>
  );
};

export default NotFoundPage;
