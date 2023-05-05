import { useState, useEffect, useContext } from "react";
import "./App.css";
import { firebaseAuth, firestore } from "./service/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { AppRouter } from "./Routers/AppRouter";
import Spinner from "./Components/Loaders/Spinner";
import { ThemeContext } from "./Contexts/ThemeContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [init, setInit] = useState(false);
  const { theme } = useContext(ThemeContext);

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
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
      setTimeout(() => {
        setInit(true);
      }, 1000);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userInfo={userInfo} />
      ) : (
        <>
          <div
            className={theme}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Spinner />
          </div>
        </>
      )}
    </>
  );
}

export default App;
