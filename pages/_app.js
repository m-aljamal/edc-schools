import "antd/dist/antd.css";
import { SWRConfig } from "swr";
import axios from "axios";
import Container from "../components/container";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
   
html,
body {
  padding: 0;
  margin: 0;
  font-family: "Cairo", sans-serif; /* font-family: tajawal-regular -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; */
}
button{
  font-family: "Cairo", sans-serif;
}
a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

:root {
  --blue: #476c86;
  --darkGray: #606060;
  --lightGray: #d7d7d7;
  --tr: all 0.3s linear;
}

.center {
  text-align: center;
}
.bold {
  font-weight: bold;
}

.ant-modal-title {
  text-align: center;
}
.ant-spin .ant-spin-spinning {
  display: flex;
  justify-content: center;
}



li {
  list-style-type: none;
}

.textJustify{
    text-align: justify;
    text-align-last: end;
  }


`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};
function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <SWRConfig value={{ fetcher: (url) => axios(url).then((r) => r.data) }}>
          <Container>
            <Component {...pageProps} />
          </Container>
        </SWRConfig>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
