import React from "react";
import Dashboard from "../../components/layout/dashboard";
import { connectToDB, school, user } from "../../db";

export default function index({ currentUser }) {
  return (
    <Dashboard
      currentUser={currentUser}
      userSchool={{ name: "حساب المدرس" }}
      schools={null}
    />
  );
}

export async function getServerSideProps(ctx) {
  const { db } = await connectToDB();
  const props: any = {};

  if (
    ctx.req?.cookies?.auth_token &&
    ctx.req?.cookies?.auth_token !== "logout"
  ) {
    props.currentUser = await user.getLogedUser(db, ctx.req.cookies.auth_token);
    if (props.currentUser) {
      console.log(props.currentUser);
    } else {
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
    }
    //   if (props?.currentUser?.isAdmin) {
    //     ctx.res.writeHead(302, { Location: "/admin-dashboard" });
    //     ctx.res.end();
    //   }
    //   if (!props?.currentUser?.isAdmin) {
    //     ctx.res.writeHead(302, { Location: "/user-dashboard" });
    //     ctx.res.end();
    //   }
  } else {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
  }
  // props.userSchool = await school.getSchoolByDirector(
  //   db,
  //   props.currentUser._id
  // );

  return {
    props,
  };
}
