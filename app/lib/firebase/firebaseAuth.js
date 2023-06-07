import { getAuth } from "firebase/auth";
import app from "./firebaseApp";

const firebaseAuth = getAuth(app);

export default firebaseAuth;
