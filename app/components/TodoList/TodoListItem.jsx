import CheckBox from "../Button/CheckBox";
import Button from "../Button/Button";
import styles from "./TodoListItem.module.css";
import { useContext, useState, useEffect } from "react";
import ThemeContext from "../../Contexts/ThemeContext";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence, motion } from "framer-motion";

const TodoListItem = ({
  id,
  title,
  isComplete,
  onClickCheckBox,
  onClickEdit,
  onClickDelete,
}) => {
  const { theme } = useContext(ThemeContext);
  const isMobile = useMediaQuery({ query: "(max-width: 430px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const textDecoration = isComplete ? "line-through" : "none";
  const textBoxClass =
    theme === "light" ? "concave-light-sm" : "concave-dark-md";

  const [showButtons, setShowButtons] = useState(isMobile ? false : true);
  const variants = {
    open: { x: 0, width: "70%" },
    closed: { x: 0, width: "100%" },
    desktop: { x: 0, width: 638 },
  };

  const toggleShowButtonsOnMobile = () => {
    if (!isMobile) return;
    setShowButtons(!showButtons);
  };

  useEffect(() => {
    setShowButtons(!isMobile);
  }, [isMobile]);

  return (
    <div
      className={styles.wrapper}
      style={{ gap: `${isTablet ? (showButtons ? "10px" : "0px") : "23px"}` }}
    >
      <AnimatePresence>
        <motion.div
          animate={isMobile ? (showButtons ? "open" : "closed") : "desktop"}
          variants={variants}
          transition={{ type: "ease" }}
          className={`${styles.textBox} ${textBoxClass} ${styles[showButtons]}`}
          // key="vweoub"
        >
          <CheckBox
            onClick={() => {
              onClickCheckBox(id);
            }}
            checked={isComplete}
            keys="vbouwe"
          />
          <div
            title={title}
            className={styles.textWrapper}
            style={{ textDecoration }}
            onClick={toggleShowButtonsOnMobile}
            key="uitpwe"
          >
            {title}
          </div>
        </motion.div>
        <div
          className={`${styles.dummyItem}`}
          // style={{ display: `${showButtons ? "block" : "none"}` }}
          key="vqeipn"
        ></div>
        {showButtons && (
          <>
            <div className={styles.btnWrapper} key="qwvbip">
              <Button
                buttonType="edit"
                onClick={() => {
                  onClickEdit(id);
                }}
                key="pqmzb"
              />
            </div>
            <div className={styles.btnWrapper} key="qtyiuv">
              <Button
                buttonType="delete"
                onClick={() => {
                  onClickDelete(id);
                }}
                key="csyue"
              />
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TodoListItem;
