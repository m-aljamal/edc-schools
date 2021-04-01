import dynamic from "next/dynamic";
import Link from "next/link";
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
import { connectToDB, user, school, employee, student } from "../../db";
import DashbordLayout from "../../components/shared/DashbordLayout";
import TimeSheet from "../../components/abcence/TimeSheet";
import ProfilePage from "../../components/shared/ProfilePage";
import { useRouter } from "next/router";
import Dashboard from "../../components/user-pages/Dashboard";
const NamesList = dynamic(
  () => import("../../components/user-pages/NamesList")
);
const { SubMenu } = Menu;

const UserDashboard = ({
  currentUser,
  userSchool,
  teachersList,
  administratorsList,
  teacher,
  serviceList,
  allEmployeeNames,
  studentsList,
  stutimesheetList,
  totalNumbers,
}) => {
  const router = useRouter();

  const PageCountent = () => {
    if (teachersList)
      return <NamesList type="teacher" namesList={teachersList || []} />;
    if (administratorsList)
      return (
        <NamesList type="administrators" namesList={administratorsList || []} />
      );
    if (serviceList)
      return <NamesList type="services" namesList={serviceList || []} />;
    if (teacher) return <ProfilePage userInfo={teacher} />;
    if (allEmployeeNames)
      return (
        <TimeSheet type="employees" allEmployeeNames={allEmployeeNames || []} />
      );
    if (studentsList)
      return <NamesList type="students" namesList={studentsList || []} />;
    if (stutimesheetList)
      return (
        <TimeSheet type="students" allEmployeeNames={stutimesheetList || []} />
      );
    if (totalNumbers) return <Dashboard totalNumbers={totalNumbers} />;
  };

  return (
    <DashbordLayout
      currentUser={currentUser}
      userSchool={userSchool}
      pageContent={PageCountent()}
      menuData={
        <>
          <Menu.Item key="1" icon={<FundOutlined />}>
            <Link href="/user-dashboard?page=home">الرئيسية</Link>
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
              <Link href="/user-dashboard?page=services&key=4&sub=1">
                الخدميين
              </Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<LeftOutlined />}>
              <Link href="/user-dashboard?page=emptimesheet&key=5&sub=1">
                سجل الدوام
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<SmileOutlined />} title="الطلاب">
            <Menu.Item key="6" icon={<LeftOutlined />}>
              <Link href="/user-dashboard?page=students&key=6&sub=2">
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

  if (ctx.query.page === "stutimesheet")
    props.stutimesheetList = await student.getStudentsBySchool(
      db,
      props.userSchool._id
    );
  if (ctx.query.page === "students")
    props.studentsList = await student.getStudentsBySchool(
      db,
      props.userSchool._id
    );
  if (ctx.query.page === "home")
    props.totalNumbers = await school.getTotal(db, props.userSchool._id);
  if (ctx.query.page === "teachers")
    props.teachersList = await employee.getEmployeesBySchool(
      db,
      props.userSchool._id,
      "teacher"
    );
  if (ctx.query.page === "mangers")
    props.administratorsList = await employee.getEmployeesBySchool(
      db,
      props.userSchool._id,
      "administrators"
    );
  if (ctx.query.page === "services")
    props.serviceList = await employee.getEmployeesBySchool(
      db,
      props.userSchool._id,
      "services"
    );
  if (ctx.query.page === "emptimesheet")
    props.allEmployeeNames = await employee.getAllEmployees(
      db,
      props.userSchool._id
    );
  if (ctx.query.page === "teacher")
    props.teacher = await employee.getEmployee(db, ctx.query.profileid);

  return {
    props,
  };
}
