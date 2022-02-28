import { ThemeProvider } from "@material-ui/styles";
import "../styles/globals.css";
import theme from "../theme";
import Layout from "../components/partials/Layout";
import { initializeApp } from "firebase/app";
import { AppWrapper } from "../store/authContext";
import Authcontext from "../store/authContext";

// import { getFirestore } from "firebase/firestore";
const firebaseApp = initializeApp({
  apiKey: "AIzaSyCTR6jPCrHSJXxUaOmfsq6hXScTthW3CG0",
  authDomain: "ecommercetest-f9107.firebaseapp.com",
  projectId: "ecommercetest-f9107",
  storageBucket: "ecommercetest-f9107.appspot.com",
  messagingSenderId: "140733804164",
  appId: "1:140733804164:web:ba6b787df84a5baba81cd1",
});

// const db = getFirestore();

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </ThemeProvider>
    </AppWrapper>
  );
}

export default MyApp;
