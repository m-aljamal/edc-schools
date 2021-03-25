import { useEffect, useState } from "react";
import styled from "styled-components";
import { TitleStyle } from "../styles/TitleStyle";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import React from "react";
import MonthTable from "./AbcenceMonthTable";
import useSWR from "swr";
import AddNewAbcence from "./AddNewAbcence";
import { Button } from "antd";
import { Devider } from "../styles/Devider";
const TimeSheetStyle = styled.div`
  position: relative;

  .addNew {
    padding-bottom: 24px;
  }
  .table {
    margin: 50px 0;
  }
`;

const TimeSheet = ({ allEmployeeNames, type }) => {
  const [displaySheetMonth, setdisplayMonthSheet] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const res = useSWR(type === "employees" ? "/api/employee" : "/api/student", {
    initialData: allEmployeeNames,
    dedupingInterval: 60000,
  });

  const { data } = useSWR(
    type === "employees"
      ? `/api/absence/${displaySheetMonth}`
      : `/api/student/absence/${displaySheetMonth}`,
    {
      dedupingInterval: 60000,
    }
  );

  useEffect(() => {
    if (!data) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data]);

  const handleLastMonth = () => {
    setdisplayMonthSheet((current) => {
      const prev = new Date(current.setMonth(current.getMonth() - 1));

      return prev;
    });
  };
  const handNextMonth = () => {
    setdisplayMonthSheet((current) => {
      const prev = new Date(current.setMonth(current.getMonth() + 1));
      return prev;
    });
  };

  return (
    <TimeSheetStyle>
      <div className="addNew">
        <AddNewAbcence
          names={res.data}
          displaySheetMonth={displaySheetMonth}
          type={type}
        />
      </div>

      <Devider></Devider>
      <div className="table">
        <div className="head">
          <TitleStyle>جدول الغياب لتاريخ:</TitleStyle>
          <div>
            <Button
              type="primary"
              onClick={handleLastMonth}
              icon={<RightOutlined />}
              style={{ marginLeft: "10px" }}
              loading={loading}
            />
            <Button
              type="primary"
              onClick={handNextMonth}
              icon={<LeftOutlined />}
              loading={loading}
            />
          </div>
        </div>
        <h3>
          {displaySheetMonth.toLocaleDateString("ar-SY", {
            year: "numeric",
            month: "long",
          })}
        </h3>
        <div className="monthTable">
          <MonthTable
            names={res.data}
            absenceListByMonth={data}
            displaySheetMonth={displaySheetMonth}
          />
        </div>
      </div>
      <div className="devider"></div>
    </TimeSheetStyle>
  );
};

export default TimeSheet;
