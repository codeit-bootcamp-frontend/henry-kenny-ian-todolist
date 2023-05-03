import { useState, useEffect } from "react";
import "./App.css";
import { firebaseAuth, firestore } from "./service/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { AppRouter } from "./Routers/AppRouter";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const q = query(
          collection(firestore, "users"),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setUserInfo({
            uid: data.uid,
            email: data.email,
            displayName: data.displayName,
            date_created: data.date_created,
          });
        });
        setIsLoggedIn(true);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userInfo={userInfo} />
      ) : (
        "로딩중..."
      )}
    </>
  );
}

export default App;
