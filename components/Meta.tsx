import Head from "next/head";

const Meta = () => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link
        rel="preload"
        href="/fonts/Tajawal-Regular.ttf"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/Tajawal-Medium.ttf"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/Tajawal-Bold.ttf"
        as="font"
        crossOrigin=""
      />
      <link rel="shortcut icon" href="/static/favicon.png" />
      <title>EDC</title>
    </Head>
  );
};

export default Meta;
