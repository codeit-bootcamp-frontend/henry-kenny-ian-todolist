"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import Button from "../components/Button/Button";
import styles from "../signin/AuthForm.module.css";
import ThemeContext from "../Contexts/ThemeContext";
import { authFailMessageMap } from "../static/maps";
import NoticeModal from "../components/Modal/NoticeModal";
import Spinner from "../components/Loaders/Spinner";
import signup from "../lib/firebase/signup";
import { useRouter } from "next/navigation";
import signout from "../lib/firebase/signout";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";

const SignupPage = () => {
  const user = useRecoilValue(userState);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
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
    if (user) {
      await signout();
    }
    if (input.displayName === "") {
      setShowFail(true);
      setFailMessage("Enter a nickname!");
      return;
    }
    const { _, error } = await signup(
      input.email,
      input.password,
      input.displayName
    );
    if (error) {
      setShowFail(true);
      setFailMessage(authFailMessageMap[error.code]);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.currentTarget;
    setInput({ ...input, [name]: value });
  };

  return (
    <form className={styles.form} onSubmit={handleSignup} noValidate>
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
      <div className={styles.buttonWrapper}>
        <Button
          buttonType="register"
          disabled={!input.email || !input.password}
        ></Button>
      </div>
      <span className={styles.redirectText}>
        Already a member? <Link href="/signin">Signin</Link>
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
