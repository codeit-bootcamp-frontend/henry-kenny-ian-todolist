import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAg0osWG9iH6WGvZ2B3JmQq5GLbVeKcKT0",
  authDomain: "todolist-bunny.firebaseapp.com",
  projectId: "todolist-bunny",
  storageBucket: "todolist-bunny.appspot.com",
  messagingSenderId: "420982098046",
  appId: "1:420982098046:web:c6a600e315253cb4a5702f",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firestore = getFirestore(app);
