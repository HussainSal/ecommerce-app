import { ClassNames } from "@emotion/react";
import { Button, Card, TextField, Typography } from "@material-ui/core";
import React from "react";
import Header from "../components/partials/Header";
import classes from "../styles/login.module.css";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  input: {
    color: "9096B2",

    "&:hover > *": {
      border: "none",
      outline: "none",
    },
    "&:focus > *": {
      borderRadius: "none",
    },
  },
});

const login = () => {
  const style = useStyle();

  return (
    <section>
      <Header type={"My Acount"} />
      <div className={classes.container}>
        <Card
          className={classes.card}
          style={{ boxShadow: "0px 1px 25px rgba(0, 0, 0, 0.1)" }}
        >
          <div className={classes.textBox1}>
            <Typography style={{ marginBottom: "8px" }} variant="h4">
              Login
            </Typography>
            <Typography variant="body2" style={{ color: "#9096B2" }}>
              Please login using account detail bellow.
            </Typography>
          </div>
          <form className={classes.form}>
            <TextField
              type="email"
              className={`${style.input} ${classes.input}`}
              variant="outlined"
              placeholder="Email Address"
              style={{ marginBottom: "23px" }}
            ></TextField>
            <TextField
              type="password"
              className={`${style.input} ${classes.input}`}
              variant="outlined"
              placeholder="Password"
            ></TextField>

            <Typography
              variant="body2"
              style={{ color: "#9096B2", marginTop: "20px" }}
            >
              Forgot your password?
            </Typography>
            <Button
              color="primary"
              variant="contained"
              style={{
                width: "472px",
                height: "47px",
                textTransform: "capitalize",
                marginTop: "23px",
              }}
            >
              sign in
            </Button>
          </form>
          <Typography variant="body2" style={{ color: "#9096B2" }}>
            Don’t have an Account? Create account
          </Typography>
        </Card>
      </div>
    </section>
  );
};

export default login;
