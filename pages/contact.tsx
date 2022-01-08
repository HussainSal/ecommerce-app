import { TextField, Typography } from "@material-ui/core";
import React from "react";
import Header from "../components/partials/Header";
import classes from "../styles/contact.module.css";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Image from "next/dist/client/image";
import communication from "../assets/images/communication.png";

const useStyle = makeStyles({
  headingMain: {
    fontSize: "36px",
    fontWeight: "bold",
  },
  pink: {
    backgroundColor: "#FF27B7",
  },
  blue: {
    backgroundColor: "#37DAF3",
  },
  pink2: { backgroundColor: "#FB2E86" },
  skinny: { backgroundColor: "#FFB265" },
  green: { backgroundColor: "#1BE982" },
  descriptionText: {
    paddingTop: "5px",
    color: "#8A8FB9",
    lineHeight: "25.6px",
  },
});

const contactus = () => {
  const style = useStyle();

  return (
    <section>
      <Header type={"Contact Us"} />
      <div className={classes.container}>
        <div className={classes.subContainer1}>
          <div className={classes.subContainer1Left}>
            <Typography
              color="secondary"
              className={style.headingMain}
              variant="h3"
            >
              Information About us
            </Typography>
            <Typography
              variant="body2"
              style={{
                marginTop: "10px",
                marginBottom: "70px",
                color: "#8A8FB9",
                lineHeight: "25.6px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices mattis aliquam, malesuada diam est. Malesuada sem
              tristique amet erat vitae eget dolor lobortis. Accumsan faucibus
              vitae lobortis quis bibendum quam.
            </Typography>
            <div className={classes.circleContainer}>
              <span className={`${classes.circle}`} />
              <span className={`${classes.circle} ${style.pink}`} />
              <span className={`${classes.circle} ${style.blue}`} />
            </div>
            <Typography
              color="secondary"
              className={style.headingMain}
              variant="h3"
              style={{
                marginTop: "175px",
              }}
            >
              Get in touch
            </Typography>

            <Typography
              variant="body2"
              style={{
                marginTop: "20px",
                marginBottom: "46px",
                color: "#8A8FB9",
                lineHeight: "25.6px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices tristique amet erat vitae eget dolor los vitae
              lobortis quis bibendum quam.
            </Typography>
            <div className={classes.sendMailBox}>
              <div className={classes.sendMailBoxSlice1}>
                <TextField
                  placeholder="Your Name"
                  style={{ width: "255px" }}
                ></TextField>
                <TextField
                  placeholder="Your Email"
                  style={{ width: "255px" }}
                ></TextField>
              </div>
              <TextField
                required
                placeholder="Subject"
                style={{ width: "534px", marginTop: "34px" }}
              ></TextField>
              <TextField
                required
                placeholder="Type Your Message"
                style={{
                  width: "534px",
                  // height: "166px",
                  marginTop: "47px",
                  marginBottom: "30px",
                }}
              ></TextField>
              <Button
                color="primary"
                variant="contained"
                style={{
                  textTransform: "capitalize",
                  width: "157px",
                  height: "44px",
                }}
              >
                send mail
              </Button>
            </div>
          </div>
          <div className={classes.subContainer1Right}>
            <Typography
              color="secondary"
              className={style.headingMain}
              variant="h3"
              style={{ marginBottom: "25px" }}
            >
              Contact Way
            </Typography>

            <div className={classes.addressBox}>
              <div className={classes.descriptionBox}>
                <span className={`${classes.circle2}`} />
                <div className={classes.descriptionTextBox}>
                  <Typography variant="body2" className={style.descriptionText}>
                    Tel: 877-67-88-99
                  </Typography>

                  <Typography
                    variant="body2"
                    style={{ width: "182px" }}
                    className={style.descriptionText}
                  >
                    E-Mail: shop@store.com
                  </Typography>
                </div>
              </div>
              <div className={classes.descriptionBox}>
                <span className={`${classes.circle2} ${style.pink2}`} />
                <div className={classes.descriptionTextBox}>
                  <Typography variant="body2" className={style.descriptionText}>
                    Tel: 877-67-88-99
                  </Typography>

                  <Typography variant="body2" className={style.descriptionText}>
                    For over 24hr
                  </Typography>
                </div>
              </div>
              <div className={classes.descriptionBox}>
                <span className={`${classes.circle2} ${style.skinny}`} />
                <div className={classes.descriptionTextBox}>
                  <Typography variant="body2" className={style.descriptionText}>
                    Tel: 877-67-88-99
                  </Typography>

                  <Typography variant="body2" className={style.descriptionText}>
                    Great britain, 3NM98-LK
                  </Typography>
                </div>
              </div>
              <div className={classes.descriptionBox}>
                <span className={`${classes.circle2} ${style.green}`} />
                <div className={classes.descriptionTextBox}>
                  <Typography variant="body2" className={style.descriptionText}>
                    Tel: 877-67-88-99
                  </Typography>

                  <Typography variant="body2" className={style.descriptionText}>
                    On all orders.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.imageBox}>
          <Image alt="" src={communication} />
        </div>
      </div>
    </section>
  );
};

export default contactus;
