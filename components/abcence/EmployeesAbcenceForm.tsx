import AddNewAbcenceForm from "./AddNewAbcenceForm";

const StudentsAbcenceForm = ({ names, displaySheetMonth }) => {
  return (
    <AddNewAbcenceForm
      type="employees"
      names={names}
      displaySheetMonth={displaySheetMonth}
    />
  );
};

export default StudentsAbcenceForm;
