import { connectToDB, user, school, employee } from "../../db";
import axios from "axios";
import DashbordLayout from "../../components/shared/DashbordLayout";
import { Menu } from "antd";
import React from "react";
import Link from "next/link";
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
const adminDashbord = ({
  users,
  schools,
  currentUser,
  school,
  mangers,
  teachers,
  administratorsList,
  teachersList,
}) => {
  //   const createNewUser = async () => {
  //     await axios.post("/api/users/new", {
  //       name: "Mustafa",
  //       email: "mustafa@m.com",
  //       password: "123456",
  //       isAdmin: false,
  //     });
  //   };

  //   const onCreateSchool = async () => {
  //     try {
  //       const { data } = await axios.post("/api/school/new", {
  //         name: "مدرس واجدو",
  //         director: "j8NiwUZ0taCyvfwkyuh-J",
  //       });
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  const pageContent = () => {
    if (school)
      return (
        <School
          administratorsList={administratorsList}
          teachersList={teachersList}
        />
      );
    return <p>Home</p>;
  };
  console.log({
    schools,
    currentUser,
    school,
    mangers,
    teachers,
    teachersList,
    administratorsList,
  });

  return (
    <DashbordLayout
      userSchool={{ name: "المشرف العام على المدارس" }}
      currentUser={currentUser}
      pageContent={pageContent()}
      menuData={
        <>
          <Menu.Item key="1" icon={<FundOutlined />}>
            <Link href="/admin-dashbord?page=home">الرئيسية</Link>
          </Menu.Item>

          <SubMenu key="sub1" icon={<TeamOutlined />} title="المدارس">
            {schools?.map((s, i) => (
              <Menu.Item key={i + 2} icon={<LeftOutlined />}>
                <Link
                  href={`/admin-dashbord?page=school&id=${s._id}&key=${
                    i + 2
                  }&sub=1`}
                >
                  {s.name}
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        </>
      }
    ></DashbordLayout>
  );
};

export default adminDashbord;

export async function getServerSideProps(ctx) {
  const { db } = await connectToDB();
  //   const users = await user.getUsers(db);

  const props: any = {};

  if (ctx.req.cookies.auth_token) {
    props.currentUser = await user.getLogedUser(db, ctx.req.cookies.auth_token);
  } else {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
  }
  props.schools = await school.getSchools(db);

  if (ctx.query.page === "school") props.school = true;
  console.log(ctx.query.id);

  if (ctx.query.subpage === "teachers")
    props.teachersList = await employee.getEmployeesBySchool(
      db,
      ctx.query.id,
      "teacher"
    );
  if (ctx.query.subpage === "mangers")
    props.administratorsList = await employee.getEmployeesBySchool(
      db,
      ctx.query.id,
      "administrators"
    );
  //   props.school = await school.getSchool
  return {
    props,
  };
}

/**
 * todo Admin tools
 *
 *
 *
 * 3- see the total schools employ
 * 4- see the total school students
 * 5- see daily Absence for students and Employees and save the resons
 *
 * 6- see students reqords and marks
 */
