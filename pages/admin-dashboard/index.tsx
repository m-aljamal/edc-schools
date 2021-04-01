import React, { useState } from "react";
import DashbordLayout from "../../components/shared/DashbordLayout";
import { connectToDB, school, user } from "../../db";
import NamesList from "../../components/user-pages/NamesList";
import TimeSheet from "../../components/abcence/TimeSheet";
import MenuList from "../../components/shared/MenuList";
import { Menu } from "antd";
import {
  TeamOutlined,
  FundOutlined,
  BarcodeOutlined,
  BookOutlined,
  CalculatorOutlined,
  FileDoneOutlined,
  SmileOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import School from "../../components/admin/School";
const UserDashboard = ({ currentUser, schools }) => {
  console.log({ currentUser, schools });

  const [currentContnet, setCurrentContent] = useState(null);

  const menuContent = {
    home: <div>Home</div>,
    allSchools: <School schoolId={currentContnet?.keyPath[0]} />,
  };
  const handleClick = (e) => {
    setCurrentContent(e);
  };
  console.log(currentContnet?.keyPath[1]);

  return (
    <DashbordLayout
      currentUser={currentUser}
      userSchool={{ name: "حساب المشرف العام" }}
      pageContent={menuContent[currentContnet?.keyPath[1]]}
      menuData={
        <Menu
          onClick={handleClick}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          className="menu"
        >
          <Menu.Item key="1" icon={<FundOutlined />}>
            الرئيسية
          </Menu.Item>

          <SubMenu key="allSchools" icon={<TeamOutlined />} title="المدارس">
            {schools?.map((s, i) => (
              <Menu.Item key={s._id} icon={<LeftOutlined />}>
                {s.name}
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
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
    if (!props.currentUser.isAdmin) {
      ctx.res.writeHead(302, { Location: "/user-dashboard" });
      ctx.res.end();
    }
  } else {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
  }
  props.schools = await school.getSchools(db);

  //   props.userSchool = await school.getSchoolByDirector(
  //     db,
  //     props.currentUser._id
  //   );

  return {
    props,
  };
}
