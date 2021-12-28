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
import test from "../assets/images/camera1.png";
import { count } from "console";
const headingList = ["Products", "Price", "Quantity", "Total"];

const usestyle = makeStyles({
  heading: {
    fontSize: "20px",
    lineHeight: "23.44px",
    fontWeight: "bold",
  },
});

const shopingCart = () => {
  const style = usestyle();
  const db = getFirestore();
  const ctx = useAppContext();
  const router = useRouter();
  const [cartItem, setCartItem] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const qtyRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCartItem(ctx.loggedin && ctx.loggedin.userData.cartItems);
  }, [ctx.loggedin]);

  // making item 1

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

  // REMOVING ONE ITEM
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

  const qtyChangeHandler = (id) => {
    let quantity = qtyRef.current?.value;
  };

  //

  return (
    <section>
      <Header type={"Shoping Cart"}></Header>
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
                      $ {+cur.price}.00
                    </Typography>
                    {/*QUANTITY*/}

                    <input
                      type="number"
                      min="1"
                      id={cur.id.toString()}
                      placeholder="1"
                      style={{
                        marginTop: "38px",
                        textAlign: "center",
                        marginLeft: "50px",
                        width: "50px",
                        height: "20px",
                      }}
                      onChange={() => {
                        qtyChangeHandler(cur.id);
                      }}
                    ></input>

                    <div className={classes.lastSlice}>
                      <Typography
                        style={{ marginTop: "38px", textAlign: "center" }}
                        color="secondary"
                        variant="body2"
                      >
                        $ {+cur.price * 2}.00
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

                    {/* })} */}
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
                29
              </Typography>
            </div>
            <div className={classes.priceitem}>
              <Typography variant="body1" color="secondary">
                Discount
              </Typography>
              <Typography variant="body1" style={{ color: "#388e3c" }}>
                -$21.9
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
                $197.1
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
    </section>
  );
};

export default shopingCart;
