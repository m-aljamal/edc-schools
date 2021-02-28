import CustomTable from "./customTable";
import { useState } from "react";
import PageTitleStyle from "./styles/PageTitle";
import AddNewButton from "./AddNewButton";
import MultiStepForm from "./MultiStepForm";
const TeacherList = ({ teachersList }) => {
  const [total, setTotal] = useState(teachersList.length);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [destroyOnClose, setdestroyOnClose] = useState(false);
  const teachersColumns = [
    {
      title: "الشعبة",
      dataIndex: "division",
      sorter: (a, b) => a.division - b.division,
    },
    {
      title: "الصف",
      dataIndex: "classNumber",
      sorter: (a, b) => a.classNumber - b.classNumber,
    },
    {
      title: "اسم الاب",
      dataIndex: "fatherName",
      sorter: (a, b) => a.fatherName - b.fatherName,
    },
    {
      title: "الاسم",
      dataIndex: "name",
      sorter: (a, b) => a.name - b.name,
    },
  ];
  return (
    <div>
      <PageTitleStyle>
        <AddNewButton
          destroyOnClose={destroyOnClose}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          modelTitle="اضافة مدرس جديد"
          modelData={
            <MultiStepForm
              setIsModalVisible={setIsModalVisible}
              setdestroyOnClose={setdestroyOnClose}
            />
          }
        />
        <h3 style={{ textAlign: "end" }}>:جميع المدرسين</h3>
      </PageTitleStyle>
      <CustomTable
        columns={teachersColumns}
        data={teachersList}
        setTotal={setTotal}
      />
    </div>
  );
};

export default TeacherList;
