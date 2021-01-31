import { connectToDB, user } from "../db";
import { FC } from "react";
import Router from "next/router";

const Home: FC<{
  currentUser: { name: string; email: string; isAdmin: string };
}> = ({ currentUser }) => {
  if (typeof window !== "undefined" && !currentUser) return <p>Loading...</p>;
  if (typeof window !== "undefined" && currentUser.isAdmin) {
    Router.push("/admin-dashbord");
    return <div></div>;
  } else if (typeof window !== "undefined" && currentUser) {
    Router.push("/user-dashboard");
    return <div></div>;
  }
  return <div></div>;
};
export async function getServerSideProps(ctx) {
  const { db } = await connectToDB();
  let currentUser;
  if (ctx.req.cookies.auth_token) {
    currentUser = await user.getLogedUser(db, ctx.req.cookies.auth_token);
  } else {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
  }

  return { props: { currentUser } };
}

export default Home;
