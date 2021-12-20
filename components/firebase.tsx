// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  //   createUserWithEmailAndPassword,
  //   signOut,
  //   onAuthStateChanged,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaMMsr7u19MaATgRjV5SdtnjZ9wc0EPZU",
  authDomain: "ecommerce-app-224dd.firebaseapp.com",
  projectId: "ecommerce-app-224dd",
  storageBucket: "ecommerce-app-224dd.appspot.com",
  messagingSenderId: "900700198751",
  appId: "1:900700198751:web:9191b9e9a501d3edfd88ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
