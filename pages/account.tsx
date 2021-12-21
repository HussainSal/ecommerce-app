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
import { useAppContext } from "../store/authContext";
import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";

const useStyle = makeStyles({});

const account = () => {
  const style = useStyle();
  const router = useRouter();
  const ctx = useAppContext();
  const auth = getAuth();
  const [editable, setEditable] = useState(false);

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
    <section className={classes.accountSection}>
      <Card className={classes.accountContainer}>
        <Card
          className={classes.profileContainer}
          style={{ overflow: "visible" }}
        >
          <div
            onClick={() => {
              setEditable(!editable);
            }}
            className={classes.editIcon}
          >
            <EditIcon className={classes.mainIcon} style={{ color: "#FFF" }} />
          </div>
          <div className={classes.profileItem}>
            <Typography>Name :</Typography>
            <TextField
              value={ctx.loggedin ? ctx.loggedin.userData.name : "Name"}
              style={{ width: "270px" }}
              disabled
              variant="outlined"
            ></TextField>
          </div>
          <div className={classes.profileItem}>
            <Typography>Email :</Typography>
            <TextField
              value={ctx.loggedin ? ctx.loggedin.userData.email : "Email"}
              style={{ width: "270px" }}
              disabled
              variant="outlined"
            ></TextField>
          </div>
          <div className={classes.profileItem}>
            <Typography>Phone :</Typography>
            <TextField
              value="12345689"
              type="number"
              style={{ width: "270px" }}
              disabled={!editable}
              variant="outlined"
            >
              {/* 123456789 */}
            </TextField>
          </div>
          <div className={classes.profileItem}>
            <Typography>Address :</Typography>
            <TextField
              value="abc street,NY"
              style={{ width: "270px" }}
              disabled={!editable}
              variant="outlined"
            >
              {" "}
            </TextField>
          </div>
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

      <Button
        color="primary"
        variant="contained"
        style={{
          width: "300px",
          textTransform: "capitalize",
          marginBottom: "20px",
          visibility: `${editable ? "visible" : "hidden"}`,
        }}
      >
        Save Changes
      </Button>
    </section>
  );
};

export default account;
