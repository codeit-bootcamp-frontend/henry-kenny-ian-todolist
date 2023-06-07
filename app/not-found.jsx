"use client";
import React, { useContext } from "react";
import Button from "./components/Button/Button";
import { useRouter } from "next/navigation";
import styles from "./not-found.module.css";
import ThemeContext from "./Contexts/ThemeContext";

const NotFoundPage = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  const themeClass = `${theme}Theme`;
  return (
    <main className={`${styles.main} ${theme}`}>
      <div className={`${styles.wrapper}`}>
        <h1 className={`${styles.heading} ${styles[themeClass]}`}>404</h1>
        <h2 className={`${styles.content} ${styles[themeClass]}`}>Not Found</h2>
        <Button onClick={handleGoBack} buttonType="goback" />
      </div>
    </main>
  );
};

export default NotFoundPage;
