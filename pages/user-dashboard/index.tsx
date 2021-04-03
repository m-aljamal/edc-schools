import React, { useState } from "react";
import DashbordLayout from "../../components/shared/DashbordLayout";
import { connectToDB, school, user } from "../../db";
import MenuList from "../../components/shared/MenuList";
import ContentMenu from "../../components/shared/ContentMenu";

const UserDashboard = ({ currentUser, userSchool }) => {
  const [currentContnet, setCurrentContent] = useState("home");

  const handleClick = (e) => {
    setCurrentContent(e.key);
  };

  return (
    <DashbordLayout
      currentUser={currentUser}
      userSchool={userSchool}
      pageContent={
        <ContentMenu
          schoolId={null}
          showContent={currentContnet}
          isAdmin={false}
        />
      }
      menuData={
        <MenuList
          selectedKeys={currentContnet}
          handleClick={handleClick}
          theme="dark"
          mode="inline"
          className="userMenu"
        />
      }
    />
  );
};

export default UserDashboard;

export async function getServerSideProps(ctx) {
  const { db } = await connectToDB();

  const props: any = {};

  if (ctx.req.cookies.auth_token) {
    props.currentUser = await user.getLogedUser(db, ctx.req.cookies.auth_token);
    if (props.currentUser.isAdmin) {
      ctx.res.writeHead(302, { Location: "/admin-dashboard" });
      ctx.res.end();
    }
  } else {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
  }
  props.userSchool = await school.getSchoolByDirector(
    db,
    props.currentUser._id
  );

  return {
    props,
  };
}
