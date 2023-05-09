import React, { useContext, useState } from "react";
import { firebaseAuth } from "../service/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import Button from "../Components/Button/Button";
import Spinner from "../Components/Loaders/Spinner";
import styles from "./AuthForm.module.css";
import { ThemeContext } from "../Contexts/ThemeContext";
import { authFailMessageMap } from "../static/maps";
import NoticeModal from "../Components/Modal/NoticeModal";

const SigninPage = () => {
  const { theme } = useContext(ThemeContext);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const labelClass = `${styles.label} convex-${theme}-md`;
  const inputClass = `${styles.input} concave-${theme}-md`;

  const handleChangeInput = (e) => {
    const { name, value } = e.currentTarget;
    setInput({ ...input, [name]: value });
  };

  const handleSignin = (e) => {
    setLoading(true);
    e.preventDefault();
    signInWithEmailAndPassword(firebaseAuth, input.email, input.password).catch(
      (error) => {
        setShowFail(true);
        setLoading(false);
        setFailMessage(authFailMessageMap[error.code]);
      }
    );
  };
  if (loading)
    return (
      <div className={styles.spinnerWrapper}>
        <Spinner />
      </div>
    );
  return (
    <form className={styles.form} onSubmit={handleSignin}>
      <div className={`${styles.inputWrapper}`}>
        <label className={labelClass} htmlFor="email">
          EMAIL
        </label>
        <input
          className={inputClass}
          id="email"
          onChange={handleChangeInput}
          type="email"
          value={input.email}
          name="email"
          placeholder="Enter your Email..."
          required
        />
      </div>
      <div className={styles.inputWrapper}>
        <label className={labelClass} htmlFor="password">
          PASSWORD
        </label>
        <input
          className={inputClass}
          id="password"
          onChange={handleChangeInput}
          type="password"
          value={input.password}
          name="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          buttonType="login"
          disabled={!input.email || !input.password}
        ></Button>
      </div>
      <span className={styles.redirectText}>
        Not a member yet? <Link to="/signup">Register</Link>
      </span>
      {showFail && (
        <NoticeModal
          onClose={() => {
            setShowFail(false);
          }}
          message={failMessage}
        />
      )}
    </form>
  );
};

export default SigninPage;
