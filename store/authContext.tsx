import React, { useState } from "react";
import {
  query,
  collection,
  where,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/dist/client/router";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCTR6jPCrHSJXxUaOmfsq6hXScTthW3CG0",
  authDomain: "ecommercetest-f9107.firebaseapp.com",
  projectId: "ecommercetest-f9107",
  storageBucket: "ecommercetest-f9107.appspot.com",
  messagingSenderId: "140733804164",
  appId: "1:140733804164:web:ba6b787df84a5baba81cd1",
});

const db = getFirestore();
const auth = getAuth();

const AppContext = createContext({
  loggedin: null,
  loading: true,
  reset: null,
  setReset: null,
  currency: true,
  setCurrency: null,
  setLang: null,
  lang: null,
});

export function AppWrapper({ children }) {
  const [loggedin, setLoggedin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reset, setReset] = useState(0);
  const [currency, setCurrency] = useState(true);
  const router = useRouter();
  const [lang, setLang] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        //  ENSURING THAT USER DOES NOT GO ON LOGIN PAGE IF HE IS LOGGED IN
        router.pathname == "/login" && router.push("/");
        // setReset(Math.random)

        // GETTIN USER DATA i.e HIS INFORMATION
        const gettingData = async () => {
          const q = query(
            collection(db, "user"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setLoggedin({
              userData: doc.data(),
              userId: doc.id,
            });
            setLoading(false);
          });
        };
        gettingData();
      } else {
        setLoggedin(null);
        setLoading(false);
      }
    });
  }, [reset]);

  return (
    <AppContext.Provider
      value={{
        loggedin,
        loading,
        reset,
        setReset,
        currency,
        setCurrency,
        setLang,
        lang,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
