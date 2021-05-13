import { useState } from "react";
import AddNewButton from "../shared/AddNewButton";
import Add_Edit_teacher_form from "../add-new-employee/Add_Edit_teacher_form";
import useSWR from "swr";
import axios from "axios";
import { TeachersTable } from "../table/TeachersTable";
import { AdministratorsTable } from "../table/AdministratorsTable";
import { ServicesTable } from "../table/ServicesTable";
import { StudentsTable } from "../table/StudentsTable";
const NamesList = ({ type, schoolId }) => {
  const apiUrl = `/api/names/${type}`;

  const feacher = (url, schoolId) =>
    axios.get(url, { headers: { schoolId } }).then((res) => res.data);

  const { data } = schoolId
    ? useSWR([apiUrl, schoolId], feacher)
    : useSWR(apiUrl, {
        dedupingInterval: 60000,
      });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [destroyOnClose, setdestroyOnClose] = useState(false);

  const words = {
    teacher: {
      add: "مدرس",
      all: "المدرسين",
      table: <TeachersTable allData={data} type={type} isAdmin={schoolId} />,
    },
    administrators: {
      add: "اداري",
      all: "الاداريين",
      table: (
        <AdministratorsTable allData={data} type={type} isAdmin={schoolId} />
      ),
    },
    services: {
      add: "مستخدم",
      all: "مستخدمين",
      table: <ServicesTable allData={data} type={type} isAdmin={schoolId} />,
    },
    students: {
      add: "طالب",
      all: "طلاب",
      table: <StudentsTable allData={data} type={type} isAdmin={schoolId} />,
    },
  };

  return (
    <div className=" container pt-12">
      <div className="flex justify-between mb-10">
        <div className="font-bold">جميع {words[type].all}:</div>
        {!schoolId && (
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
        )}
      </div>
      {words[type].table}
    </div>
  );
};

export default NamesList;
