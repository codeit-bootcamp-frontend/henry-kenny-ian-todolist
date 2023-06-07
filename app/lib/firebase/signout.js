import firebaseAuth from "./firebaseAuth";

const signout = async () => {
  let result = null,
    error = null;
  try {
    result = await firebaseAuth.signOut();
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export default signout;
