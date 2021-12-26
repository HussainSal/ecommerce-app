import React from "react";
import Header from "../components/partials/Header";
import classes from "../styles/ordercompleted.module.css";
import { Button, Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";

const orderComplete = () => {
  const router = useRouter();

  return (
    <section>
      <Header type={"Order Completed"} />
      {/* <div className={classes.clockImage}>
        <Image alt="" src={clock} />
      </div> */}
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          {/* <Image alt="" src={} /> */}
        </div>
        <Typography
          variant="h3"
          color="secondary"
          style={{ fontWeight: "bold" }}
        >
          Your Order Is Completed!
        </Typography>
        <Typography
          variant="body1"
          style={{
            lineHeight: "30px",
            color: "#8D92A7",
            fontSize: "16px",
            marginTop: "25px",
            marginBottom: "15px",
          }}
        >
          Thank you for your order! Your order is being processed and will be
          completed within 3-6 hours. You will receive an email confirmation
          when your order is completed.
        </Typography>
        <Button
          onClick={() => {
            router.push("/");
          }}
          variant="contained"
          color="primary"
          style={{ textTransform: "capitalize" }}
        >
          Continue Shopping
        </Button>
      </div>
    </section>
  );
};

export default orderComplete;
