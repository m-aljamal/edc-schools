import { Dropdown, Menu, message, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { mutate, trigger } from "swr";
import React, { useState } from "react";
import CustomModel from "../shared/CustomModel";
import Add_Edit_teacher_form from "../persons/Add_Edit_teacher_form";
import ProfilePage from "../persons/ProfilePage";

const DropdownMenu = ({ data, allData, type, isAdmin }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [destroyOnClose, setdestroyOnClose] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleDelete = async (id, allData) => {
    try {
      const deleteURL = `/api/names/${type}/${id}`;
      const url = `/api/names/${type}`;
      mutate(
        url,
        allData.filter((c) => c._id !== id),
        false
      );
      const res = await axios.delete(deleteURL);
      trigger(url);
      if (res.status === 200) {
        message.success("تم حذف الاسم بنجاح");
      }
    } catch (error) {
      console.log(error);
      message.error(error?.response?.data?.error);
    }
  };

  const hansleShowProfile = () => {
    setShowProfile(true);
    setIsModalVisible(true);
  };

  const handleEdit = () => {
    setShowProfile(false);
    setIsModalVisible(true);
  };

  const menu = () => (
    <Menu style={{ boxShadow: "var(--bs)", borderRadius: "10px" }}>
      {!isAdmin && (
        <>
          <Menu.Item>
            <p onClick={handleEdit}>
              <EditOutlined style={{ color: "#488853" }} /> تعديل
            </p>
          </Menu.Item>
          <Menu.Item>
            <Popconfirm
              cancelText="لا"
              okText="نعم"
              title="هل متأكد من الحذف"
              onConfirm={() => handleDelete(data._id, allData)}
            >
              <p>
                <DeleteOutlined style={{ color: "red" }} /> حذف
              </p>
            </Popconfirm>
          </Menu.Item>
        </>
      )}
      <Menu.Item>
        <p onClick={hansleShowProfile}>
          <EyeOutlined style={{ color: "#93a300" }} /> المزيد
        </p>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <EllipsisOutlined />
      </Dropdown>

      <CustomModel
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        modelDate={
          showProfile ? (
            <ProfilePage data={data} type={type} />
          ) : (
            <Add_Edit_teacher_form
              edit={true}
              type={type}
              setIsModalVisible={setIsModalVisible}
              setdestroyOnClose={setdestroyOnClose}
              oldData={data}
            />
          )
        }
        title={
          showProfile
            ? `معلومات ${data.name}`
            : `تعديل معلومات ${type === "students" ? "طالب" : "موظف"}`
        }
        destroyOnClose={destroyOnClose}
      />
    </>
  );
};

export default DropdownMenu;
