import React from "react";
import classes from "../styles/shopingCart.module.css";
import Header from "../components/partials/Header";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Image from "next/image";
import test from "../assets/images/camera1.png";
import { allData } from "../assets/data/allData";
import { useState } from "react";

const headingList = ["Products", "Price", "Quantity", "Total"];
const randomId = [8, 15, 25, 35, 36];

const dataCart = randomId.map((cur) => {
  return allData
    .filter((item) => {
      return item.id == cur;
    })
    .pop();
});
console.log(dataCart);

const usestyle = makeStyles({
  heading: {
    fontSize: "20px",
    lineHeight: "23.44px",
    fontWeight: "bold",
  },
});

const shopingCart = () => {
  const style = usestyle();
  const [quantity, setQuantity] = useState(1);

  return (
    <section>
      <Header type={"Shoping Cart"} />
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

          {dataCart.map((cur) => {
            return (
              <div className={classes.cartProductList}>
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
                <TextField
                  key={+cur.id}
                  // id={toString(cur.id)}
                  onChange={(e) => {
                    +e.target.id == cur.id && setQuantity(+e.target.value);
                  }}
                  value={quantity}
                  style={{
                    marginTop: "38px",
                    textAlign: "center",
                    marginLeft: "50px",
                    width: "50px",
                  }}
                  color="secondary"
                ></TextField>

                <Typography
                  style={{ marginTop: "38px", textAlign: "center" }}
                  color="secondary"
                  variant="body2"
                >
                  $ {+cur.price * 2}.00
                </Typography>

                {/* })} */}
              </div>
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
                $219.00
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
