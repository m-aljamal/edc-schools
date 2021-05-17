import Card from "../statistics/cards";
import Bar_chart from "../statistics/Bar_chart";
import Bar_chart_division from "../statistics/Bar_chart_division";
import TableSummary from "../statistics/TableSummary";
import Footer from "../layout/Footer";
export default function SingleSchoolStatistics({
  totalNumbers,
  schoolId,
  isAdmin,
}) {
  const employees = totalNumbers?.totalEmployee[0];
  const students = totalNumbers?.totalStudents[0];
  const getTotalByClassNumber = (division) => {
    return [
      ...Array.from(
        new Set(
          division.map(
            (d: { _id: { classNumber: string } }) => d._id.classNumber
          )
        )
      ),
    ];
  };
  return (
    <>
      <div className="relative bg-pink-600 md:pt-15 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <Card
            students={{
              total: students.totalStudents[0]?.totalStudents,
              _id: { type: "students" },
            }}
            employees={employees?.employeeType}
            employeeGender={employees?.gender}
            studentsGender={students.gender}
          />
        </div>
      </div>
      <div className="px-4 md:px-10 mx-auto w-full -m-24 bg-gray-100">
        <div className="flex flex-wrap">
          <Bar_chart
            jobTitle={employees?.jobTitle}
            classNumber={employees?.classNumber}
            subject={employees?.subject}
            typeOfDegree={employees?.typeOfDegree}
          />

          <Bar_chart_division
            empDivision={employees.division}
            empTotalClass={getTotalByClassNumber(employees?.division)}
            stuDivision={students?.division}
            stuTotalClass={getTotalByClassNumber(students?.division)}
          />
        </div>
        <div className="flex flex-wrap mt-4">
          <TableSummary
            empData={employees.typeOfCertifcate}
            emptotal={employees.totalEmployee[0]?.totalEmployee}
            stuData={students.classNumber}
            stuTotal={students.totalStudents[0]?.totalStudents}
            stuSocialData={students.familySituation}
            stuSocialTotal={students.totalStudents[0]?.totalStudents}
            stuHelthData={students.healthSituation}
            stuHelthTotal={students.totalStudents[0]?.totalStudents}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}
