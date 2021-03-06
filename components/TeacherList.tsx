import CustomTable from "./customTable";
import { useState } from "react";
import PageTitleStyle from "./styles/PageTitle";
import AddNewButton from "./AddNewButton";

import CustomMultiStepForm from "./CustomMultiStepForm";
const TeacherList = ({ teachersList }) => {
  const [total, setTotal] = useState(teachersList.length);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [destroyOnClose, setdestroyOnClose] = useState(false);
  
  return (
    <div>
      <PageTitleStyle>
        <AddNewButton
          destroyOnClose={destroyOnClose}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          modelTitle="اضافة مدرس جديد"
          modelData={
            <CustomMultiStepForm
              setIsModalVisible={setIsModalVisible}
              setdestroyOnClose={setdestroyOnClose}
            />
          }
        />
        <h3 style={{ textAlign: "end" }}>:جميع المدرسين</h3>
      </PageTitleStyle>
      <CustomTable
       
        allData={teachersList}
        setTotal={setTotal}
        total={total}
      />
    </div>
  );
};

export default TeacherList;
