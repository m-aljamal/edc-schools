import { DatePicker, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NewAbcenceStyle } from "../styles/NewAbcenceStyle";
import AddNewAbcenceForm from "./AddNewAbcenceForm";

const EditAbcenceForm = ({ names, displaySheetMonth, setIsEdit }) => {
  const [abcenceData, setAbcenceData] = useState(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = async () => {
      if (date) {
        try {
          const { data } = await axios.get(`/api/absence/find/${date}`);
          if (!data) return message.info(`لايوجد غياب في هذا التاريخ`);
          setAbcenceData(data);
        } catch (error) {
          console.log(error);
          message.error(error.response?.data?.error);
        }
      }
    };
    update();
  }, [date, setAbcenceData]);

  // const handleDateChange = async (date, dateString) => {
  //   try {
  //     const { data } = await axios.get(`/api/absence/find/${dateString}`);
  //     if (!data) return message.info(`لايوجد غياب في هذا التاريخ`);
  //     setAbcenceData(data);
  //   } catch (error) {
  //     console.log(error);
  //     message.error(error.response?.data?.error);
  //   }
  // };

  return (
    <div>
      <DatePicker onChange={(date, dateString) => setDate(dateString)} />
      {abcenceData && (
        <NewAbcenceStyle>
          <AddNewAbcenceForm
            oldData={abcenceData}
            names={names}
            displaySheetMonth={displaySheetMonth}
            edit
            setIsEdit={setIsEdit}
          />
        </NewAbcenceStyle>
      )}
    </div>
  );
};

export default EditAbcenceForm;
