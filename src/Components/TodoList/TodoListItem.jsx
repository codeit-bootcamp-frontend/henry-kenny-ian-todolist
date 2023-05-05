import CheckBox from "../Button/CheckBox";
import Button from "../Button/Button";
import styles from "./TodoListItem.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";

const TodoListItem = ({
  id,
  title,
  isComplete,
  onClickCheckBox,
  onClickEdit,
  onClickDelete,
}) => {
  const { theme } = useContext(ThemeContext);
  const textDecoration = isComplete ? "line-through" : "none";
  const textBoxClass =
    theme === "light" ? "concave-light-sm" : "concave-dark-md";
  const handleEdit = () => {
    onClickEdit(id);
  };

  const handleDelete = () => {
    onClickDelete(id);
  };

  const handleClickCheckBox = (id) => {
    onClickCheckBox(id);
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.textBox} ${textBoxClass}`}>
        <CheckBox
          onClick={handleClickCheckBox}
          checked={isComplete}
          itemId={id}
        />
        <div
          title={title}
          className={styles.textWrapper}
          style={{ textDecoration }}
        >
          {title}
        </div>
      </div>
      <Button buttonType="edit" onClick={handleEdit} />
      <Button buttonType="delete" onClick={handleDelete} />
    </div>
  );
};

export default TodoListItem;
