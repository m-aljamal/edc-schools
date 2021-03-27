import BarCart from "../Dashbord/BarCart";

const TotalTeachersByClassAndDivion = ({ classNumber, division }) => {
  const firstClass = division.filter(
    (d) => d._id.classNumber === classNumber
  );
  return (
    <div>
      <BarCart
        dataArray={firstClass}
        title={`الصف ${classNumber}`}
        type="division"
      />
    </div>
  );
};

export default TotalTeachersByClassAndDivion;
