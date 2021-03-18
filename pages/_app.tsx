import "antd/dist/antd.css";
import Router from "next/router";
import { SWRConfig } from "swr";
import axios from "axios";
import Container from "../components/shared/container";
import { connectToDB, school, user } from "../db";
import NProgress from "nprogress";
import "../components/styles/nprogress.css";

function MyApp({ Component, pageProps }) {
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());
  return (
    <>
      <SWRConfig value={{ fetcher: (url) => axios(url).then((r) => r.data) }}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </SWRConfig>
    </>
  );
}

export default MyApp;
