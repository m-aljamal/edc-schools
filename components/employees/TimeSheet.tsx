import { useEffect, useState } from "react";
import styled from "styled-components";
import { TitleStyle } from "../styles/TitleStyle";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import React from "react";
import MonthTable from "./AbcenceMonthTable";
import useSWR from "swr";
import AddNewAbcence from "./AddNewAbcence";
import { Button } from "antd";
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
    margin: 50px 0;
  }
  .table {
    padding-bottom: 24px;
  }
`;
const TimeSheet = ({ names }) => {
  const [displaySheetMonth, setdisplayMonthSheet] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const { data } = useSWR(`/api/absence/${displaySheetMonth}`, {
    dedupingInterval: 60000,
  });

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
            names={names}
            absenceListByMonth={data}
            displaySheetMonth={displaySheetMonth}
          />
        </div>
      </div>

      <div className="devider"></div>
      <div className="addNew">
        <AddNewAbcence names={names} displaySheetMonth={displaySheetMonth} />
      </div>
      <div className="devider"></div>
    </TimeSheetStyle>
  );
};

export default TimeSheet;
