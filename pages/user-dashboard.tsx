import React from "react";
import { connectToDB, user, school, student, employee } from "../db";
import axios from "axios";
const userDashboard = ({
  currentUser,
  userSchool,
  studentList,
  employeeList,
}) => {
  const onNewStudent = async () => {
    try {
      await axios.post("/api/student/new", {
        name: "عبد الله بها  ء احمد",
        fatherName: "أحمد",
        classNumber: 2,
        division: 5,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onAddEmployee = async () => {
    try {
      const { data } = await axios.post("/api/employee/new", {
        name: "بثينة",
        fatherName: "أحمد",
        classNumber: [1, 3, 4],
        division: [2, 5],
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>User Page</h1>
      <div>
        <h3>User info</h3>
        name: {currentUser && currentUser.name}
        <p>School name: {userSchool && userSchool.name}</p>
      </div>
      <hr />
      <div>
        <h3>Add students</h3>
        <button onClick={onNewStudent}>New student</button>
        <p>Students list:</p>
        {studentList &&
          studentList.map((s) => <p key={s._id}>name: {s.name}</p>)}
        <hr />
        <div>
          <h3>Add Employee</h3>
          <button onClick={onAddEmployee}>new Employee</button>
          <h3>Employee list</h3>
          {employeeList && employeeList.map((e) => <p key={e._id}>{e.name}</p>)}
        </div>
      </div>
    </div>
  );
};

export default userDashboard;

export async function getServerSideProps(ctx) {
  const { db } = await connectToDB();
  let currentUser;
  if (ctx.req.cookies.auth_token) {
    currentUser = await user.getLogedUser(db, ctx.req.cookies.auth_token);
  } else {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
  }
  const userSchool = await school.getSchoolByDirector(db, currentUser._id);
  const studentList = await student.getStudents(db);
  const employeeList = await employee.getEmployees(db);
  return {
    props: { currentUser, userSchool, studentList, employeeList },
  };
}

/**
 * todo
 * add new student
 * add new employee
 * add informtaion to the students requerds and for employee
 * take daily Absence
 * add students marks and information
 * make student pass to the next calss
 */
