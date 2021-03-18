import { DatePicker, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NewAbcenceStyle } from "../styles/NewAbcenceStyle";
import AddNewAbcenceForm from "./AddNewAbcenceForm";
import EditAbcenceForm from "./EditAbcenceForm";

const EditAbcence = ({ names, displaySheetMonth, setIsEdit }) => {
  const [abcenceData, setAbcenceData] = useState(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setAbcenceData(null);
      if (isMounted) {
        if (date) {
          try {
            const res = await axios.get(`/api/absence/find/${date}`);
            if (!res.data) {
              setAbcenceData(null);
              return message.info(`لايوجد غياب في هذا التاريخ`);
            }
            if (res.status === 200) setAbcenceData(res.data);
          } catch (error) {
            setAbcenceData(null);
            console.log(error);
            message.error(error.response?.data?.error);
          }
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [date]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <p style={{ marginLeft: "10px" }}>اختر تاريخ الغياب:</p>
        <DatePicker
          onChange={(date, dateString) => setDate(dateString)}
          style={{ marginBottom: "20px" }}
          placeholder="اختر التاريخ"
        />
      </div>
      {abcenceData && (
        <NewAbcenceStyle>
          <EditAbcenceForm
            oldData={abcenceData}
            names={names}
            displaySheetMonth={displaySheetMonth}
            setIsEdit={setIsEdit}
          />
        </NewAbcenceStyle>
      )}
    </div>
  );
};

export default EditAbcence;
