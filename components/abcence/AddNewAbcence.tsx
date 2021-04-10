import dynamic from "next/dynamic";
import React, { useState } from "react";
import { TitleStyle } from "../styles/TitleStyle";
import { Dropdown, Menu } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { NewAbcenceStyle } from "../styles/NewAbcenceStyle";
import StudentsAbcenceForm from "./StudentsAbcenceForm";
import EmployeesAbcenceForm from "./EmployeesAbcenceForm";
 const EditAbcenceForm = dynamic(() => import("./EditAbcence"));

const AddNewAbcence = ({ names, displaySheetMonth, type }) => {
  const [isEdit, setIsEdit] = useState(false);

  const menu = () => (
    <Menu style={{ boxShadow: "var(--bs)", borderRadius: "10px" }}>
      <Menu.Item>
        <p onClick={() => setIsEdit(true)}>
          <EditOutlined style={{ color: "#488853" }} /> تعديل
        </p>
      </Menu.Item>
    </Menu>
  );

  return (
    <NewAbcenceStyle>
      <div className="head">
        <TitleStyle>
          {isEdit ? "تعديل غياب سابق" : "تسجيل غياب جديد:"}
        </TitleStyle>
        {isEdit ? (
          <CloseOutlined
            style={{ color: "red" }}
            onClick={() => setIsEdit(false)}
          />
        ) : (
          <Dropdown overlay={menu} trigger={["click"]}>
            <EllipsisOutlined />
          </Dropdown>
        )}
      </div>
      {isEdit ? (
        <EditAbcenceForm
          type={type}
          setIsEdit={setIsEdit}
          names={names}
          displaySheetMonth={displaySheetMonth}
        />
      ) : type === "students" ? (
        <StudentsAbcenceForm
          names={names}
          displaySheetMonth={displaySheetMonth}
        />
      ) : (
        <EmployeesAbcenceForm
          names={names}
          displaySheetMonth={displaySheetMonth}
        />
      )}
    </NewAbcenceStyle>
  );
};

export default AddNewAbcence;
