import { Card, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import Header from "../../../components/partials/Header";
import classes from "../../../styles/Productdetails.module.css";
import Image from "next/image";
import chaireg from "../../assets/images/featuredProductsChair1.png";
import {
  RatingStar,
  Favourite,
  ArrowRight,
} from "../../../components/icons/icon";
import { useRouter } from "next/dist/client/router";
import { productMatch } from "../../../assets/data/allData";
import { Button } from "@material-ui/core";
import { useAppContext } from "../../../store/authContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { doc, setDoc, getFirestore, updateDoc } from "firebase/firestore";
import socialsites from "../../assets/images/socialsites.png";
import brands from "../../assets/images/brands.png";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  buttonShadow: {
    transition: "all .2s",
    textTransform: "capitalize",
    "&:hover": {
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    },
    "&:active": {
      boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.12)",
    },
  },
});

const productDetail = () => {
  const style = useStyle();
  const router = useRouter();
  const productId = router.query.productDetail;
  const productType = router.query.searchResult;
  const db = getFirestore();
  const dataMatch = productMatch(+productId);
  const stars = [1, 2, 3, 4, 5];
  const additionalInfo = ["Description", "AdditionalInfo", "Reviews", "Video"];
  const ctx = useAppContext();
  const [addToWishlist, setAddtoWishlist] = useState(false);

  // ADDING ITEMS TO CART

  const itemToCart = (id: number) => {
    if (
      ctx.loggedin.userData.cartItems &&
      ctx.loggedin.userData.cartItems.includes(id)
    ) {
      return;
    } else {
      ctx.loggedin
        ? updateDoc(doc(db, "user", ctx.loggedin.userId), {
            cartItems: ctx.loggedin.userData.cartItems
              ? [...ctx.loggedin.userData.cartItems, id]
              : [id],
          })
        : alert("Please login / signup to use this feature");

      ctx.setReset((prvState) => prvState + 1);
    }
  };

  //ADDING ITEM TO WISHLIST
  const itemToWishlist = (id: number) => {
    !ctx.loggedin && alert("Please login / signup to use this feature");

    if (
      ctx.loggedin.userData.wishlist &&
      ctx.loggedin.userData.wishlist.includes(id)
    ) {
      const updatedWishlist = ctx.loggedin.userData.wishlist.filter((item) => {
        return item != id;
      });
      updateDoc(doc(db, "user", ctx.loggedin.userId), {
        wishlist: updatedWishlist,
      });
    } else if (ctx.loggedin) {
      updateDoc(doc(db, "user", ctx.loggedin.userId), {
        wishlist: ctx.loggedin.userData.wishlist
          ? [...ctx.loggedin.userData.wishlist, id]
          : [id],
      });
    }

    ctx.setReset((prvState) => prvState + 1);
  };

  // GOING TO CART
  const goToCart = (id) => {
    ctx.loggedin &&
      ctx.loggedin.userData.cartItems &&
      ctx.loggedin.userData.cartItems.includes(id) &&
      router.push("/shopingcart");
  };

  return (
    <Fragment>
      <section>
        <Header type={"Product Details"} />
        <div className={classes.containerProductDetail}>
          {dataMatch && (
            <Card className={classes.card}>
              <div className={classes.imageBox}>
                <Image alt="" src={dataMatch.image} />
              </div>
              <div className={classes.textBox}>
                <Typography variant="h3" style={{ color: "#0D134E" }}>
                  {dataMatch.name}
                </Typography>
                <div className={classes.starBox}>
                  {stars.map((star) => {
                    return (
                      <span
                        key={star}
                        className={`${
                          star <= dataMatch.rating ? classes.goldStar : ""
                        }`}
                      >
                        <RatingStar />
                      </span>
                    );
                  })}{" "}
                  <Typography
                    variant="body1"
                    color="secondary"
                    style={{ fontSize: "14px", lineHeight: "29px" }}
                  >
                    (22)
                  </Typography>
                </div>
                <div className={classes.priceBox}>
                  <Typography
                    variant="subtitle1"
                    color="secondary"
                    style={{ lineHeight: "29px", marginRight: "10px" }}
                  >
                    {ctx.currency
                      ? `$${dataMatch.price.toFixed(2)}`
                      : `₹${(dataMatch.price * 70).toFixed(2)}`}
                  </Typography>
                  <Typography
                    color="primary"
                    variant="subtitle1"
                    style={{
                      lineHeight: "29px",
                      textDecoration: "line-through",
                    }}
                  >
                    {ctx.currency
                      ? `$${dataMatch.price.toFixed(2)}`
                      : `₹${(dataMatch.price * 70).toFixed(2)}`}
                  </Typography>
                </div>
                <Typography
                  style={{
                    marginTop: "30px",
                    color: "#A9ACC6",
                    lineHeight: "29px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris tellus porttitor purus, et volutpat sit.
                </Typography>
                <div className={classes.addToCart}>
                  <Typography
                    color="secondary"
                    variant="subtitle1"
                    style={{ lineHeight: "29px", marginRight: "20px" }}
                  >
                    <Button
                      className={style.buttonShadow}
                      disableElevation
                      onClick={() => {
                        itemToCart(dataMatch.id);
                        goToCart(dataMatch.id);
                      }}
                      variant="contained"
                      color="primary"
                    >
                      {ctx.loggedin &&
                      ctx.loggedin.userData.cartItems &&
                      ctx.loggedin.userData.cartItems.includes(dataMatch.id)
                        ? "Go To Cart"
                        : "Add To Cart"}
                    </Button>
                  </Typography>
                  <span
                    className={classes.heart}
                    onClick={() => itemToWishlist(dataMatch.id)}
                  >
                    <FavoriteIcon
                      style={{
                        color:
                          ctx.loggedin &&
                          ctx.loggedin.userData.wishlist &&
                          ctx.loggedin.userData.wishlist.includes(dataMatch.id)
                            ? "#FB2E86"
                            : "#ACACAC",
                        maxWidth: "22px",
                        maxHeight: "22px",
                        // transition: "all .1s",
                      }}
                    />
                  </span>
                </div>
                <div>
                  <Typography
                    color="secondary"
                    style={{ marginTop: "10px", lineHeight: "29px" }}
                  >
                    <b>Categories : </b> {dataMatch.type[0]}
                  </Typography>
                  <Typography
                    color="secondary"
                    style={{ marginTop: "10px", lineHeight: "29px" }}
                  >
                    <b>Tags : </b>
                    {(dataMatch.type[1], dataMatch.type[2], dataMatch.type[3])}
                  </Typography>
                  <div className={classes.shareBox}>
                    <Typography
                      color="secondary"
                      style={{
                        marginTop: "10px",
                        marginRight: "16px",
                        lineHeight: "29px",
                      }}
                    >
                      <b>share</b>
                    </Typography>

                    <div className={classes.socialSites}></div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </section>

      <section className={classes.descriptionSection}>
        <div className={classes.descrptionContainer}>
          <div className={classes.descrptionHeading}>
            {additionalInfo.map((cur) => {
              return (
                <Typography key={cur} variant="h5" color="secondary">
                  {cur}
                </Typography>
              );
            })}
          </div>
          <div className={classes.descriptionText1}>
            <Typography variant="h5" color="secondary" className={classes.butt}>
              Varius tempor
            </Typography>
            <Typography
              variant="body2"
              style={{
                color: "#A9ACC6",
                lineHeight: "29px",
                marginTop: "14px",
              }}
            >
              Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor
              ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris
              varius ac est bibendum. Scelerisque a, risus ac ante. Velit
              consectetur neque, elit, aliquet. Non varius proin sed urna,
              egestas consequat laoreet diam tincidunt. Magna eget faucibus cras
              justo, tortor sed donec tempus. Imperdiet consequat, quis diam
              arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate
              nunc nec. Dui, massa viverr .
            </Typography>
            <Typography
              variant="h5"
              color="secondary"
              style={{
                marginTop: "36px",
                marginBottom: "18px",
              }}
            >
              More details
            </Typography>
            {stars.map((cur) => {
              return (
                cur <= 4 && (
                  <div key={cur} className={classes.moredetailsDescription}>
                    <ArrowRight />
                    <Typography
                      variant="body2"
                      style={{
                        color: "#A9ACC6",
                        lineHeight: "29px",
                        // marginTop: "16px",
                        marginLeft: "5px",
                        // paddingBottom: "14px",
                      }}
                    >
                      Aliquam dis vulputate vulputate integer sagittis. Faucibus
                      ds diam arcu, nulla lobortis justo netus dis. Eu in
                      fringilla vulputate nunc nec. Dui, massa viverr .
                    </Typography>{" "}
                  </div>
                )
              );
            })}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default productDetail;
