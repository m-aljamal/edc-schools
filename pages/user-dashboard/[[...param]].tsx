import React, { useState } from "react";
import Link from "next/link";
import {
  connectToDB,
  user,
  school,
  student,
  employee,
  absence,
} from "../../db";
import axios from "axios";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  RightOutlined,
  UserOutlined,
  TeamOutlined,
  FundOutlined,
  BarcodeOutlined,
  BookOutlined,
  CalculatorOutlined,
  FileDoneOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import StudentsList from "../../components/StudentList";
import UserLandingPage from "../../components/UserLandingPage";
import AbsencePage from "../../components/AbsencePage";
import DashbordLayout from "../../components/DashbordLayout";
import TeacherList from "../../components/TeacherList";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const UserDashboard = ({
  currentUser,
  userSchool,
  studentList,
  employeeList,
  absenceList,
  page,
  teachersList,
}) => {
  //  const onNewStudent = async () => {
  //   try {
  //     await axios.post("/api/student/new", {
  //       name: "عبد الله الجمل",
  //       fatherName: "محمد",
  //       classNumber: 1,
  //       division: 3,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const onAddEmployee = async () => {
  //   try {
  //     const { data } = await axios.post("/api/employee/new", {
  //       name: "صفية",
  //       fatherName: "عدنان",
  //       classNumber: [6, 3, 4],
  //       division: [2, 5],
  //     });
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const PageCountent = () => {
    if (absenceList)
      return (
        <AbsencePage absenceList={absenceList} studentList={studentList} />
      );
    if (teachersList) return <TeacherList teachersList={teachersList} />;
    if (employeeList) return <p>Emp</p>;
    if (studentList) return <StudentsList students={studentList} />;
    if (currentUser) return <UserLandingPage currentUser={currentUser} />;
  };

  return (
    <DashbordLayout
      currentUser={currentUser}
      userSchool={userSchool}
      pageContent={PageCountent()}
      menuData={
        <>
          <Menu.Item key="1" icon={<FundOutlined />}>
            <Link href="/user-dashboard">الرئيسية</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<TeamOutlined />} title="الموظفين">
            <Menu.Item key="2" icon={<RightOutlined />}>
              <Link href="/user-dashboard?page=teachers">المدرسين</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<RightOutlined />}>
              <Link href="/user-dashboard?page=mangers">الاداريين</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<RightOutlined />}>
              <Link href="/user-dashboard?page=service">الخدميين</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<RightOutlined />}>
              <Link href="/user-dashboard?page=emptimesheet">سجل الدوام</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<SmileOutlined />} title="الطلاب">
            <Menu.Item key="6" icon={<RightOutlined />}>
              <Link href="/user-dashboard?page=students">جميع الطلاب</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<RightOutlined />}>
              <Link href="/user-dashboard?page=stutimesheet">سجل الدوام</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="8" icon={<BarcodeOutlined />}>
            <Link href="/user-dashboard?page=schoolassets">
              موجودات المدرسة
            </Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<BookOutlined />}>
            <Link href="/user-dashboard?page=schoollibrary">مكتبة المدرسة</Link>
          </Menu.Item>
          <Menu.Item key="10" icon={<CalculatorOutlined />}>
            <Link href="/user-dashboard?page=schoollibrary">
              البرنامج الاسبوعي
            </Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<FileDoneOutlined />}>
            <Link href="/user-dashboard?page=schoollibrary">
              نتائج الامتحانات
            </Link>
          </Menu.Item>
        </>
      }
    />
  );
};
UserDashboard.defaultProps = {
  page: [
    { id: 1, link: "", name: "الرئيسية" },
    { id: 2, link: "?page=employees", name: "الموظفين" },
    { id: 3, link: "?page=students", name: "الطلاب" },
    { id: 4, link: "?page=absence", name: "سجل الدوام" },
  ],
};
export default UserDashboard;

export async function getServerSideProps(ctx) {
  const { db } = await connectToDB();

  const props: any = {};

  if (ctx.req.cookies.auth_token) {
    props.currentUser = await user.getLogedUser(db, ctx.req.cookies.auth_token);
  } else {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
  }
  props.userSchool = await school.getSchoolByDirector(
    db,
    props.currentUser._id
  );
  switch (ctx.query.page) {
    case "teachers":
      props.teachersList = await employee.getEmployeesBySchool(
        db,
        props.userSchool._id
      );
  }
  // if (ctx.query.page === "teachers") {
  //   props.studentList = await employee.getEmployeesBySchool(
  //     db,
  //     props.userSchool._id
  //   );
  // }
  // if (ctx.query.page === "mangers") {
  //   props.studentList = await employee.getEmployeesBySchool(
  //     db,
  //     props.userSchool._id
  //   );
  // }
  // if (ctx.query.page === "service") {
  //   props.studentList = await employee.getEmployeesBySchool(
  //     db,
  //     props.userSchool._id
  //   );
  // }
  // if (ctx.query.page === "emptimesheet") {
  //   props.studentList = await employee.getEmployeesBySchool(
  //     db,
  //     props.userSchool._id
  //   );
  // }
  // if (ctx.query.page === "students") {
  //   props.studentList = await student.getStudentsBySchool(
  //     db,
  //     props.userSchool._id
  //   );
  // }
  // if (ctx.query.page === "employees") {
  //   props.employeeList = await employee.getEmployeesBySchool(
  //     db,
  //     props.userSchool._id
  //   );
  // }
  // if (ctx.query.page === "absence") {
  //   props.absenceList = await absence.getAbsenceBySchool(
  //     db,
  //     props.userSchool._id
  //   );
  //   props.studentList = await student.getStudentsForNewAbsence(
  //     db,
  //     props.userSchool._id
  //   );
  // }
  return {
    props,
  };
}

/**
 * todo
 *
 * add new employee
 * add informtaion to the students requerds and for employee
 * take daily Absence
 * add students marks and information
 * make student pass to the next calss
 *
 *
 */
