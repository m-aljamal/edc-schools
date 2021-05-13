import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  CloseOutlined,
} from "@ant-design/icons";
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
    <div className="container mt-8">
      <div className="flex justify-between items-center">
        <div className="mb-8 font-bold">
          {isEdit ? "تعديل غياب سابق" : "تسجيل غياب جديد:"}
        </div>
        {isEdit ? (
          <CloseOutlined
            className="text-red-800"
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
    </div>
  );
};

export default AddNewAbcence;
