import CustomTable from "../table/TeacherTable";
import React, { useState, useEffect } from "react";
import PageTitleStyle from "../styles/PageTitle";
import AddNewButton from "../shared/AddNewButton";
import Add_Edit_teacher_form from "../add-new-employee/Add_Edit_teacher_form";
import { TitleStyle } from "../styles/TitleStyle";
import useSWR from "swr";
import axios from "axios";
const NamesList = ({ type, schoolId }) => {
  const employeeUrl = `/api/employee/find/${type}`;
  const studentsUrl = `/api/student/`;

  const feacher = (url, schoolId) =>
    axios.get(url, { headers: { schoolId } }).then((res) => res.data);

  const { data } = schoolId
    ? useSWR(
        [type === "students" ? studentsUrl : employeeUrl, schoolId],
        feacher
      )
    : useSWR(type === "students" ? studentsUrl : employeeUrl, {
        dedupingInterval: 60000,
      });

  const [total, setTotal] = useState(data?.length);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [destroyOnClose, setdestroyOnClose] = useState(false);

  useEffect(() => {
    setTotal(data?.length);
  }, [data]);

  const words = {
    teacher: {
      add: "مدرس",
      all: "المدرسين",
    },
    administrators: {
      add: "اداري",
      all: "الاداريين",
    },
    services: {
      add: "مستخدم",
      all: "مستخدمين",
    },
    students: {
      add: "طالب",
      all: "طلاب",
    },
  };

  return (
    <div>
      <PageTitleStyle>
        <AddNewButton
          destroyOnClose={destroyOnClose}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          modelTitle={`اضافة ${words[type].add} جديد`}
          modelData={
            <Add_Edit_teacher_form
              data={data}
              type={type}
              oldData={undefined}
              edit={false}
              setIsModalVisible={setIsModalVisible}
              setdestroyOnClose={setdestroyOnClose}
            />
          }
        />
        <TitleStyle>جميع {words[type].all}:</TitleStyle>
      </PageTitleStyle>
      <CustomTable
        allData={data}
        setTotal={setTotal}
        total={total}
        type={type}
      />
    </div>
  );
};

export default NamesList;
