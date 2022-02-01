import { Card, Typography } from "@material-ui/core";
import React from "react";
import Header from "../../components/partials/Header";
import classes from "../../styles/product.module.css";
import Image from "next/image";
import { makeStyles } from "@material-ui/core";
import { productData } from "../../assets/data/productData";
import { Grid } from "@mui/material";
import NextLink from "next/link";
import { useAppContext } from "../../store/authContext";

const useStyle = makeStyles({
  colorEC42A2: {
    backgroundColor: "#EC42A2",
  },
  color8568FF: {
    backgroundColor: "#8568FF",
  },
});

const index = () => {
  const style = useStyle();
  const ctx = useAppContext();

  return (
    <section>
      <Header type={"Products"} />
      <div className={classes.container}>
        <Grid
          style={{ marginTop: "103px" }}
          container
          columnGap="53px"
          justifyContent="center"
        >
          {productData.map((cur) => {
            return (
              <Grid item>
                <NextLink href={`products/${cur.type}`}>
                  <Card
                    style={{ transition: "all .3s" }}
                    className={classes.productCard}
                  >
                    <div className={classes.productImage}>
                      <Image alt="" src={cur.img} />
                    </div>
                    <div className={classes.textBox}>
                      <Typography
                        color="secondary"
                        variant="body1"
                        style={{
                          lineHeight: "18px",
                          fontWeight: "700",
                          marginTop: "18px",
                        }}
                      >
                        <b>{cur.title}</b>
                      </Typography>
                      <div className={classes.circle}>
                        <span className={classes.coloredSpan} />
                        <span
                          className={`${classes.coloredSpan} ${style.colorEC42A2}`}
                        />
                        <span
                          className={`${classes.coloredSpan} ${style.color8568FF}`}
                        />
                      </div>
                      <div className={classes.priceBox}>
                        <Typography
                          color="secondary"
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          {ctx.currency
                            ? `$${cur.price.toFixed(2)}`
                            : `₹${(cur.price * 70).toFixed(2)}`}
                        </Typography>
                        <Typography
                          color="primary"
                          style={{
                            textDecoration: "line-through",
                            fontSize: "14px",
                            marginLeft: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {ctx.currency
                            ? `$${cur.orignalPrice.toFixed(2)}`
                            : `₹${(cur.orignalPrice * 70).toFixed(2)}`}
                        </Typography>
                      </div>
                    </div>
                  </Card>
                </NextLink>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </section>
  );
};

export default index;
