"use client";

import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import firebaseAuth from "../lib/firebase/firebaseAuth";
import { userState } from "../recoil/atoms";
import { collection, query, where, getDocs } from "firebase/firestore";
import firestore from "../lib/firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";

const useObserveAuthChange = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [_user, setUser] = useRecoilState(userState);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const q = query(
          collection(firestore, "users"),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setUser({
            uid: data.uid,
            email: data.email,
            displayName: data.displayName,
            date_created: data.date_created,
          });
        });
        router.push("/");
      } else {
        setUser(null);
        router.push("/signin");
      }
    });
  }, []);

  return { _user };
};

export default useObserveAuthChange;
