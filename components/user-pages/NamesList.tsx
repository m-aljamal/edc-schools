import CustomTable from "../table/TeacherTable";
import React, { useState, useEffect } from "react";
import PageTitleStyle from "../styles/PageTitle";
import AddNewButton from "../shared/AddNewButton";
import Add_Edit_teacher_form from "../add-new-employee/Add_Edit_teacher_form";
import { TitleStyle } from "../styles/TitleStyle";
import useSWR from "swr";
const NamesList = ({ namesList, type }) => {
  const employeeUrl = `/api/employee/find/${type}`;
  const studentsUrl = `/api/student/`;

  const { data } = useSWR(type === "students" ? studentsUrl : employeeUrl, {
    initialData: namesList,
    dedupingInterval: 60000,
  });

  const [total, setTotal] = useState(data.length);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [destroyOnClose, setdestroyOnClose] = useState(false);

  useEffect(() => {
    setTotal(data.length);
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
