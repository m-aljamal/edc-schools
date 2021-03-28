import BarCart from "../Dashbord/BarCart";

const TotalTeachersByClassAndDivion = ({ classNumber, division }) => {
  return (
    <div>
      <BarCart
        dataArray={division}
        title={`الصف ${classNumber}`}
        type="division"
      />
    </div>
  );
};

export default TotalTeachersByClassAndDivion;
