import { useState } from "react";
import CustomModel from "./CustomModel";
import CustomTable from "./table/TeacherTable";
import MultiStepForm from "./MultiStepForm";

const StudentList: React.FC<{ students: any[] }> = ({ students }) => {
  const [total, setTotal] = useState(students.length);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [destroyOnClose, setdestroyOnClose] = useState(false);

  const studentsColumns = [
    {
      title: "الشعبة",
      dataIndex: "division",
    },
    {
      title: "الصف",
      dataIndex: "classNumber",
      key: "2",
    },
    {
      title: "اسم الاب",
      dataIndex: "fatherName",
    },
    {
      title: "الاسم",
      dataIndex: "name",
    },
  ];

  return (
    <>
      <button onClick={() => setIsModalVisible(true)}>طالب جديد</button>
      <CustomModel
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        modelDate={
          <MultiStepForm
            // setIsModalVisible={setIsModalVisible}
            // setdestroyOnClose={setdestroyOnClose}
          />
        }
        title="تسجيل طالب جديد"
        destroyOnClose={destroyOnClose}
      />
      <p>اجمالي الطلاب {total}</p>
      {/* <CustomTable
        data={students}
        columns={studentsColumns}
        setTotal={setTotal}
      /> */}
    </>
  );
};

export default StudentList;
