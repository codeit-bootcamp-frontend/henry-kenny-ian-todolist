import { getFirestore } from "firebase/firestore";
import app from "./firebaseApp";

const firestore = getFirestore(app);

export default firestore;
