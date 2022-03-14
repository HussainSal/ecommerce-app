import { createTheme } from "@material-ui/core";

const theme = createTheme({
  typography: {
    fontFamily: "Josefin Sans ",
    h1: {
      fontSize: "53px",
      lineHeight: "81.98px",
      letterSpacing: ".015em",
      fontWeight: "600",

      "@media (max-width:600px)": {
        fontSize: "30px",
        lineHeight: "40px",
      },
    },
    h2: {
      fontSize: "42px",
      lineHeight: "49.22px",
      letterSpacing: ".015em",

      "@media (max-width:600px)": {
        fontSize: "25px",
        lineHeight: "28px",
      },
    },
    h3: {
      fontSize: "35px",
      lineHeight: "46.2px",
      letterSpacing: ".015em",
      "@media (max-width:600px)": {
        fontSize: "22px",
        lineHeight: "28px",
      },
    },
    h4: {
      fontSize: "34px",
      fontWeight: "700",
      lineHeight: "34px",
      "@media (max-width:600px)": {
        fontSize: "20px",
        lineHeight: "25px",
      },
    },
    h5: {
      fontSize: "26px",
      fontWeight: "600",
      lineHeight: "26px",
      "@media (max-width:600px)": {
        fontSize: "18px",
        lineHeight: "20px",
      },
    },
    subtitle1: {
      fontSize: "16px",
      fontFamily: "lato",
      lineHeight: "20px",
    },
    subtitle2: {
      fontSize: "22px",
      lineHeight: "25.78px",
    },
    body1: {
      fontSize: "18px",
      fontFamily: "lato",
      fontWeight: "400",
      lineHeight: "21.6px",

      "@media (max-width:600px)": {
        fontSize: "15px",
        lineHeight: "18.6px",
        fontWeight: "400",
      },
    },
    body2: {
      fontSize: "16px",
      lineHeight: "18.75px",
    },
  },
  palette: {
    primary: {
      main: "#FB2E86",
    },
    secondary: {
      main: "#151875",
    },
  },
});

export default theme;
