import { Dropdown, Menu, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { mutate, trigger } from "swr";
import React, { useState } from "react";
import CustomModel from "../CustomModel";
import Add_Edit_teacher_form from "../forms/Add_Edit_teacher_form";
import Link from "next/link";

const DropdownMenu = ({ data, allData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [destroyOnClose, setdestroyOnClose] = useState(false);

  const handleDelete = async (id, allData) => {
    const deleteURL = "/api/employee/" + id;
    const url = "/api/employee";
    mutate(
      url,
      allData.filter((c) => c._id !== id),
      false
    );
    await axios.delete(deleteURL);
    trigger(url);
  };

  const menu = () => (
    <Menu style={{ boxShadow: "var(--bs)", borderRadius: "10px" }}>
      <Menu.Item>
        <p onClick={() => setIsModalVisible(true)}>
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
      <Menu.Item>
        <Link href={`/user-dashboard?page=teacher&profileid=${data._id}`}>
          <p>
            <EyeOutlined style={{ color: "#93a300" }} /> المزيد
          </p>
        </Link>
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
          <Add_Edit_teacher_form
            edit={true}
            setIsModalVisible={setIsModalVisible}
            setdestroyOnClose={setdestroyOnClose}
            oldData={data}
          />
        }
        title="تعديل معلومات مدرس"
        destroyOnClose={destroyOnClose}
      />
    </>
  );
};

export default DropdownMenu;
