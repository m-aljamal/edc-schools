import AbsenceTable from "./AbsenceTable";
import { useState } from "react";
import axios from "axios";
import CustomModel from "./CustomModel";
const AbsencePage = ({ absenceList, studentList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [destroyOnClose, setdestroyOnClose] = useState(false);

  const handleSubmitAbsence = async (list, date) => {
    try {
      const { data } = await axios.post("/api/absence/new", {
        list,
        date,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAbsenceStudents = (list, date) => {
    handleSubmitAbsence(list, date);
  };
  return (
    <div>
      Abcence list
      <button onClick={() => setIsModalVisible(true)}>طالب جديد</button>
      <CustomModel
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="تسجيل الغياب"
        destroyOnClose={destroyOnClose}
        modelDate={
          <AbsenceTable
            studentList={studentList}
            getAbsenceStudents={getAbsenceStudents}
            setIsModalVisible={setIsModalVisible}
          />
        }
      />
    </div>
  );
};

export default AbsencePage;
