import firebaseAuth from "./firebaseAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
const signIn = async (email, password) => {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export default signIn;
