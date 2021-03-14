import { DatePicker } from "antd";
import axios from "axios";
import { useState } from "react";

const EditAbcenceForm = () => {
  const [abcenceData, setAbcenceData] = useState([]);
  const handleDateChange = async (date, dateString) => {
    try {
      const { data } = await axios.get(`/api/absence/find/${dateString}`);
      setAbcenceData(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(abcenceData);
  const initialState ={
      
  }
  return (
    <div>
      <DatePicker onChange={handleDateChange} />
    </div>
  );
};

export default EditAbcenceForm;
