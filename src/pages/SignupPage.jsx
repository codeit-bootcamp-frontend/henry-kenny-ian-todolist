import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth, firestore } from "../service/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import Button from "../Components/Button/Button";
import styles from "./AuthForm.module.css";
import { ThemeContext } from "../Contexts/ThemeContext";

const SignupPage = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const labelClass = `${styles.label} convex-${theme}-md`;
  const inputClass = `${styles.input} concave-${theme}-md`;

  const handleSignup = async (e) => {
    e.preventDefault();
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
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.currentTarget;
    setInput({ ...input, [name]: value });
  };

  return (
    <form onSubmit={handleSignup}>
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
    </form>
  );
};

export default SignupPage;
