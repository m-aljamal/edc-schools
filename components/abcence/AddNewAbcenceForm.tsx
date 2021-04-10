import { DatePicker, message, Select, Table, Button } from "antd";
import { trigger } from "swr";
import axios from "axios";
import setDate from "../../utils/setDate";
import { useState } from "react";
import { NameAndImageShredColumns } from "../shared/SharedTableItems";
import { abcenseResons } from "../../utils/SchoolSubjects";
import moment from "moment";

const { Option } = Select;

const AddNewAbcenceForm = ({ names, displaySheetMonth, type }) => {
  const [absenceData, setAbsenceData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [date, setAbcenceDate] = useState("");
  const [loading, setLoading] = useState(false);
  const hanldeReason = (event, userInfo) => {
    const findIndex = absenceData.findIndex((a) => a._id === userInfo._id);
    if (findIndex > -1) {
      let newArray = [...absenceData];
      if (!event) {
        newArray.splice(findIndex, 1);
        setAbsenceData(newArray);
      } else {
        newArray[findIndex] = { ...newArray[findIndex], reason: event };
        setAbsenceData(newArray);
      }
    }
    if (event && findIndex === -1) {
      setAbsenceData([
        ...absenceData,
        { reason: event, name: userInfo.name, _id: userInfo._id },
      ]);
    }
  };

  const handleTimeSheet = async () => {
    try {
      setLoading(true);
      let res = await axios.post(`/api/absence/add/${type}`, {
        date: setDate(date),
        names: absenceData,
      });

      trigger(`/api/absence/${type}/${displaySheetMonth}`);
      if (res.status === 200) {
        setLoading(false);
        setAbsenceData([]);
        setAbcenceDate("");
        message.success("تم تسجيل الغياب بنجاح");
      }
    } catch (error) {
      setLoading(false);
      message.error(error.response?.data?.error);
      console.log(error);
    }
  };
  const emColumns = [
    ...NameAndImageShredColumns(
      searchText,
      setSearchText,
      searchedColumn,
      setSearchedColumn
    ),
    {
      title: "اسم الاب",
      dataIndex: "fatherName",
    },

    {
      title: "سبب الغياب",

      render: (value, row, index) => (
        <div>
          <Select
            allowClear
            placeholder="الرجاء الاختيار"
            onChange={(e) => hanldeReason(e, row)}
            value={absenceData.find((a) => a._id === row._id)?.reason}
          >
            {abcenseResons.map((r, i) => (
              <Option key={i} value={r.text}>
                {r.text}
              </Option>
            ))}
          </Select>
        </div>
      ),
    },
  ];

  const stuColumns = [
    ...NameAndImageShredColumns(
      searchText,
      setSearchText,
      searchedColumn,
      setSearchedColumn
    ),
    {
      title: "اسم الاب",
      dataIndex: "fatherName",
    },
    {
      title: "الصف",
      dataIndex: "classNumber",
    },

    {
      title: "سبب الغياب",

      render: (value, row, index) => (
        <div>
          <Select
            allowClear
            placeholder="الرجاء الاختيار"
            onChange={(e) => hanldeReason(e, row)}
            value={absenceData.find((a) => a._id === row._id)?.reason}
          >
            {abcenseResons.map((r, i) => (
              <Option key={i} value={r.text}>
                {r.text}
              </Option>
            ))}
          </Select>
        </div>
      ),
    },
  ];

  const handleDateChange = (date, dateText) => {
    setAbcenceDate(dateText);
  };

  return (
    <div>
      <DatePicker
        placeholder="تاريخ الغياب"
        onChange={handleDateChange}
        value={date !== "" ? moment(date) : null}
      />
      <div>
        <span style={{ marginLeft: 8 }}></span>
      </div>
      <Table
        rowKey="_id"
        columns={type === "students" ? stuColumns : emColumns}
        dataSource={names}
      />
      <Button
        disabled={absenceData.length === 0 || !date}
        loading={loading}
        block
        onClick={handleTimeSheet}
        type="primary"
      >
        حفظ
      </Button>
    </div>
  );
};

export default AddNewAbcenceForm;
