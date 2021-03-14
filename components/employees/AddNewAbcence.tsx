import dynamic from "next/dynamic";
import { useState } from "react";
import { TitleStyle } from "../styles/TitleStyle";
import { Dropdown, Menu } from "antd";
import styled from "styled-components";
import {
  EditOutlined,
  EllipsisOutlined,
  CloseOutlined,
} from "@ant-design/icons";
const AddNewAbcenceForm = dynamic(() => import("./AddNewAbcenceForm"));
const EditAbcenceForm = dynamic(() => import("./EditAbcenceForm"));


const NewAbcenceStyle = styled.div`
  .ant-transfer {
    justify-content: start !important;
  }
  .submitButton {
    max-width: 30%;
    margin: 0 auto;
  }
`;

const AddNewAbcence = ({ names, displaySheetMonth }) => {
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
        <EditAbcenceForm />
      ) : (
        <AddNewAbcenceForm
          names={names}
          displaySheetMonth={displaySheetMonth}
        />
      )}
    </NewAbcenceStyle>
  );
};

export default AddNewAbcence;
