import { Typography } from "@material-ui/core";
import React from "react";
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
} from "../../../components/icons/icon";
import { useRouter } from "next/dist/client/router";
import { Pagination } from "@mui/material";
import NextLink from "next/link";

const searchResults = (props) => {
  const [change, setChange] = useState("Best Match");

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
              style={{
                fontSize: "12px",
                lineHeight: "14px",
                color: "#8A8FB9",
                fontWeight: "400",
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
            <label className={classes.inputPerPageLabel}>
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
            <NextLink href={`${searchedItem}/${cur.id}`}>
              <Card
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
                      {cur.price}
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
                      {cur.orignalPrice}
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
                      {cur.description}
                    </Typography>
                  </div>
                  <div className={classes.searchedOutputTextSlice4}>
                    <Cart /> <Favourite /> <Zoomin />
                  </div>
                </div>
              </Card>
            </NextLink>
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