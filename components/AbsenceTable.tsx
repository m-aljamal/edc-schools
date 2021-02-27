import { useState } from "react";
import { Table, DatePicker } from "antd";

const columns = [
  {
    title: "الشعبة",
    dataIndex: "division",
    render: (text: string) => <a>{text}</a>,
    sorter: (a, b) => a.division - b.division,
  },
  {
    title: "الصف",
    dataIndex: "classNumber",
    render: (text: string) => <a>{text}</a>,
    sorter: (a, b) => a.classNumber - b.classNumber,
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

const AbsenceTable = ({
  studentList,
  getAbsenceStudents,
  setIsModalVisible,
}) => {
  const [absenceList, setAbsenceList] = useState([]);
  const [newDate, setNewDate] = useState("");
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setAbsenceList(selectedRows);
    },
  };
  function onChange(date, dateString) {
    setNewDate(dateString);
  }
  const handleSavingNewAbsence = () => {
    getAbsenceStudents(absenceList, newDate);
    setIsModalVisible(false);
  };
  return (
    <div>
      <div style={{ textAlign: "end", marginBottom: "15px" }}>
        <DatePicker onChange={onChange} placeholder="اختيار التاريخ" />
      </div>
      <Table
        rowKey="_id"
        bordered
        loading={!studentList}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={studentList}
      />
      <button onClick={handleSavingNewAbsence}>تسجيل</button>
    </div>
  );
};

export default AbsenceTable;
