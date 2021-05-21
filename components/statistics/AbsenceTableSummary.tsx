import { useState } from "react";
import { calculateAvrage } from "../../utils/calculateAvrage";
import { Menu, Dropdown } from "antd";
const AbsenceTableSummary = ({ empAbcense }) => {
  return (
    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <h3 className="font-semibold text-base text-gray-900">
            الغياب خلال العام
          </h3>
        </div>
        <div className="block w-full overflow-x-auto ">
          <table className="text-center items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <TableHead data="الاسم" />
                <TableHead data="عدد الغياب" />
                <TableHead data="النسبة" />
              </tr>
            </thead>
            <tbody>
              {empAbcense.absenceOfYear.map((d, i) => (
                <tr key={i}>
                  <TableRow data={d._id.name} />
                  <TableRow data={d.total} />
                  <TableRow
                    data={`% ${calculateAvrage(
                      d.total,
                      empAbcense.totalEmployeeAbsence[0].totalAbsence
                    )} `}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr />
        <div className="bg-gray-800 text-white text-base pr-4 font-semibold py-1 flex items-center">
          <h3 className="text-white ml-3">العدد الاجمالي</h3>
          <em className="text-lg">
            {empAbcense.totalEmployeeAbsence[0].totalAbsence}
          </em>
        </div>
      </div>
    </div>
  );
};
export default AbsenceTableSummary;

const TableRow = ({ data }) => {
  return (
    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
      {data}
    </th>
  );
};

const TableHead = ({ data }) => (
  <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold ">
    {data}
  </th>
);
