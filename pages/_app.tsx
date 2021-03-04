import "antd/dist/antd.css";
import { SWRConfig } from "swr";
import axios from "axios";
import Container from "../components/container";
import { connectToDB, school, user } from "../db";

function MyApp({ Component, pageProps }) {
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
