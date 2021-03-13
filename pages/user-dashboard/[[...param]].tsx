import dynamic from "next/dynamic";
import Link from "next/link";
import { Menu } from "antd";
import useSWR from "swr";
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
import { connectToDB, user, school, employee, absence } from "../../db";
import DashbordLayout from "../../components/DashbordLayout";
import { useRouter } from "next/router";
import Profile from "../../components/Profile";
import TimeSheet from "../../components/employees/TimeSheet";

const TeacherList = dynamic(() => import("../../components/TeacherList"));
const { SubMenu } = Menu;

const UserDashboard = ({
  currentUser,
  userSchool,
  teachersList,
  absenceListByMonth,
  absenceListByDay,
}) => {
  const { data } = useSWR("/api/employee", { initialData: teachersList });

  const router = useRouter();

  const PageCountent = () => {
    if (teachersList) return <TeacherList teachersList={data || []} />;
    const { profileid } = router.query;
    const profileData = data?.find((p) => p._id === profileid);
    if (router.query.page === "teacher") return <Profile data={profileData} />;
    if (router.query.page === "emptimesheet")
      return (
        <TimeSheet
          data={data}
          absenceListByDay={absenceListByDay}
          absenceListByMonth={absenceListByMonth}
        />
      );
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
            <Menu.Item key="2" icon={<LeftOutlined />}>
              <Link href="/user-dashboard?page=teachers&key=2&sub=1">
                المدرسين
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<LeftOutlined />}>
              <Link href="/user-dashboard?page=mangers&key=3&sub=1">
                الاداريين
              </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<LeftOutlined />}>
              <Link href="/user-dashboard?page=service">الخدميين</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<LeftOutlined />}>
              <Link href="/user-dashboard?page=emptimesheet&key=5&sub=1">
                سجل الدوام
              </Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<LeftOutlined />}>
              <Link href="/user-dashboard?page=newemployee">
                اضافة موظف جديد
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<SmileOutlined />} title="الطلاب">
            <Menu.Item key="7" icon={<LeftOutlined />}>
              <Link href="/user-dashboard?page=students&key=7&sub=2">
                جميع الطلاب
              </Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<LeftOutlined />}>
              <Link href="/user-dashboard?page=stutimesheet&key=8&sub=2">
                سجل الدوام
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<BarcodeOutlined />}>
            <Link href="/user-dashboard?page=schoolassets&key=9">
              موجودات المدرسة
            </Link>
          </Menu.Item>
          <Menu.Item key="10" icon={<BookOutlined />}>
            <Link href="/user-dashboard?page=schoollibrary&key=10">
              مكتبة المدرسة
            </Link>
          </Menu.Item>
          <Menu.Item key="11" icon={<CalculatorOutlined />}>
            <Link href="/user-dashboard?page=schoollibrary&key=11">
              البرنامج الاسبوعي
            </Link>
          </Menu.Item>
          <Menu.Item key="12" icon={<FileDoneOutlined />}>
            <Link href="/user-dashboard?page=schoollibrary&key=12">
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
    case "emptimesheet":
      const month =  +ctx.query.month;

      props.absenceListByMonth = await absence.absenceMonthPreview(
        db,
        props.userSchool._id,
        month
      );
  }
  if (ctx.query.date) {
    props.absenceListByDay = await absence.getAbsenceBySchoolAndDate(
      db,
      props.userSchool._id,
      ctx.query.date
    );
  }

  //   // if (ctx.query.page === "teachers") {
  //   //   props.studentList = await employee.getEmployeesBySchool(
  //   //     db,
  //   //     props.userSchool._id
  //   //   );
  //   // }
  //   // if (ctx.query.page === "mangers") {
  //   //   props.studentList = await employee.getEmployeesBySchool(
  //   //     db,
  //   //     props.userSchool._id
  //   //   );
  //   // }
  //   // if (ctx.query.page === "service") {
  //   //   props.studentList = await employee.getEmployeesBySchool(
  //   //     db,
  //   //     props.userSchool._id
  //   //   );
  //   // }
  //   // if (ctx.query.page === "emptimesheet") {
  //   //   props.studentList = await employee.getEmployeesBySchool(
  //   //     db,
  //   //     props.userSchool._id
  //   //   );
  //   // }
  //   // if (ctx.query.page === "students") {
  //   //   props.studentList = await student.getStudentsBySchool(
  //   //     db,
  //   //     props.userSchool._id
  //   //   );
  //   // }
  //   // if (ctx.query.page === "employees") {
  //   //   props.employeeList = await employee.getEmployeesBySchool(
  //   //     db,
  //   //     props.userSchool._id
  //   //   );
  //   // }
  //   // if (ctx.query.page === "absence") {
  //   //   props.absenceList = await absence.getAbsenceBySchool(
  //   //     db,
  //   //     props.userSchool._id
  //   //   );
  //   //   props.studentList = await student.getStudentsForNewAbsence(
  //   //     db,
  //   //     props.userSchool._id
  //   //   );
  //   // }
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
