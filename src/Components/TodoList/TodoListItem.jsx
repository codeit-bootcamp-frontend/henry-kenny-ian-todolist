import CheckBox from "../Button/CheckBox";
import Button from "../Button/Button";
import styles from "./TodoListItem.module.css";

export const TODO_BOX_STYLE = {
  height: "80px",
  width: "638px",
  position: "relative",
  borderRadius: "40px",
  background: "#ececf1",
  boxShadow: "inset 5px 5px 10px #d2d2d6,inset -5px -5px 10px #ffffff",
  display: "flex",
  alignItems: "center",
};

const TODO_LIST_ITEM_STYLE = {
  display: "flex",
  gap: "23px",
};

const INPUT_TEXT = {
  textIndent: "105px",
  fontSize: "24px",
  color: "#767676",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "95%",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  lineHeight: "2em",
  cursor: "inherit",
  whiteSpace: "wrap",
  userSelect: "none",
};

const TodoListItem = ({
  id,
  title,
  isComplete,
  onClickCheckBox,
  onClickEdit,
  onClickDelete,
}) => {
  const textDecoration = isComplete ? "line-through" : "none";

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
      <div className={styles.textBox}>
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
