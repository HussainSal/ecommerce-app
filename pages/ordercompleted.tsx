import React from "react";
import styles from "../styles/OrderConfirmed.module.css";
import { Typography, makeStyles, Button } from "@material-ui/core";
import Image from "next/image";
import clock from "../assets/images/clock.png";
import checkMark from "../assets/images/checkmark.png";
import taskbook from "../assets/images/taskbook.png";
import Header from "../components/partials/Header";
import Divider from "../components/partials/Divider";
import { useRouter } from "next/dist/client/router";

const useStyles = makeStyles({
  heading: {
    color: "#151875",
    marginBottom: 28,
    textTransform: "capitalize",
  },
  text: {
    lineHeight: "30px",
    color: "#8D92A7",
    marginBottom: 20,
  },
  btn: {
    textTransform: "capitalize",
    width: 208,
    height: 59,
    borderRadius: 3,

    "&:hover": {
      boxShadow: "1px 5px 5px rgba(0,0,0,.12)",
    },
    "&:active": {
      boxShadow: "none",
    },
  },
});

const OrderConfirmed = () => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header type={"Order Completed"} />

      <section className={styles.orderConfirmed}>
        <div className={styles.innerContainer}>
          <div className={styles.clockImg}>
            <Image src={clock} alt="clock-img" />
          </div>
          <div className={styles.taskbookImg}>
            <Image src={taskbook} alt="taskbook-img" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.checkMarkImg}>
              <Image src={checkMark} alt="checkmark-img" />
            </div>

            <Typography variant="h3" className={classes.heading}>
              your order is completed!
            </Typography>
            <Typography variant="subtitle2" className={classes.text}>
              Thank you for your order! Your order is being processed and will
              be completed within 3-6 hours. You will receive an email
              confirmation when your order is completed.
            </Typography>
            <Button
              variant="contained"
              className={classes.btn}
              color="primary"
              disableElevation
              onClick={() => router.push("/")}
            >
              continue shopping
            </Button>
          </div>
        </div>
      </section>

      <Divider />
    </React.Fragment>
  );
};

export default OrderConfirmed;

// color: "#151875",
