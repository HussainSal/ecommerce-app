import React from "react";
import Image from "next/image";
import { shopexOfferList } from "../../assets/data/shopexOfferData";
import classes from "../../styles/index.module.css";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const ShopexofferList = () => {
  return (
    <div className={classes.shopexOfferList}>
      {shopexOfferList.map((cur, i) => {
        return (
          <Box key={i} className={classes.shopexOfferBox}>
            <div>
              <Image
                width="65px"
                height="65px"
                src={cur.image}
                alt={cur.text}
              />
            </div>
            <Typography
              style={{
                color: "#151875",
                marginBottom: "15px",
                marginTop: "24px",
              }}
              variant="subtitle2"
            >
              {cur.heading}
            </Typography>
            <Typography
              style={{ color: "#1A0B5B4D", textAlign: "center" }}
              variant="subtitle1"
            >
              {cur.text}
            </Typography>
          </Box>
        );
      })}
    </div>
  );
};

export default ShopexofferList;
