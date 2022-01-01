import { Button, Card, TextField, Typography } from "@material-ui/core";
import React from "react";
import Header from "../components/partials/Header";
import classes from "../styles/login.module.css";
import { makeStyles } from "@material-ui/core";
import { useRef, useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/dist/client/router";

const auth = getAuth();
const db = getFirestore();

const useStyle = makeStyles({
  input: {
    color: "9096B2",

    "&:hover > *": {
      outline: "none",
    },
    "&:focus > *": {
      border: "2px solid red !important",
    },
  },
  errorText: {
    color: "red",
    paddingTop: "15px",
  },
});

const login = () => {
  const style = useStyle();
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputFullNameRef = useRef<HTMLInputElement>(null);

  const [signup, setSignup] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  // WHETHER USER WANT TO  SIGNUP OR LOGIN
  const signupHandler = () => {
    setSignup(!signup);
  };

  // SUBMITING FORM
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const email = inputEmailRef.current?.value;
    const password = inputPasswordRef.current?.value;
    const fullNameRef = inputFullNameRef.current?.value;

    //CREATING NEW USER
    {
      signup &&
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            setDoc(doc(db, "user", user.uid), {
              name: fullNameRef,
              email: email,
            });

            router.push("/");
            inputEmailRef.current.value = "";
            inputPasswordRef.current.value = "";
            inputFullNameRef.current.value = "";
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(true);
          });
    }

    // SIGN IN EXISTING USER

    {
      !signup &&
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            router.push("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            setError(true);
          });
    }
  };

  return (
    <section>
      <Header type={"My Acount"} />
      <div className={classes.container}>
        <Card
          className={`${classes.card} ${signup && classes.signupUserCard} `}
          style={{ boxShadow: "0px 1px 25px rgba(0, 0, 0, 0.1)" }}
        >
          <div className={classes.textBox1}>
            <Typography style={{ marginBottom: "8px" }} variant="h4">
              {!signup ? "Login" : "SignUp"}
            </Typography>
            <Typography variant="body2" style={{ color: "#9096B2" }}>
              Please{" "}
              {!signup
                ? "Login using account detail below."
                : "SignUp by filling details."}
            </Typography>
          </div>
          <form onSubmit={submitHandler} className={classes.form}>
            {signup && (
              <div className={classes.signupUser}>
                <TextField
                  inputRef={inputFullNameRef}
                  type="text"
                  className={`${style.input} ${classes.input}`}
                  variant="outlined"
                  placeholder="Full Name"
                  style={{ marginBottom: "20px" }}
                  required
                ></TextField>
              </div>
            )}
            <TextField
              type="email"
              className={`${style.input} ${classes.input}`}
              variant="outlined"
              placeholder="Email Address"
              style={{ marginBottom: "20px" }}
              inputRef={inputEmailRef}
              required
            ></TextField>
            <TextField
              required
              type="password"
              className={`${style.input} ${classes.input}`}
              variant="outlined"
              placeholder="Password"
              inputRef={inputPasswordRef}
            ></TextField>

            <Typography
              variant="body2"
              style={{ color: "#9096B2", marginTop: "20px" }}
            >
              Forgot your password?
            </Typography>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{
                width: "472px",
                height: "47px",
                textTransform: "capitalize",
                marginTop: "20px",
              }}
            >
              {!signup ? "Sign in" : "Sign Up"}
            </Button>
            {error && (
              <Typography className={style.errorText}>
                Invalid Email or Password ! Try Again.{" "}
              </Typography>
            )}
          </form>
          <Typography
            onClick={signupHandler}
            variant="body2"
            style={{ color: "#9096B2", cursor: "pointer" }}
          >
            {!signup
              ? "Don't have an Account? Create account"
              : "Already a member? Login"}
          </Typography>
        </Card>
      </div>
    </section>
  );
};

export default login;
