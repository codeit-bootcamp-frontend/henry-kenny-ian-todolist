import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth, firestore } from "../service/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import Button from "../Components/Button/Button";
import { TODO_BOX_STYLE } from "../Components/TodoList/TodoListItem";

const LABEL = {
  height: "80px",
  width: "270px",
  background: "#EDEEF2",
  boxShadow: "1px 1px 9px #a8a8a8, -1px -1px 9px #ffffff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "#575F6B",
  borderRadius: "40px 0 0 40px",
};

const INPUT = {
  background: "transparent",
  width: "100%",
  fontSize: "20px",
  textIndent: "28px",
  color: "#575F6B",
};

const CHANGE_SIGNIN = {
  fontSize: "20px",
  color: "#767676",
  fontWeight: "400",
  marginTop: "31px",
};

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
    <form
      onSubmit={handleSignup}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ ...TODO_BOX_STYLE, marginBottom: "40px", width: "797px" }}>
        <label htmlFor="display-name" style={LABEL}>
          NICKNAME
        </label>
        <input
          id="display-name"
          onChange={handleChangeInput}
          type="text"
          value={input.displayName}
          name="displayName"
          style={INPUT}
          placeholder="Enter your nickname"
          required
        />
      </div>
      <div style={{ ...TODO_BOX_STYLE, marginBottom: "40px", width: "797px" }}>
        <label htmlFor="email" style={LABEL}>
          EMAIL
        </label>
        <input
          id="email"
          onChange={handleChangeInput}
          type="email"
          value={input.email}
          name="email"
          style={INPUT}
          placeholder="Enter your Email..."
          required
        />
      </div>
      <div style={{ ...TODO_BOX_STYLE, width: "797px" }}>
        <label htmlFor="password" style={LABEL}>
          PASSWORD
        </label>
        <input
          id="password"
          onChange={handleChangeInput}
          type="password"
          value={input.password}
          name="password"
          placeholder="Enter your password"
          required
          style={INPUT}
        />
      </div>
      <Button
        buttonType="register"
        disabled={!input.email || !input.password}
      ></Button>
      <span style={CHANGE_SIGNIN}>
        Already a member? <Link to="/signin">Signin</Link>
      </span>
    </form>
  );
};

export default SignupPage;
