import React, { useState } from "react";
import { firebaseAuth } from "../service/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const SigninPage = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.currentTarget;
    setInput({ ...input, [name]: value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(firebaseAuth, input.email, input.password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn(`${errorCode} = ${errorMessage}`);
      });
  };

  return (
    <form onSubmit={handleSignin}>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        onChange={handleChangeInput}
        type="email"
        value={input.email}
        name="email"
        required
      />
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        onChange={handleChangeInput}
        type="password"
        value={input.password}
        name="password"
        required
      />
      <button type="submit" disabled={!input.email || !input.password}>
        로그인
      </button>
      <Link to="/signup">아직 회원이 아니세요?</Link>
    </form>
  );
};

export default SigninPage;
