import { Card, Typography } from "@material-ui/core";
import React from "react";
import Header from "../../components/partials/Header";
import classes from "../../styles/product.module.css";
import Image from "next/image";
import { makeStyles } from "@material-ui/core";
import { productData } from "../../assets/data/productData";
import { Grid } from "@mui/material";
import NextLink from "next/link";

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

  return (
    <section>
      <Header type={"Products"} />
      <div className={classes.container}>
        <Grid style={{ marginTop: "103px" }} container columnGap="53px">
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
                          ${cur.price}.00
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
                          ${cur.orignalPrice}.00
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
