import React, { useEffect } from "react";
import classes from "../styles/shopingCart.module.css";
import Header from "../components/partials/Header";
import { Button, Card, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Image from "next/image";
import { allData } from "../assets/data/allData";
import { useState, useRef } from "react";
import { useAppContext } from "../store/authContext";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/dist/client/router";
import { CancelCart } from "../components/icons/icon";
import emptyCart from "../assets/images/no_cart.png";

const usestyle = makeStyles({
  heading: {
    fontSize: "20px",
    lineHeight: "23.44px",
    fontWeight: "bold",
  },
  quantityChangeButton: {
    fontSize: "25px",
    maxWidth: 15,
    minWidth: 15,
    maxHeight: 15,
    minHeight: 15,
    "& > *": {
      padding: 0,
    },
  },
});

const shopingCart = () => {
  const style = usestyle();
  const db = getFirestore();
  const ctx = useAppContext();
  const router = useRouter();
  const [cartItem, setCartItem] = useState([]);
  const qtyRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // setTimeout(() => {
    // }, 100);
    setCartItem(ctx.loggedin && ctx.loggedin.userData.cartItems);
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

  count_duplicate(cartItem);

  const dataCart =
    counts &&
    Object.keys(counts).map((cur) => {
      return allData
        .filter((item) => {
          return item.id == parseInt(cur);
        })
        .pop();
    });

  // CLEARING CART
  const clearCart = () => {
    updateDoc(doc(db, "user", ctx.loggedin.userId), {
      cartItems: "",
    });
    ctx.setReset((prvState) => prvState + 1);
  };

  // REMOVING PRODUCT
  const removeOneItem = (id) => {
    setCartItem(
      cartItem.filter((cur) => {
        return cur != id;
      })
    );
    updateDoc(doc(db, "user", ctx.loggedin.userId), {
      cartItems: cartItem.filter((cur) => {
        return cur != id;
      }),
    });
    ctx.setReset((prvState) => prvState + 1);
  };

  // ADDING ONE ITEM
  const quantityIncreaseHandler = (id) => {
    cartItem.push(id);

    updateDoc(doc(db, "user", ctx.loggedin.userId), {
      cartItems: [...cartItem],
    });
    ctx.setReset((prvState) => prvState + 1);
  };

  //REMOVING ONE ITEM
  const quantityDecreaseHandler = (id) => {
    cartItem.splice(cartItem.indexOf(id), 1);

    updateDoc(doc(db, "user", ctx.loggedin.userId), {
      cartItems: cartItem,
    });
    ctx.setReset((prvState) => prvState + 1);
  };

  let total = [];

  {
    dataCart &&
      dataCart.map((cur) => {
        total.push(
          cur && ctx.currency
            ? +cur.price * counts[cur.id]
            : +cur.price * 70 * counts[cur.id]
        );
      });
  }

  let subTotal = total.reduce((acc, cur) => acc + cur, 0);

  console.log(dataCart);

  return (
    <section>
      <Header type={"Shoping Cart"}></Header>
      {dataCart.length < 1 ? (
        <div className={classes.emptyCart}>
          <Image alt="" src={emptyCart} />
          <Typography
            style={{ marginTop: "25px" }}
            color="primary"
            variant="h5"
          >
            Your cart is Empty
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
        <div className={classes.cartSection}>
          <div className={classes.cartContainer}>
            <div className={classes.productsContainerHeading}>
              <Typography
                variant="subtitle2"
                color="secondary"
                className={style.heading}
                style={{ marginRight: "120px" }}
              >
                Product
              </Typography>
              <Typography
                variant="subtitle2"
                color="secondary"
                className={style.heading}
              >
                Price
              </Typography>
              <Typography
                variant="subtitle2"
                color="secondary"
                className={style.heading}
                style={{ marginRight: "18px" }}
              >
                Quantity
              </Typography>
              <Typography
                variant="subtitle2"
                color="secondary"
                className={style.heading}
              >
                Total
              </Typography>
            </div>

            {dataCart &&
              dataCart.map((cur) => {
                return (
                  cur && (
                    <Card className={classes.cartProductList}>
                      <div className={classes.cartProduct}>
                        <div className={classes.cartProductImage}>
                          <Image src={cur.image} alt="" />
                        </div>
                        <div className={classes.cartProductDescription}>
                          <Typography
                            style={{ fontWeight: "bold", marginTop: "15px" }}
                            variant="body1"
                          >
                            {cur.name}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ color: "#A1A8C1", marginTop: "15px" }}
                          >
                            size:XL
                          </Typography>
                        </div>
                      </div>

                      {/*PRICE  */}
                      <Typography
                        style={{
                          marginTop: "38px",
                          textAlign: "center",
                          marginRight: "40px",
                        }}
                        color="secondary"
                        variant="body2"
                      >
                        {ctx.currency
                          ? `$${cur.price.toFixed(2)}`
                          : `₹${(cur.price * 70).toFixed(2)}`}
                      </Typography>
                      {/*QUANTITY*/}

                      <div className={classes.quantityContainer}>
                        <Button
                          className={style.quantityChangeButton}
                          style={{ width: "20px" }}
                          onClick={() => quantityDecreaseHandler(cur.id)}
                        >
                          -
                        </Button>
                        <input
                          value={counts[cur.id]}
                          style={{
                            margin: "0px 10px",
                            marginTop: "38px",
                            textAlign: "center",
                            width: "50px",
                            height: "20px",
                          }}
                        />
                        <Button
                          className={style.quantityChangeButton}
                          onClick={() => quantityIncreaseHandler(cur.id)}
                        >
                          +
                        </Button>
                      </div>

                      <div className={classes.lastSlice}>
                        <Typography
                          style={{ marginTop: "38px", textAlign: "center" }}
                          color="secondary"
                          variant="body2"
                        >
                          {ctx.currency
                            ? `$${(cur.price * counts[cur.id]).toFixed(2)}`
                            : `₹${(cur.price * 70 * counts[cur.id]).toFixed(
                                2
                              )}`}

                          <div
                            onClick={() => {
                              removeOneItem(cur.id);
                            }}
                            className={classes.cancelItem}
                          >
                            <CancelCart />
                          </div>
                        </Typography>
                      </div>
                    </Card>
                  )
                );
              })}
          </div>

          <div className={classes.totalContainer}>
            <Typography
              variant="subtitle2"
              color="secondary"
              className={style.heading}
              style={{ marginBottom: "42px" }}
            >
              Cart Total
            </Typography>
            <div className={classes.totalPriceContainer}>
              <div className={classes.priceitem}>
                <Typography variant="body1" color="secondary">
                  Price
                </Typography>
                <Typography variant="body1" color="secondary">
                  {ctx.currency ? `$${subTotal}.00` : `₹${subTotal}.00`}
                </Typography>
              </div>
              <div className={classes.priceitem}>
                <Typography variant="body1" color="secondary">
                  Discount
                </Typography>
                <Typography variant="body1" style={{ color: "#388e3c" }}>
                  {`$ ${Math.round(subTotal * 0.1)}.00`}
                </Typography>
              </div>
              <div className={classes.priceitem}>
                <Typography variant="body1" color="secondary">
                  Delivery Charges
                </Typography>
                <Typography variant="body1" style={{ color: "#388e3c" }}>
                  FREE
                </Typography>
              </div>
              <div className={`${classes.priceitem} ${classes.priceItemTotal}`}>
                <Typography variant="body1" color="secondary">
                  Total
                </Typography>
                <Typography
                  variant="body1"
                  color="secondary"
                  style={{ fontWeight: "bold" }}
                >
                  {ctx.currency
                    ? `$ ${(subTotal - subTotal * 0.1).toFixed(2)}`
                    : `₹ ${(subTotal - subTotal * 0.1).toFixed(2)}`}
                </Typography>
              </div>
              <Button
                onClick={() => {
                  router.push("/ordercompleted");
                }}
                variant="contained"
                style={{
                  backgroundColor: "#19D16F",
                  width: "312px",
                  height: "40px",
                  color: "#FFF",
                  textTransform: "capitalize",
                }}
              >
                Place order
              </Button>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={clearCart}
              style={{
                width: "312px",
                height: "40px",
                textTransform: "capitalize",
                marginTop: "80px",
              }}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default shopingCart;
