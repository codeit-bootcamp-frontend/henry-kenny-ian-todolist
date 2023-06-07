import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import ThemeContext from "../../Contexts/ThemeContext";
import styles from "./DoneModal.module.css";
import ToastPortal from "./ToastPortal";

const DoneModal = ({ message, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const [containerTheme, setContainerTheme] = useState(
    theme === "light" ? "convex-light-lg" : "convex-dark-md"
  );

  useEffect(
    () =>
      setContainerTheme(
        theme === "light" ? "convex-light-md" : "convex-dark-sm"
      ),
    [theme]
  );
  useEffect(() => {
    let timer = setTimeout(() => onClose(), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ToastPortal>
      <motion.div
        initial={{ opacity: 0, x: -240, scale: 0.3 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -240, scale: 0.5 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div
          className={`${styles.wrapper} ${containerTheme} ${
            styles[`${theme}Background`]
          }`}
        >
          <p className={styles.content}>{message}</p>
        </div>
      </motion.div>
    </ToastPortal>
  );
};

export default DoneModal;
