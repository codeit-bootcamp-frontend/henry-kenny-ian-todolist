import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth, firestore } from "../service/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import Button from "../Components/Button/Button";
import { TODO_BOX_STYLE } from "../Components/TodoList/TodoListItem";
import styles from "./AuthForm.module.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    displayName: "",
    password: "",
  });

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
        <label htmlFor="display-name">NICKNAME</label>
        <input
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
        <label htmlFor="email">EMAIL</label>
        <input
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
        <label htmlFor="password">PASSWORD</label>
        <input
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
