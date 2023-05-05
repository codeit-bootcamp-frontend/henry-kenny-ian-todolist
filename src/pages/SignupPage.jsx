import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth, firestore } from "../service/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import Button from "../Components/Button/Button";
import styles from "./AuthForm.module.css";
import { ThemeContext } from "../Contexts/ThemeContext";
import { authFailMessageMap } from "../static/maps";
import NoticeModal from "../Components/Modal/NoticeModal";
import Spinner from "../Components/Loaders/Spinner";

const SignupPage = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const [input, setInput] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const labelClass = `${styles.label} convex-${theme}-md`;
  const inputClass = `${styles.input} concave-${theme}-md`;

  const handleSignup = async (e) => {
    e.preventDefault();
    if (input.displayName === "") {
      setShowFail(true);
      setFailMessage("Enter a nickname!");
      return;
    }
    setIsLoading(true);
    await createUserWithEmailAndPassword(
      firebaseAuth,
      input.email,
      input.password
    )
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(firestore, "users", user.uid), {
          uid: user.uid,
          ...input,
        });
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        setShowFail(true);
        setFailMessage(authFailMessageMap[error.code]);
      });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.currentTarget;
    setInput({ ...input, [name]: value });
  };

  if (isLoading)
    return (
      <div className={styles.spinnerWrapper}>
        <Spinner />
      </div>
    );
  return (
    <form onSubmit={handleSignup} noValidate>
      <div className={styles.inputWrapper}>
        <label className={labelClass} htmlFor="display-name">
          NICKNAME
        </label>
        <input
          className={inputClass}
          id="display-name"
          onChange={handleChangeInput}
          type="text"
          value={input.displayName}
          name="displayName"
          placeholder="Enter your nickname"
          required
        />
      </div>
      <div className={styles.inputWrapper}>
        <label className={labelClass} htmlFor="email">
          EMAIL
        </label>
        <input
          id="email"
          className={inputClass}
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
      <Button
        buttonType="register"
        disabled={!input.email || !input.password}
      ></Button>
      <span className={styles.redirectText}>
        Already a member? <Link to="/signin">Signin</Link>
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

export default SignupPage;
