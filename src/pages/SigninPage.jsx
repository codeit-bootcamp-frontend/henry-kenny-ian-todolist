import React, { useState } from "react";
import { firebaseAuth } from "../service/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { TODO_BOX_STYLE } from "../Components/TodoList/TodoListItem";
import Button from "../Components/Button/Button";

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

const LOGIN_BUTTON = {
  width: "300px",
  height: "80px",
  margin: "0 auto",
  filter:
    "drop-shadow(-4px -4px 20px #FFFFFF) drop-shadow(3px 3px 20px rgba(36, 65, 93, 0.302))",
  background: "linear-gradient(309.34deg, #F2F3F6 -13.68%, #E5E6EC 171.92%)",
  border: "none",
  borderRadius: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "46px",
};

const CHANGE_SIGNUP = {
  fontSize: "20px",
  color: "#767676",
  fontWeight: "400",
  marginTop: "31px",
};

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
    <form
      onSubmit={handleSignin}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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
        buttonType="login"
        disabled={!input.email || !input.password}
      ></Button>
      <span style={CHANGE_SIGNUP}>
        Not a member yet? <Link to="/signup">Register</Link>
      </span>
    </form>
  );
};

export default SigninPage;
