import React from "react";
import Header from "../components/partials/Header";
import classes from "../styles/about.module.css";
import meeting from "../assets/assets/img/meeting.png";
import Image from "next/image";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import ShopexofferList from "../components/partials/ShopexofferList";
import client1 from "../assets/assets/img/client1.png";
import client2 from "../assets/assets/img/client2.png";
import client3 from "../assets/assets/img/client3.png";

const useStyle = makeStyles({
  heading: {
    lineHeight: "48px",
    marginBottom: "15px",
  },
  historyDescription: {
    fontSize: "16px",
    lineHeight: "25.6px",
    color: "#8A8FB9",
  },
  contactUsButton: {
    textTransform: "capitalize",
    width: "145px",
    height: "44px",
    marginTop: "80px",
  },
});

const about = () => {
  const style = useStyle();

  return (
    <section>
      <Header type={"About Us"} />
      <div className={classes.container}>
        <div className={classes.historyBox}>
          <div className={classes.imageBox}>
            <Image alt="" src={meeting} />
          </div>
          <div className={classes.textBox}>
            <Typography
              color="secondary"
              variant="h3"
              className={style.heading}
            >
              Know About Our Ecomerce Business, History
            </Typography>
            <Typography className={style.historyDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices mattis aliquam, malesuada diam est. Malesuada sem
              tristique amet erat vitae eget dolor lobortis. Accumsan faucibus
              vitae lobortis quis bibendum quam.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={style.contactUsButton}
            >
              contact us{" "}
            </Button>
          </div>
        </div>
        <div className={classes.featuers}>
          <Typography
            style={{ marginBottom: "68px" }}
            color="secondary"
            variant="h3"
            className={style.heading}
          >
            Our Features
          </Typography>
          <ShopexofferList />
        </div>
        <div className={classes.clientsViews}>
          <Typography
            style={{ marginTop: "50px" }}
            color="secondary"
            variant="h3"
            className={style.heading}
          >
            Our Clients Say
          </Typography>
          <div className={classes.reviewBox}>
            <div className={classes.pictureBox}>
              <div className={classes.img}>
                <Image alt="" height="165px" src={client1} />
              </div>
              <div className={classes.img}>
                <Image alt="" height="165px" src={client2} />
              </div>
              <div className={classes.img}>
                <Image alt="" height="165px" src={client3} />
              </div>
            </div>
            <div className={classes.nameBox}>
              <Typography color="secondary" variant="subtitle2">
                Selena Gomez
              </Typography>
              <Typography
                style={{
                  fontSize: "10px",
                  lineHeight: "25.6px",
                  fontFamily: "lato",
                  color: "#8A8FB9",
                }}
              >
                Ceo at webcy Digital
              </Typography>
            </div>
            <Typography
              variant="body1"
              style={{
                textAlign: "center",
                lineHeight: "25.6px",
                fontSize: "16px",
                color: "#8A8FB9",
                marginTop: "20px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis
              ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a
              enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor
              aliquam lacus volutpat praesent.
            </Typography>

            <div className={classes.changeclientBox}>
              <span className={classes.changeclient} />
              <span
                className={`${classes.changeclient} ${classes.activeClient}`}
              />
              <span className={classes.changeclient} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default about;
