import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import Header from "../../../components/partials/Header";
import classes from "../../../styles/searchResult.module.css";
import { Select, MenuItem } from "@material-ui/core";
import { useState } from "react";
import Image from "next/image";
import { allData } from "../../../assets/data/allData";
import { Card } from "@material-ui/core";
import {
  Cart,
  Favourite,
  Zoomin,
  RatingStar,
  AddToCart,
  Heart,
} from "../../../components/icons/icon";
import { useRouter } from "next/dist/client/router";
import { Pagination } from "@mui/material";
import NextLink from "next/link";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import { useAppContext } from "../../../store/authContext";
import classes2 from "../../../styles/index.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

const searchResults = (props) => {
  const [change, setChange] = useState("Best Match");
  const db = getFirestore();
  const ctx = useAppContext();
  const [takeToCart, setTakeToCart] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const [userWishlist, setUserWishlist] = useState([]);

  useEffect(() => {
    ctx.loggedin && setUserCart(ctx.loggedin.userData.cartItems);
    ctx.loggedin && setUserWishlist(ctx.loggedin.userData.wishlist);
  }, [ctx.loggedin]);

  const handleChange = (event) => {
    setChange(event.target.value);
  };
  const [page, setPage] = React.useState(1);

  const pageHandleChange = (event, value) => {
    setPage(value);

    document
      .getElementById("paginationTop")
      .scrollIntoView({ behavior: "smooth" });
  };

  const router = useRouter();

  let searchedItem = router.query.searchResults;
  console.log(searchedItem);

  const stars = [1, 2, 3, 4, 5];

  const filteredData = allData.filter((item) =>
    item.type.includes(`${searchedItem}`)
  );

  const takeToProductDetail = (id: number) => {
    router.push(`${searchedItem}/${id}`);
  };

  // ADDING ITEM TO CART
  const itemToCart = (id: number) => {
    if (!ctx.loggedin) {
      alert("Please login / signup to use this feature");
      return;
    }

    if (
      ctx.loggedin.userData.cartItems &&
      ctx.loggedin.userData.cartItems.includes(id)
    ) {
      const updatedArray = ctx.loggedin.userData.cartItems.filter((item) => {
        return item != id;
      });
      setUserCart(updatedArray);
      updateDoc(doc(db, "user", ctx.loggedin.userId), {
        cartItems: updatedArray,
      });
    } else {
      setUserCart((prvState) => (prvState ? [...prvState, id] : [id]));
      updateDoc(doc(db, "user", ctx.loggedin.userId), {
        cartItems: ctx.loggedin.userData.cartItems
          ? [...ctx.loggedin.userData.cartItems, id]
          : [id],
      });
    }

    ctx.setReset((prvState) => prvState + 1);
  };

  //ADDING ITEM TO WISHLIST
  const itemToWishlist = (id: number) => {
    if (!ctx.loggedin) {
      alert("Please login / signup to use this feature");
      return;
    }

    if (
      ctx.loggedin.userData.wishlist &&
      ctx.loggedin.userData.wishlist.includes(id)
    ) {
      const updatedWishlist = ctx.loggedin.userData.wishlist.filter((item) => {
        return item != id;
      });
      setUserWishlist(updatedWishlist);
      updateDoc(doc(db, "user", ctx.loggedin.userId), {
        wishlist: updatedWishlist,
      });
    } else {
      setUserWishlist((prvState) => (prvState ? [...prvState, id] : [id]));
      updateDoc(doc(db, "user", ctx.loggedin.userId), {
        wishlist: ctx.loggedin.userData.wishlist
          ? [...ctx.loggedin.userData.wishlist, id]
          : [id],
      });
    }

    ctx.setReset((prvState) => prvState + 1);
  };

  return (
    <div>
      <Header type={"Shop List"} />

      <div id="paginationTop" className={classes.searchResultContainer}>
        <div className={classes.searchResultBox}>
          <div className={classes.searchResultHeading}>
            <Typography
              variant="subtitle1"
              color="secondary"
              style={{ marginBottom: "8px" }}
            >
              <b>Ecommerce Acceories & Fashion item</b>
            </Typography>
            <Typography
              color="primary"
              style={{
                fontSize: "16px",
                lineHeight: "16px",
                marginTop: "15px",
                fontWeight: "bold",
              }}
              variant="body1"
            >
              About {filteredData.length} results
            </Typography>
          </div>
          <div className={classes.searchResultItem}>
            <label className={classes.inputPerPageLabel}>
              <Typography>Per Page:</Typography>
              <input value="8" className={classes.inputPerPage} />
            </label>
            <label className={classes.inputPerPageLabel2}>
              <Typography>Sort By</Typography>
              <Select
                id="demo-simple-select"
                value={change}
                label="Age"
                onChange={handleChange}
                disableUnderline
              >
                {change === "Lower to High" ? (
                  <MenuItem value={change}>
                    <Typography style={{ color: "#8A8FB9" }} variant="body2">
                      Lower to High
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem value="usd">
                    <Typography style={{ color: "#8A8FB9" }} variant="body2">
                      Lower to High
                    </Typography>
                  </MenuItem>
                )}
                <MenuItem value="inr">
                  {" "}
                  <Typography style={{ color: "#8A8FB9" }} variant="body2">
                    Higher to Low
                  </Typography>
                </MenuItem>
              </Select>
            </label>
          </div>
        </div>
      </div>
      <section className={classes.searchedOutputSection}>
        <div className={classes.sidebar}></div>

        {filteredData.slice((page - 1) * 8, page * 8).map((cur, i) => {
          return (
            <Card
              onClick={() => !takeToCart && takeToProductDetail(cur.id)}
              key={cur.id}
              style={{ transition: "all .3s" }}
              className={classes.searchedOutput}
            >
              <div className={classes.searchedOutputImage}>
                <Image alt="" src={cur.image} />
              </div>
              <div className={classes.searchedOutputData}>
                <div className={classes.searchedOutputTextSlice1}>
                  <Typography
                    variant="body1"
                    style={{ color: "#111C85", textTransform: "capitalize" }}
                  >
                    {cur.name}
                  </Typography>
                  <div className={classes.circleBox}>
                    <div
                      className={`${classes.circle} ${classes.color1}`}
                    ></div>
                    <div className={`${classes.circle} ${classes.color2}`}>
                      {" "}
                    </div>
                    <div className={`${classes.circle} ${classes.color3}`}>
                      {" "}
                    </div>
                  </div>
                </div>
                <div className={classes.searchedOutputTextSlice2}>
                  <Typography
                    variant="body2"
                    style={{
                      color: "#111C85",
                      fontSize: "14px",
                      lineHeight: "16px",
                      marginRight: "10px",
                    }}
                  >
                    {ctx.currency
                      ? `$${cur.price.toFixed(2)}`
                      : `₹${(cur.price * 70).toFixed(2)}`}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      fontSize: "14px",
                      lineHeight: "16px",
                      color: "#FF2AAA",
                      textDecoration: "line-through",
                    }}
                  >
                    {ctx.currency
                      ? `$${cur.orignalPrice.toFixed(2)}`
                      : `₹${(cur.orignalPrice * 70).toFixed(2)}`}
                  </Typography>
                  <div className={classes.ratingStarBox}>
                    {stars.map((star) => {
                      return (
                        <span
                          key={star}
                          className={`${classes.ratingStart} ${
                            star <= cur.rating ? classes.goldStar : ""
                          }`}
                        >
                          <RatingStar />
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className={classes.searchedOutputTextSlice3}>
                  <Typography
                    variant="body2"
                    style={{
                      lineHeight: "28px",
                      color: "#9295AA",
                      fontWeight: "400",
                    }}
                  >
                    {cur.text}
                  </Typography>
                </div>
                <div
                  onMouseLeave={() => setTakeToCart(false)}
                  onMouseOver={() => setTakeToCart(true)}
                  className={classes.boxSelect}
                >
                  <div
                    className={`${classes2.cart1} ${
                      ctx.loggedin &&
                      ctx.loggedin.userData.cartItems &&
                      ctx.loggedin.userData.cartItems.length >= 0 &&
                      ctx.loggedin.userData.cartItems.includes(cur.id) &&
                      classes2.cartActive
                    } `}
                    onClick={() => {
                      itemToCart(cur.id);
                    }}
                  >
                    {ctx.loggedin && userCart && userCart.includes(cur.id) ? (
                      <div className={classes.favIcon}>
                        <ShoppingCartIcon />
                      </div>
                    ) : (
                      <AddToCart />
                    )}
                  </div>

                  <div
                    className={`${classes2.cart1} ${
                      ctx.loggedin &&
                      ctx.loggedin.userData.wishlist &&
                      ctx.loggedin.userData.wishlist.includes(cur.id) &&
                      classes2.cartActive
                    } `}
                    onClick={() => {
                      itemToWishlist(cur.id);
                    }}
                  >
                    {ctx.loggedin &&
                    ctx.loggedin.userData.wishlist &&
                    ctx.loggedin.userData.wishlist.includes(cur.id) ? (
                      <div className={classes.favIcon}>
                        <FavoriteIcon />
                      </div>
                    ) : (
                      <Heart />
                    )}
                  </div>
                  <div
                    onClick={() => takeToProductDetail(cur.id)}
                    className={classes2.cart1}
                  >
                    <Zoomin />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
        <Pagination
          page={page}
          onChange={pageHandleChange}
          count={Math.ceil(filteredData.length / 8)}
          shape="rounded"
        />
      </section>
    </div>
  );
};

export default searchResults;
