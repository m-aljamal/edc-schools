import CustomTable from "./table/TeacherTable";
import React, { useState, useEffect } from "react";
import PageTitleStyle from "./styles/PageTitle";
import AddNewButton from "./AddNewButton";
import useSWR from "swr";
import Add_Edit_teacher_form from "./forms/Add_Edit_teacher_form";
import { TitleStyle } from "./styles/TitleStyle";
const TeacherList = ({ teachersList }) => {
  const [total, setTotal] = useState(teachersList.length);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [destroyOnClose, setdestroyOnClose] = useState(false);

  useEffect(() => {
    setTotal(teachersList.length);
  }, [teachersList]);
  return (
    <div>
      <PageTitleStyle>
        <AddNewButton
          destroyOnClose={destroyOnClose}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          modelTitle="اضافة مدرس جديد"
          modelData={
            <Add_Edit_teacher_form
              oldData={undefined}
              edit={false}
              setIsModalVisible={setIsModalVisible}
              setdestroyOnClose={setdestroyOnClose}
            />
          }
        />
        <TitleStyle>جميع المدرسين:</TitleStyle>
      </PageTitleStyle>
      <CustomTable allData={teachersList} setTotal={setTotal} total={total} />
    </div>
  );
};

export default TeacherList;
