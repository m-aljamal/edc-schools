import React from "react";
import AddNewAbcenceForm from "./AddNewAbcenceForm";

const StudentsAbcenceForm = ({ names, displaySheetMonth }) => {
  return (
    <AddNewAbcenceForm
      type="students"
      names={names}
      displaySheetMonth={displaySheetMonth}
    />
  );
};

export default StudentsAbcenceForm;
