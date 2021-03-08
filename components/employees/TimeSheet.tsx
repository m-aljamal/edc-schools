import { useState } from "react";
import styled from "styled-components";
import { TitleStyle } from "../styles/TitleStyle";
import DataTransfer from "../DataTransfer";
import { DatePicker, Input } from "antd";
import SkeletonLoading from "../SkeletonLoading";
import axios from "axios";
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
const TimeSheet = ({ data }) => {
  if (!data) return <SkeletonLoading />;
  const [absenceIds, setAbsenceIds] = useState([]);
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const handleTimeSheet = async () => {
    try {
      const res = await axios.post("/api/absence/new", {
        absenceIds,
        date,
        reason,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TimeSheetStyle>
      <div className="addNew">
        <TitleStyle>:تسجيل غياب جديد</TitleStyle>
        <DatePicker onChange={(date, dateString) => setDate(dateString)} />
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
      </div>
    </TimeSheetStyle>
  );
};

export default TimeSheet;
