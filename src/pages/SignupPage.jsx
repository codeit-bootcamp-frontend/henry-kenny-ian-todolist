import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, firestore } from "../service/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

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
        await addDoc(collection(firestore, "users"), {
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
      <label htmlFor="display-name">닉네임</label>
      <input
        id="display-name"
        onChange={handleChangeInput}
        type="text"
        value={input.displayName}
        name="displayName"
        required
      />
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
      <button
        type="submit"
        disabled={!input.email || !input.password || !input.displayName}
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupPage;
