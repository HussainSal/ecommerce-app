import React, { useEffect } from "react";
import classes from "../styles/account.module.css";
import { Button, Card, TextField, Typography } from "@material-ui/core";
import { userinfo } from "../assets/data/account";
import { makeStyles } from "@material-ui/core";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/dist/client/router";
import { useAppContext } from "../store/authContext";
import EditIcon from "@material-ui/icons/Edit";
import { useState, useRef } from "react";
import { setDoc, doc, getFirestore } from "firebase/firestore";
// import { item } from "./products/[searchResults]/[productDetail]";

const useStyle = makeStyles({});

const db = getFirestore();

// console.log(item);

const account = () => {
  const style = useStyle();
  const router = useRouter();
  const ctx = useAppContext();
  const auth = getAuth();
  const [editable, setEditable] = useState(false);
  const [phonenumber, setPhoneumber] = useState("");
  const [address, setAddress] = useState("");

  console.log(ctx.loggedin);

  //  SENDING UPDATED PHONENUMBER AND ADDRESS

  const saveHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const userPhNumber = phonenumber;
    const userAddress = address;
    const userName = ctx.loggedin && ctx.loggedin.userData.name;
    const userEmail = ctx.loggedin && ctx.loggedin.userData.email;
    ctx.setReset((prvState) => prvState + 1);
    {
      ctx.loggedin &&
        setDoc(doc(db, "user", ctx.loggedin.userId), {
          name: userName,
          email: userEmail,
          phonenumber: userPhNumber || "",
          address: userAddress || "",
          cartItems: ctx.loggedin.userData.cartItems
            ? ctx.loggedin.userData.cartItems
            : "",
          wishlist: ctx.loggedin.userData.wishlist
            ? ctx.loggedin.userData.wishlist
            : "",
        });

      setEditable(false);
    }
  };
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

  useEffect(() => {
    setAddress(ctx.loggedin && ctx.loggedin.userData.address);
    setPhoneumber(ctx.loggedin && ctx.loggedin.userData.phonenumber);
  }, [ctx.loggedin]);

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
          <form className={classes.form} onSubmit={saveHandler}>
            <div className={classes.profileItem}>
              <Typography>Name :</Typography>
              <TextField
                value={ctx.loggedin ? ctx.loggedin.userData.name : "Name"}
                style={{ width: "220px" }}
                disabled
                variant="outlined"
              ></TextField>
            </div>
            <div className={classes.profileItem}>
              <Typography>Email :</Typography>
              <TextField
                value={ctx.loggedin ? ctx.loggedin.userData.email : "Email"}
                style={{ width: "220px" }}
                disabled
                variant="outlined"
              ></TextField>
            </div>
            <div className={classes.profileItem}>
              <Typography>Phone :</Typography>
              <TextField
                type="number"
                style={{ width: "220px" }}
                disabled={!editable}
                onChange={(e) => {
                  setPhoneumber(e.target.value);
                }}
                value={phonenumber}
                variant="outlined"
              ></TextField>
            </div>
            <div className={classes.profileItem}>
              <Typography>Address :</Typography>
              <TextField
                id="address"
                style={{ width: "220px" }}
                disabled={!editable}
                variant="outlined"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}
              ></TextField>
            </div>

            <Button
              type="submit"
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
            <Button
              // type="submit"
              onClick={() => setEditable(false)}
              color="primary"
              variant="contained"
              style={{
                width: "300px",
                textTransform: "capitalize",
                // marginBottom: "20px",
                visibility: `${editable ? "visible" : "hidden"}`,
              }}
            >
              Cancel
            </Button>
          </form>
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
