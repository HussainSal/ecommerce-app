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
import { useAppContext } from "../../store/authContext";
import Loading from "./Loading";

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

const navItem = ["home", "pages", "products", "about", "contact"];

const Layout = ({ children }) => {
  const style = useStyle();
  const ctx = useAppContext();
  const [currency, setcurrency] = useState("usd");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleChange = (event) => {
    setcurrency(event.target.value);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const searchedData = inputRef.current?.value.toLocaleLowerCase();
    router.push(`/products/${searchedData}`);
    inputRef.current.value = "";
  };

  // taking out every item only one time from ctx

  let counts = {};
  let data = ctx.loggedin && ctx.loggedin.userData.cartItems;

  function count_duplicate(a) {
    if (a != null) {
      for (let i = 0; i < a.length; i++) {
        if (counts[a[i]]) {
          counts[a[i]] += 1;
        } else {
          counts[a[i]] = 1;
        }
      }
    }
  }
  count_duplicate(data);

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
                      {(ctx.setCurrency = true)}
                    </MenuItem>
                  ) : (
                    <MenuItem value="usd">USD</MenuItem>
                  )}
                  <MenuItem value="inr">
                    <Typography
                      className={style.navigationItem}
                      variant="subtitle1"
                    >
                      INR
                    </Typography>
                    {(ctx.setCurrency = false)}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Link className={`${classes.link} ${style.link}`}>
              <NextLink href={`${ctx.loggedin ? "/account" : "/login"}`}>
                <Typography
                  className={style.navigationItem}
                  variant="subtitle1"
                >
                  {ctx.loading ? (
                    <Loading />
                  ) : ctx.loggedin ? (
                    "Account"
                  ) : (
                    "login"
                  )}
                </Typography>
              </NextLink>
              {!ctx.loading && <Login />}
            </Link>
            <NextLink href={"/wishlist"}>
              <Link className={`${classes.link} ${style.link}`}>
                <Typography
                  className={style.navigationItem}
                  variant="subtitle1"
                >
                  Wishlist
                </Typography>
                <Heart />
              </Link>
            </NextLink>
            <NextLink href={"/shopingcart"}>
              <Typography
                style={{ cursor: "pointer" }}
                className={style.navigationItem}
                variant="subtitle1"
              >
                <AddToCart />
              </Typography>
            </NextLink>
            {ctx.loggedin &&
              ctx.loggedin.userData.cartItems &&
              ctx.loggedin.userData.cartItems.length > 0 && (
                <div className={classes.cartItems}>
                  <Typography
                    className={classes.cartItemsText}
                    style={{ color: "#FFF", fontSize: "14px" }}
                  >
                    {ctx.loggedin &&
                      Object.keys(counts).length > 0 &&
                      Object.keys(counts).length}
                  </Typography>
                </div>
              )}
          </div>
        </div>
        <div className={classes.navigation2}>
          <NextLink href={"/"}>
            <Typography
              style={{ color: "#0D0E43", cursor: "pointer" }}
              variant="h4"
            >
              Hekto
            </Typography>
          </NextLink>
          <div className={classes.linkBox2}>
            {navItem.map((cur, i) => {
              return (
                <NextLink href={cur === "home" ? "/" : `/${cur}`} key={i}>
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
