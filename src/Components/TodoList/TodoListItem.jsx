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

const TODO_BOX_STYLE = {
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

const TodoListItem = ({ id, title, isComplete, onClickCheckBox }) => {
  const handleEdit = () => {};

  const handleDelete = () => {};

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
        <div
          style={{ textIndent: "105px", fontSize: "24px", color: "#767676" }}
        >
          {title}
        </div>
      </div>
      <Button
        src="assets/pencil.png"
        onClick={handleEdit}
        style={BUTTON_STYLES}
        type="edit"
      />
      <Button
        src="assets/delete.png"
        onClick={handleDelete}
        style={BUTTON_STYLES}
        type="delete"
      />
    </div>
  );
};

export default TodoListItem;
