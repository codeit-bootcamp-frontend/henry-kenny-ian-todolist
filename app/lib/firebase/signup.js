import firebaseAuth from "./firebaseAuth";
import firestore from "./firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
const signUp = async (email, password, displayName) => {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user = result.user;
    setDoc(doc(firestore, "users", user.uid), {
      uid: user.uid,
      email,
      password,
      displayName,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export default signUp;
