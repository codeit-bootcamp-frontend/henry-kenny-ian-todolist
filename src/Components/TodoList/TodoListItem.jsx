import { useState } from "react";
import CheckBox from "../Button/CheckBox";
import Button from "../Button/Button";

const BUTTON_STYLES = {
  width: "80px",
  height: "80px",
  borderRadius: "10px",
  background: "linear-gradient(145deg, #d4d4d9, #fdfdff)",
  boxShadow: "9px 9px 18px #cdcdd2, -9px -9px 18px #ffffff",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

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
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
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
    <div style={TODO_LIST_ITEM_STYLE}>
      <div style={TODO_BOX_STYLE}>
        <CheckBox
          onClick={handleClickCheckBox}
          checked={isComplete}
          itemId={id}
        />
        <div title={title} style={{ ...INPUT_TEXT, textDecoration }}>
          {title}
        </div>
      </div>
      <Button buttonType="edit" onClick={handleEdit} />
      <Button buttonType="delete" onClick={handleDelete} />
    </div>
  );
};

export default TodoListItem;
