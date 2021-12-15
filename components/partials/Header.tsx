import { Typography } from "@material-ui/core";
import React from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div className={classes.textContainer}>
          <Typography variant="h3" style={{ color: "#101750" }}>
            {props.type}
          </Typography>
          <div className={classes.subTextContainer}>
            <Typography variant="subtitle1"> Home.Pages </Typography>
            <Typography variant="subtitle1" color="primary">
              {` .${props.type}`}
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
