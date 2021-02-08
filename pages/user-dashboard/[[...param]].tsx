import React from "react";
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
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import StudentsList from "../../components/StudentList";
import UserLandingPage from "../../components/UserLandingPage";
const { Content, Footer, Sider } = Layout;

const UserDashboard = ({
  currentUser,
  userSchool,
  studentList,
  employeeList,
  absenceList,
  page,
}) => {
  const onNewStudent = async () => {
    try {
      await axios.post("/api/student/new", {
        name: "عبد الله الجمل",
        fatherName: "محمد",
        classNumber: 1,
        division: 3,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onAddEmployee = async () => {
    try {
      const { data } = await axios.post("/api/employee/new", {
        name: "صفية",
        fatherName: "عدنان",
        classNumber: [6, 3, 4],
        division: [2, 5],
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAbsence = async () => {
    const abs = [
      {
        name: "عبد الله الجمل",
        fatherName: "محمد",
        classNumber: 1,
        division: 3,
        _id: "62lrw2vaRLYKDfV2NTS8x",
      },
    ];
    try {
      const { data } = await axios.post("/api/absence/new", {
        abs,
        date: "2020",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <div>
    //   <h1>User Page</h1>
    //   <div>
    //     <h3>User info</h3>
    //     name: {currentUser && currentUser.name}
    //     <p>School name: {userSchool && userSchool.name}</p>
    //   </div>
    //   <hr />
    //   <div>
    //     <h3>Add students</h3>
    //     <button onClick={onNewStudent}>New student</button>
    //     <p>Students list:</p>
    //     {studentList &&
    //       studentList.map((s) => <p key={s._id}>name: {s.name}</p>)}
    //     <hr />
    //     <div>
    //       <h3>Add Employee</h3>
    //       <button onClick={onAddEmployee}>new Employee</button>
    //       <h3>Employee list</h3>
    //       {employeeList && employeeList.map((e) => <p key={e._id}>{e.name}</p>)}
    //     </div>
    //     <hr />
    //     <div>
    //       <h3>Absence: </h3>
    //       {studentList &&
    //         studentList.map((s) => (
    //           <div key={s._id}>
    //             <p>name: {s.name}</p>
    //             <button onClick={handleAbsence}>is absence</button>
    //           </div>
    //         ))}
    //     </div>
    //     <hr />
    //     <div>
    //       <h3>Absence List for this day:</h3>
    //       <p>{absenceList && absenceList[0]?.date}</p>
    //       {absenceList &&
    //         absenceList[0]?.abs.map((ab) => (
    //           <div key={ab._id}>
    //             <p>{ab.name}</p>
    //           </div>
    //         ))}
    //     </div>
    //   </div>
    // </div>

    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          right: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {page &&
            page.map((p) => (
              <Menu.Item key={p.id} icon={<UserOutlined />}>
                <Link href={`/user-dashboard${p.link}`}>
                  <a>{p.name}</a>
                </Link>
              </Menu.Item>
            ))}
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginRight: 200 }}>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          >
            {currentUser && !studentList && !employeeList && (
              <UserLandingPage currentUser={currentUser} />
            )}
            {studentList && <StudentsList students={studentList} />}

            {employeeList && employeeList.map((e) => e.name)}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
UserDashboard.defaultProps = {
  page: [
    { id: 1, link: "", name: "الرئيسية" },
    { id: 2, link: "?page=employees", name: "الموظفين" },
    { id: 3, link: "?page=students", name: "الطلاب" },
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
  if (ctx.query.page === "students") {
    props.studentList = await student.getStudentsBySchool(
      db,
      props.userSchool._id
    );
  }
  if (ctx.query.page === "employees") {
    props.employeeList = await employee.getEmployeesBySchool(
      db,
      props.userSchool._id
    );
  }
  if (ctx.query.page === "absence") {
    props.absenceList = await absence.getAbsenceBySchool(
      db,
      props.userSchool._id
    );
  }
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
