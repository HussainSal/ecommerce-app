import React from "react";
import Header from "../components/partials/Header";
import classes from "../styles/shopingCart.module.css";
import Card from "@material-ui/core/Card";
import Image from "next/image";
import Typography from "@material-ui/core/Typography";
import { CancelCart } from "../components/icons/icon";
import { allData } from "../assets/data/allData";
import Button from "@material-ui/core/Button";
import shopingCart from "./shopingcart";
import { useAppContext } from "../store/authContext";
import { useState, useEffect } from "react";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import { RatingStar } from "../components/icons/icon";
import DeleteIcon from "@mui/icons-material/Delete";
import emptyCart from "../assets/images/no_cart.png";
import { useRouter } from "next/dist/client/router";
import Loading from "../components/partials/Loading";

const stars = [1, 2, 3, 4, 5];

const wishlist = () => {
  const ctx = useAppContext();
  const [wishlistItem, setWishlistitem] = useState([]);
  const db = getFirestore();
  const router = useRouter();

  useEffect(() => {
    setWishlistitem(ctx.loggedin && ctx.loggedin.userData.wishlist);
  }, [ctx.loggedin]);

  let counts = {};

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

  count_duplicate(wishlistItem);

  const dataCart =
    counts &&
    Object.keys(counts).map((cur) => {
      return allData
        .filter((item) => {
          return item.id == parseInt(cur);
        })
        .pop();
    });

  // REMOVING PRODUCT
  const removeOneItem = (id) => {
    setWishlistitem(
      wishlistItem.filter((cur) => {
        return cur != id;
      })
    );
    updateDoc(doc(db, "user", ctx.loggedin.userId), {
      wishlist: wishlistItem.filter((cur) => {
        return cur != id;
      }),
    });
    ctx.setReset((prvState) => prvState + 1);
  };

  return (
    <section>
      <Header type={"Wish List"} />
      <div
        className={`${classes.cartContainer} ${classes.containerWishlistItem}`}
      >
        {dataCart.length < 1 ? (
          <div className={classes.emptyCart}>
            <Image alt="" src={emptyCart} />
            <Typography
              style={{ marginTop: "25px" }}
              color="primary"
              variant="h5"
            >
              No Favorite Item Found!
            </Typography>
            <Typography
              style={{ marginTop: "25px" }}
              color="primary"
              variant="body1"
            >
              Add item now
            </Typography>
            <Button
              onClick={() => {
                router.push("/");
              }}
              variant="contained"
              color="primary"
              style={{ textDecoration: "capitalize", marginTop: "25px" }}
            >
              Add Items
            </Button>
          </div>
        ) : (
          <div className={classes.container}>
            <Card className={classes.bigCard}>
              {ctx.loading ? (
                <Loading />
              ) : (
                dataCart &&
                dataCart.map((cur) => {
                  return (
                    cur && (
                      <Card
                        className={`${classes.cartProductList} ${classes.wishlistCard}`}
                      >
                        <div className={classes.cartProduct}>
                          <div className={classes.cartWishlistImage}>
                            <Image src={cur.image} alt="" />
                          </div>

                          <div className={classes.wishlistProductDescription}>
                            <Typography
                              style={{ fontWeight: "bold", marginTop: "15px" }}
                              variant="body1"
                            >
                              {cur.name}
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
                            <div className={classes.wishListPriceContainer}>
                              <Typography color="secondary">
                                {ctx.currency
                                  ? `$${cur.price.toFixed(2)}`
                                  : `₹${(cur.price * 70).toFixed(2)}`}
                              </Typography>

                              <Typography
                                color="primary"
                                style={{ textDecoration: "line-through" }}
                              >
                                {ctx.currency
                                  ? `$${cur.orignalPrice.toFixed(2)}`
                                  : `₹${(cur.orignalPrice * 70).toFixed(2)}`}
                              </Typography>
                            </div>
                          </div>
                        </div>
                        <DeleteIcon
                          onClick={() => removeOneItem(cur.id)}
                          className={classes.wishlistDeleteIcon}
                        />
                      </Card>
                    )
                  );
                })
              )}
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default wishlist;
