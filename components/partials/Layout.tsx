import React, { Fragment } from "react";
import classes from "./Layout.module.css";
import { Box, Button, Typography } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { FormControl, Link } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { useState, useRef } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  AddToCart,
  Heart,
  Login,
  Search,
  Instagram,
  Facebook,
  Twitter,
} from "../icons/icon";
import { footerData1 } from "./FooterData";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";

const useStyle = makeStyles({
  navigationItem: {
    lineHeight: "16px",
    color: "#F1F1F1",
    textDecoration: "none",
    textAlign: "end",
  },
  link: {
    textDecoration: "none",
    color: "#F1F1F1",
    cursor: "pointer",
  },
  link2: {
    textDecoration: "none",
    color: "#0D0E43",
    cursor: "pointer",
    textTransform: "capitalize",

    "&:hover": {
      color: "#FB2E86",
    },
  },
  footerText1: {
    color: "#8A8FB9",
  },
});

const navItem = ["home", "pages", "products", "shop", "contact"];

const Layout = ({ children, props }) => {
  const style = useStyle();
  const [currency, setcurrency] = useState("usd");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleChange = (event) => {
    setcurrency(event.target.value);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const searchedData = inputRef.current?.value.toLocaleLowerCase();
    router.push(`/${searchedData}`);
    inputRef.current.value = "";
  };

  return (
    <Fragment>
      <nav className={classes.navigationComplete}>
        <div className={classes.navigation}>
          <div className={classes.navBox}>
            <Box sx={{ minWidth: 60 }}>
              <FormControl>
                <Select
                  id="demo-simple-select"
                  value={currency}
                  label="Age"
                  onChange={handleChange}
                  disableUnderline
                >
                  {currency === "usd" ? (
                    <MenuItem value={currency}>
                      <Typography
                        className={style.navigationItem}
                        variant="subtitle1"
                      >
                        USD
                      </Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem value="usd">USD</MenuItem>
                  )}
                  <MenuItem value="inr">
                    {" "}
                    <Typography
                      className={style.navigationItem}
                      variant="subtitle1"
                    >
                      INR
                    </Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Link className={`${classes.link} ${style.link}`}>
              <Typography className={style.navigationItem} variant="subtitle1">
                Login
              </Typography>
              <Login />
            </Link>
            <Link className={`${classes.link} ${style.link}`}>
              <Typography className={style.navigationItem} variant="subtitle1">
                Wishlist
              </Typography>
              <Heart />
            </Link>
            <Typography className={style.navigationItem} variant="subtitle1">
              <AddToCart />
            </Typography>
          </div>
        </div>
        <div className={classes.navigation2}>
          <Typography style={{ color: "#0D0E43" }} variant="h4">
            Hekto
          </Typography>
          <div className={classes.linkBox2}>
            {navItem.map((cur, i) => {
              return (
                <NextLink href={cur === "home" ? "/" : cur} key={i}>
                  <Typography className={style.link2}>{cur}</Typography>
                </NextLink>
              );
            })}
          </div>
          <form onSubmit={submitHandler} className={classes.searchBox}>
            <input ref={inputRef} className={classes.input} required />
            <div className={classes.searchIcon}>
              <Button
                style={{
                  borderRadius: "0",
                  backgroundColor: "#fb2e86",
                  height: "40px",
                  minWidth: "45px",
                }}
              >
                <Search />
              </Button>
            </div>
          </form>
        </div>
      </nav>
      {children}

      <footer className={classes.footerBox}>
        <div className={classes.footer1}>
          <div className={classes.slice1}>
            <Typography variant="h3">Hekto</Typography>

            <Typography variant="subtitle1" className={style.footerText1}>
              Contact Info
            </Typography>
            <Typography
              variant="subtitle1"
              className={style.footerText1}
              style={{ marginTop: "10px", textTransform: "capitalize" }}
            >
              17 prince road,london,greater london NW1 8JR,UK
            </Typography>
          </div>

          {footerData1.map((cur, i) => {
            return (
              <div key={i} className={classes.slice2}>
                <Typography
                  style={{ textTransform: "capitalize" }}
                  variant="subtitle2"
                >
                  {cur.name}
                </Typography>
                <div className={classes.textContainer}>
                  {cur.item.map((curr, i) => {
                    return (
                      <Link
                        key={i}
                        style={{
                          // textDecoration: "none",
                          cursor: "pointer",
                          color: "#8A8FB9",
                          marginBottom: "21px",
                          textTransform: "capitalize",
                        }}
                        variant="subtitle1"
                      >
                        {curr}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className={classes.footer2}>
          <Typography variant="subtitle1" style={{ color: "#9DA0AE" }}>
            ⒸWebecy - All Rights Reserved
          </Typography>
          <div className={classes.socialBox}>
            <Facebook />
            <Instagram />
            <Twitter />
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Layout;
