import { useState } from "react";
import styled from "styled-components";
import { TitleStyle } from "../styles/TitleStyle";
import DataTransfer from "../DataTransfer";
import { DatePicker, Input } from "antd";
import SkeletonLoading from "../SkeletonLoading";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import MonthTable from "./MonthTable";
const { TextArea } = Input;
const TimeSheetStyle = styled.div`
  position: relative;
  .devider {
    height: 30px;
    background-color: var(--background);
    position: absolute;
    right: -25px;
    left: -25px;
  }
  .addNew {
    padding-bottom: 24px;
  }
  .table {
    margin-top: 50px;
  }
`;
const TimeSheet = ({ data, absenceListByMonth, absenceListByDay }) => {
  if (!data) return <SkeletonLoading />;
  console.log(absenceListByMonth);

  const [absenceIds, setAbsenceIds] = useState([]);
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const router = useRouter();
  const handleTimeSheet = async () => {
    try {
      const res = await axios.put("/api/absence/new", {
        absenceIds,
        date,
        reason,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddingDate = (date, datestring) => {
    console.log(datestring);

    setDate(datestring);
  };
  const handleSerchDate = (date, dateString) => {
    console.log(date);
    router.push(
      `user-dashboard?page=emptimesheet&key=5&sub=1&date=${dateString}`
    );
  };

  return (
    <TimeSheetStyle>
      <div className="addNew">
        <TitleStyle>:تسجيل غياب جديد</TitleStyle>
        <DatePicker onChange={handleAddingDate} />
        <DataTransfer
          data={data}
          setTargetKeys={setAbsenceIds}
          targetKeys={absenceIds}
        />
        <TextArea
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          placeholder="سبب الغياب"
        />
        <button onClick={handleTimeSheet}>حفظ</button>
      </div>

      <div className="devider"></div>
      <div className="table">
        <TitleStyle>:جدول الغياب</TitleStyle>
        <DatePicker onChange={handleSerchDate} />
        <div className="absenceList">
          {!absenceListByDay ? (
            <p>لايوجد غياب</p>
          ) : (
            <>
              <p>سبب الغياب: {absenceListByDay?.findAbsences?.reason}</p>
              <p>التاريخ: {absenceListByDay?.findAbsences?.date}</p>
              <div>
                <p>اسماء الغياب</p>
                <ul>
                  {absenceListByDay?.users?.map((user) => (
                    <li key={user._id}>{user.name}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
        <MonthTable names={data} absenceListByMonth={absenceListByMonth} />
      </div>
    </TimeSheetStyle>
  );
};
// findAbsences:
// absenceIds: (2) ["Xd8sJOYWj4SX7RoXmnbWG", "6V7FZ1aXw5hgtguQOHXUq"]
// date: "2021-03-08"
// reason: "مرض"
// schoolId: "3l-FKqSDBZBwuBgramn2j"
// _id: "uXuzlUCyCBRmW2gOn2d3J"
// __proto__: Object
// users: Array(2)
// 0:
// name: "فاطمة رمضان"
// _id: "6V7FZ1aXw5hgtguQOHXUq"

export default TimeSheet;
