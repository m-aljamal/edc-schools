import { useState } from "react";
import AddSchoolAssets from "../forms/AddSchoolAssets";
import AddNewButton from "../shared/AddNewButton";
import DocsList from "../persons/DocsList";
import AddDoc from "../forms/AddDoc";
import TeacherDocList from "../persons/TeacherDocList";
import AddTeacherDoc from "../forms/AddTeacherDoc";
export default function AdministrativeDocs({ schoolId, ...props }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [destroyOnClose, setdestroyOnClose] = useState(false);
  return (
    <div className=" container pt-8">
      <div className="flex justify-between mb-10">
        <div className="font-bold md:text-lg text-base">الملفات الادارية:</div>
        <AddNewButton
          destroyOnClose={destroyOnClose}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          modelTitle={`رفع ملف جديد`}
          modelData={
            props.teacher ? (
              <AddTeacherDoc
                setIsModalVisible={setIsModalVisible}
                setdestroyOnClose={setdestroyOnClose}
              />
            ) : (
              <AddDoc
                setIsModalVisible={setIsModalVisible}
                setdestroyOnClose={setdestroyOnClose}
              />
            )
          }
        />
      </div>
      {props.teacher ? <TeacherDocList /> : <DocsList />}
    </div>
  );
}
