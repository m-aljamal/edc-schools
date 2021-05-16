import LineChart from "./lineChart";
import BarChart from "./barChart";
import Card from "./cards";
import TotalNumerCardInfo from "../Dashbord/TotalNumerCardInfo";
import Bar_chart from "../statistics/Bar_chart";
import Bar_chart_division from "./Bar_chart_division";
import TableSummary from "./TableSummary";
export default function home({ totalNumbers, schoolId, isAdmin }) {
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
              total:
                totalNumbers?.totalStudents[0]?.totalStudents[0]?.totalStudents,
              _id: { type: "students" },
            }}
            employees={employees?.employeeType}
            employeeGender={employees?.gender}
            studentsGender={totalNumbers?.totalStudents[0]?.gender}
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
          {/* <LineChart /> */}
          <Bar_chart_division
            empDivision={employees.division}
            empTotalClass={getTotalByClassNumber(employees?.division)}
            stuDivision={students?.division}
            stuTotalClass={getTotalByClassNumber(students?.division)}
          />
          {/* <BarChart /> */}
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
          {/* <div className="w-full xl:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">
                      Social traffic
                    </h3>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      See all
                    </button>
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead className="thead-light">
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Referral
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Visitors
                      </th>
                      <th
                        className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                        style={{ minWidth: "140px" }}
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        Facebook
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        1,480
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">60%</span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                              <div
                                style={{ width: "60%" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        Facebook
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        5,480
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">70%</span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-emerald-200">
                              <div
                                style={{ width: "70%" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        Google
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        4,807
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">80%</span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
                              <div
                                style={{ width: "80%" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        Instagram
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        3,678
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">75%</span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-lightBlue-200">
                              <div
                                style={{ width: "75%" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lightBlue-500"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        twitter
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        2,645
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">30%</span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-orange-200">
                              <div
                                style={{ width: "30%" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}
        </div>
        {/* <footer className="block py-4">
          <div className="container mx-auto px-4">
            <hr className="mb-4 border-b-1 border-blueGray-200" />
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-4/12 px-4">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Copyright © {new Date().getFullYear()}{" "}
                  <a
                    href="https://www.creative-tim.com"
                    className="text-blueGray-500 hover:text-blueGray-700 text-sm font-semibold py-1"
                  >
                    Creative Tim
                  </a>
                </div>
              </div>
              <div className="w-full md:w-8/12 px-4">
                <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                  <li>
                    <a
                      href="https://www.creative-tim.com"
                      className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                    >
                      Creative Tim
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.creative-tim.com/presentation"
                      className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://blog.creative-tim.com"
                      className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/creativetimofficial/tailwind-starter-kit/blob/main/LICENSE.md"
                      className="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"
                    >
                      MIT License
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer> */}
      </div>
    </>
  );
}
