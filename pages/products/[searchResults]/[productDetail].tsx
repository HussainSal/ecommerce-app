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

const productDetail = () => {
  const router = useRouter();
  const productId = router.query.productDetail;
  // console.log(productId);
  const db = getFirestore();
  const dataMatch = productMatch(+productId);
  const stars = [1, 2, 3, 4, 5];
  const additionalInfo = ["Description", "AdditionalInfo", "Reviews", "Video"];
  const ctx = useAppContext();

  // ADDING ITEMS TO CART
  const itemToCart = (id: number) => {
    // console.log(ctx.loggedin.userData.cartItems.length);
    ctx.loggedin
      ? updateDoc(doc(db, "user", ctx.loggedin.userId), {
          cartItems: ctx.loggedin.userData.cartItems
            ? [...ctx.loggedin.userData.cartItems, id]
            : [id],
        })
      : alert("Please login / signup to use this feature");

    ctx.setReset((prvState) => prvState + 1);
  };

  //ADDING ITEM TO WISHLIST
  const itemToWishlist = (id: number) => {
    if (ctx.loggedin && ctx.loggedin.userData.cartItems.includes(id)) {
      return;
    }
    ctx.loggedin
      ? updateDoc(doc(db, "user", ctx.loggedin.userId), {
          wishlist: ctx.loggedin.userData.wishlist
            ? [...ctx.loggedin.userData.wishlist, id]
            : [id],
        })
      : alert("Please login / signup to use this feature");

    ctx.setReset((prvState) => prvState + 1);
  };

  // GOING TO CART
  const goToCart = () => {
    ctx.loggedin &&
      ctx.loggedin.userData.cartItems &&
      ctx.loggedin.userData.cartItems.includes(dataMatch.id) &&
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
                    ${dataMatch.price}
                  </Typography>
                  <Typography
                    color="primary"
                    variant="subtitle1"
                    style={{
                      lineHeight: "29px",
                      textDecoration: "line-through",
                    }}
                  >
                    ${dataMatch.orignalPrice}
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
                      onClick={() => {
                        itemToCart(dataMatch.id);
                        goToCart();
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
                    {ctx.loggedin &&
                    ctx.loggedin.userData.wishlist &&
                    ctx.loggedin.userData.wishlist.includes(dataMatch.id) ? (
                      <FavoriteIcon style={{ color: "#FB2E86" }} />
                    ) : (
                      <Favourite />
                    )}
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
                <Typography variant="h5" color="secondary">
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
                  <div className={classes.moredetailsDescription}>
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
