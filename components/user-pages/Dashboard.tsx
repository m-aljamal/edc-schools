import styled from "styled-components";
import React from "react";
import Gender from "../Dashbord/Gender";
import TotalNumerCardInfo from "../Dashbord/TotalNumerCardInfo";
import BarCart from "../Dashbord/BarCart";
import { calculateAvrage } from "../../utils/calculateAvrage";
import TotalTeachersByClassAndDivion from "../Dashbord/TotalTeachersByClassAndDivion";
import LineCard from "../Dashbord/LineCard";
const DashboaedStyle = styled.div`
  position: relative;
  .totalInfoCard {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }
  .genderContainer {
    margin-top: 50px;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12%;
  }
`;

const Dashboard = ({ totalNumbers }) => {
  console.log(totalNumbers);

  const totalTecherByClassNumber = [
    ...Array.from(
      new Set(
        totalNumbers.totalEmployee[0].division.map(
          (d: { _id: { classNumber: string } }) => d._id.classNumber
        )
      )
    ),
  ];

  return (
    <DashboaedStyle>
      <div>
        <div className="totalInfoCard">
          <TotalNumerCardInfo
            data={{
              total:
                totalNumbers.totalStudents[0].totalStudents[0].totalStudents,
              _id: { type: "students" },
            }}
          />
          {totalNumbers?.totalEmployee[0].employeeType.map(
            (em: any, i: string | number) => (
              <TotalNumerCardInfo data={em} key={i} />
            )
          )}
        </div>
        <div className="genderContainer">
          <Gender
            data={totalNumbers?.totalEmployee[0].gender}
            type="الموظفين"
          />
          <Gender data={totalNumbers.totalStudents[0].gender} type="الطلاب" />
        </div>
        <LineCard
          data={totalNumbers.totalEmployee[0].jobTitle}
          total={totalNumbers.totalEmployee[0].totalEmployee[0].totalEmployee}
        />
        <BarCart
          dataArray={totalNumbers.totalEmployee[0].jobTitle}
          title="اعداد الاداريين حسب المسمى الوظيفي "
          type="jobTitle"
        />

        <BarCart
          dataArray={totalNumbers.totalEmployee[0].subject}
          title="اعداد المدرسين حسب المادة"
          type="subject"
        />
        <BarCart
          dataArray={totalNumbers.totalEmployee[0].classNumber}
          title="اعداد المدرسين حسب الصفوف"
          type="classNumber"
        />
        <BarCart
          dataArray={totalNumbers.totalEmployee[0].typeOfCertifcate}
          title="اعداد الموظفين حسب التحصيل العلمي"
          type="TypeOfCertifcate"
        />
        <BarCart
          dataArray={totalNumbers.totalEmployee[0].typeOfDegree}
          title="اعداد الموظفين حسب الاختصاص "
          type="typeOfDegree"
        />

        <p> اعداد المدرسين حسب توزيع الشعب:</p>
        {totalTecherByClassNumber.map((clas, i) => (
          <TotalTeachersByClassAndDivion
            key={i}
            classNumber={clas}
            division={totalNumbers.totalEmployee[0].division}
          />
        ))}
      </div>
    </DashboaedStyle>
  );
};

export default Dashboard;
