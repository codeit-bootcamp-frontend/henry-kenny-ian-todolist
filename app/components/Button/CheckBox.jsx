import { useContext } from "react";
import ThemeContext from "../../Contexts/ThemeContext";
import styles from "./CheckBox.module.css";

const CheckBox = ({ checked, onClick, itemId }) => {
  const { theme } = useContext(ThemeContext);
  const classPrefix = checked ? "concave" : "convex";
  const checkboxClass =
    theme === "light" ? `${classPrefix}-light-sm` : `${classPrefix}-dark-sm`;
  return (
    <button
      className={`${styles.checkbox} ${checkboxClass} ${theme}`}
      onClick={() => {
        onClick(itemId);
      }}
    >
      {checked && (
        <div className={styles.imgContainer}>
          <img
            src={
              theme === "light"
                ? "assets/checkmark.png"
                : "assets/checkmark-dark.png"
            }
            alt="check mark"
            className={styles.img}
          />
        </div>
      )}
    </button>
  );
};

export default CheckBox;
