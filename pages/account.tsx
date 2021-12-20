import React from "react";
import classes from "../styles/account.module.css";
import { Button, Card, TextField, Typography } from "@material-ui/core";
import { userinfo } from "../assets/data/account";
import { makeStyles } from "@material-ui/core";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/dist/client/router";

const useStyle = makeStyles({});

const account = () => {
  const style = useStyle();
  const router = useRouter();

  const auth = getAuth();

  const signoutHandler = () => {
    signOut(auth)
      .then(() => {
        console.log("signout succesfully");
        router.push("./");
      })
      .catch((error) => {
        console.log("signout failed");
      });
  };

  return (
    <section>
      <Card className={classes.accountContainer}>
        <Card className={classes.profileContainer}>
          {userinfo.map((cur) => {
            return (
              <div className={classes.profileItem}>
                <Typography>{cur.heading} :</Typography>
                <TextField
                  value={cur.info}
                  style={{ width: "270px" }}
                  disabled
                  variant="outlined"
                >
                  {cur.info}
                </TextField>
              </div>
            );
          })}
        </Card>
        <div>
          <Card className={classes.passwordContainer}>
            <TextField
              value="New Password"
              style={{}}
              disabled
              variant="outlined"
            ></TextField>
            <TextField
              value="Confirm Password"
              style={{}}
              disabled
              variant="outlined"
            ></TextField>
            <Button color="primary" variant="contained">
              change password
            </Button>
          </Card>
          <Button
            onClick={signoutHandler}
            color="primary"
            variant="contained"
            style={{
              width: "300px",
              textTransform: "capitalize",
              marginTop: "70px",
            }}
          >
            Sign out
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default account;
