import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import { trigger } from "swr";
import setDate from "../../utils/setDate";
import { AbcenceForm } from "./AbcenceForm";

const AddNewAbcenceForm = ({ names, displaySheetMonth, type }) => {
  const [absenceData, setAbsenceData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [date, setAbcenceDate] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <AbcenceForm
      date={date}
      type={type}
      names={names}
      absenceData={absenceData}
      loading={loading}
      searchText={searchText}
      searchedColumn={searchedColumn}
      displaySheetMonth={displaySheetMonth}
      setAbsenceData={setAbsenceData}
      setLoading={setLoading}
      setAbcenceDate={setAbcenceDate}
      setSearchText={setSearchText}
      setSearchedColumn={setSearchedColumn}
      handleTimeSheet={handleTimeSheet}
    />
  );
};

export default AddNewAbcenceForm;
