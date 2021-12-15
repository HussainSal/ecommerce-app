import { ThemeProvider } from "@material-ui/styles";
import "../styles/globals.css";
import theme from "../theme";
import Layout from "../components/partials/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
