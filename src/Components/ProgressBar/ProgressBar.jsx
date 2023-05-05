import { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ progress }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${styles.container} concave-${theme}-sm`}>
      <div
        className={`${styles.status}`}
        style={{ width: `${progress * 100}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
