import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Gender from "../Dashbord/Gender";
import TotalNumerCardInfo from "../Dashbord/TotalNumerCardInfo";
import BarCart from "../Dashbord/BarCart";
import LineCard from "../Dashbord/LineCard";
import TotalByDivionContainer from "../Dashbord/TotalByDivionContainer";
import Pie from "../Dashbord/Pie";
import { FindAbcenseByDate } from "../statistics/FindAbcenseByDate";
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
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12%;
  }
  .barChartStyle {
    display: flex;
    gap: 20px;
    margin-top: 30px;
  }
  .barContainer {
    width: 50%;
    background-color: white;
    border-radius: 12px;
  }
  .abs {
    padding: 20px;
    border-radius: 15px;
    box-shadow: var(--bs);
    span {
      color: var(--blue);
      font-weight: bold;
    }
  }
`;
const getTotalByClassNumber = (division) => {
  return [
    ...Array.from(
      new Set(
        division.map((d: { _id: { classNumber: string } }) => d._id.classNumber)
      )
    ),
  ];
};

const Dashboard = ({ totalNumbers, schoolId, isAdmin }) => {
  const [totalAbcense, setTotalAbcense] = useState(null);
  const [totalStudentsAbcesnse, setTotalAbcenseStudentsAbcesnse] = useState(
    null
  );
  useEffect(() => {
    setTotalAbcense(null);
    setTotalAbcenseStudentsAbcesnse(null);
  }, [schoolId]);
  return (
    <DashboaedStyle>
      {/* <div>
        <div className="totalInfoCard">
          <TotalNumerCardInfo
            data={{
              total:
                totalNumbers?.totalStudents[0]?.totalStudents[0]?.totalStudents,
              _id: { type: "students" },
            }}
          />
          {totalNumbers?.totalEmployee[0]?.employeeType?.map(
            (em: any, i: string | number) => (
              <TotalNumerCardInfo data={em} key={i} />
            )
          )}
        </div>
        <div className="barChartStyle ">
          <div className="barContainer abs">
            <h3>عدد غياب الموظفين:</h3>
            <FindAbcenseByDate
              setAbcenceData={setTotalAbcense}
              type={"employees"}
              schoolId={schoolId}
              isAdmin={isAdmin}
            />
            {totalAbcense && (
              <p>
                عدد الغياب في هذا التاريخ: <span>{totalAbcense}</span>
              </p>
            )}
          </div>
          <div className="barContainer abs">
            <div> عدد غياب الطلاب :</div>
            <FindAbcenseByDate
              setAbcenceData={setTotalAbcenseStudentsAbcesnse}
              type={"students"}
              schoolId={schoolId}
              isAdmin={isAdmin}
            />
            {totalStudentsAbcesnse && (
              <p>
                عدد الغياب في هذا التاريخ: <span>{totalStudentsAbcesnse}</span>
              </p>
            )}
          </div>
        </div>
        <div className="genderContainer">
          <Gender
            data={totalNumbers?.totalEmployee[0]?.gender}
            type="الموظفين"
          />
          <Gender data={totalNumbers?.totalStudents[0]?.gender} type="الطلاب" />
        </div>

        <div className="barChartStyle">
          <div className="barContainer">
            <BarCart
              dataArray={totalNumbers?.totalEmployee[0]?.jobTitle}
              title="اعداد الاداريين حسب المسمى الوظيفي "
              type="jobTitle"
            />
          </div>
          <div className="barContainer">
            <BarCart
              dataArray={totalNumbers?.totalEmployee[0]?.classNumber}
              title="اعداد المدرسين حسب الصفوف"
              type="classNumber"
            />
          </div>
        </div>
        <div className="barChartStyle">
          <div className="barContainer">
            <BarCart
              dataArray={totalNumbers?.totalEmployee[0]?.subject}
              title="اعداد المدرسين حسب المادة"
              type="subject"
            />
          </div>
          <div className="barContainer">
            <BarCart
              dataArray={totalNumbers?.totalEmployee[0]?.typeOfDegree}
              title="اعداد الموظفين حسب الاختصاص "
              type="typeOfDegree"
            />
          </div>
        </div>
        <LineCard
          data={totalNumbers?.totalEmployee[0]?.typeOfCertifcate}
          total={
            totalNumbers?.totalEmployee[0]?.totalEmployee[0]?.totalEmployee
          }
          type="TypeOfCertifcate"
          text="اعداد الموظفين حسب التحصيل العلمي:"
        />

        <TotalByDivionContainer
          totalClass={getTotalByClassNumber(
            totalNumbers?.totalEmployee[0]?.division
          )}
          division={totalNumbers?.totalEmployee[0]?.division}
          text="اعداد المدرسين حسب توزيع الشعب:"
        />
        <LineCard
          data={totalNumbers?.totalStudents[0]?.classNumber}
          total={
            totalNumbers?.totalStudents[0]?.totalStudents[0]?.totalStudents
          }
          type="classNumber"
          text="اعداد الطلاب حسب الصف :"
        />
        <TotalByDivionContainer
          totalClass={getTotalByClassNumber(
            totalNumbers?.totalStudents[0]?.division
          )}
          division={totalNumbers?.totalStudents[0]?.division}
          text="اعداد الطلاب حسب توزيع الشعب:"
        />

        <div className="genderContainer">
          <Pie
            text="الوضع الاجتماعي للطلاب:"
            total={
              totalNumbers?.totalStudents[0]?.totalStudents[0]?.totalStudents
            }
            pieData={totalNumbers?.totalStudents[0]?.familySituation}
            type="familySituation"
          />
          <Pie
            text="الوضع الصحي للطلاب:"
            total={
              totalNumbers?.totalStudents[0]?.totalStudents[0]?.totalStudents
            }
            pieData={totalNumbers?.totalStudents[0]?.healthSituation}
            type="healthSituation"
          />
        </div>
      </div> */}
    </DashboaedStyle>
  );
};

export default Dashboard;
