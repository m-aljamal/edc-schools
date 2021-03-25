import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import React from "react";
import { Devider } from "../styles/Devider";
import Gender from "../Dashbord/Gender";
import { TitleStyle } from "../styles/TitleStyle";
const DashboaedStyle = styled.div`
  position: relative;
  .totalInfo {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 50px;
  }
  .students {
    margin-top: 50px;
  }
`;

const Dashboard = ({ totalNumbers }) => {
  console.log(totalNumbers?.totalStudents[0]);

  // const words = {
  //   students: {
  //     name: " طلاب",
  //     count: totalNumbers.students,
  //     icon: "/icons/student.svg",
  //   },
  //   teachers: {
  //     name: "معلم",
  //     count: totalNumbers.teachers,
  //     icon: "/icons/classroom.svg",
  //   },
  //   administrators: {
  //     name: " اداري",
  //     count: totalNumbers.administrators,
  //     icon: "/icons/manager.svg",
  //   },
  //   services: {
  //     name: " خدمي",
  //     count: totalNumbers.services,
  //     icon: "/icons/cleaning-staff.svg",
  //   },
  // };
  const femalTotal = totalNumbers?.totalStudents[0].gender[0].total;
  const maleTotal = totalNumbers?.totalStudents[0].gender[1].total;
  const gender = {
    datasets: [
      {
        data: [
          Math.round((femalTotal / (femalTotal + maleTotal)) * 100),
          Math.round((maleTotal / (femalTotal + maleTotal)) * 100),
        ],

        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverBackgroundColor: "rgb(255, 205, 86)",
        borderWidth: 2,
      },
    ],
    labels: ["ذكور", "اناث"],
  };
  return (
    <DashboaedStyle>
      <div>
        <TitleStyle>الموظفين:</TitleStyle>
        <Gender data={gender} femalTotal={femalTotal} maleTotal={maleTotal} />
        <Devider></Devider>
        <TitleStyle className="students">الطلاب:</TitleStyle>
      </div>
    </DashboaedStyle>
  );
};

export default Dashboard;

const SingleInfoStyle = styled.div`
  display: flex;
  padding: 15px 0;
  align-items: center;
  box-shadow: var(--bs);
  justify-content: space-evenly;
  border-radius: 5px;
  background-color: white;
  .icon {
    width: 50px;
  }
`;

const SingleInfo = ({ data }) => {
  return (
    <SingleInfoStyle>
      <div>
        <p>{data?.count}</p>
        <p>{data?.name}</p>
      </div>
      <img src={data?.icon} alt="icon" className="icon" />
    </SingleInfoStyle>
  );
};
