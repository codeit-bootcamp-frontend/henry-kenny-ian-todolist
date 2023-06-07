"use client";

import React, { useContext, useState } from "react";
import Button from "../components/Button/Button";
import styles from "./AuthForm.module.css";
import ThemeContext from "../Contexts/ThemeContext";
import { authFailMessageMap } from "../static/maps";
import NoticeModal from "../components/Modal/NoticeModal";
import signin from "../lib/firebase/signin";
import Link from "next/link";

const SigninPage = () => {
  const { theme } = useContext(ThemeContext);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [showFail, setShowFail] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const labelClass = `${styles.label} convex-${theme}-md`;
  const inputClass = `${styles.input} concave-${theme}-md`;

  const handleChangeInput = (e) => {
    const { name, value } = e.currentTarget;
    setInput({ ...input, [name]: value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const { _, error } = await signin(input.email, input.password);
    if (error) {
      setShowFail(true);
      setFailMessage(authFailMessageMap[error.code]);
    }
  };

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
        Not a member yet? <Link href="/signup">Register</Link>
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
