import { useState } from "react";
import { calculateAvrage } from "../../utils/calculateAvrage";
import { Menu, Dropdown } from "antd";
const TableSummary = ({
  empData,
  emptotal,
  stuData,
  stuTotal,
  stuSocialData,
  stuSocialTotal,
  stuHelthData,
  stuHelthTotal,
}) => {
  const [clickedKey, setClickedKey] = useState({
    value: "employeeByCertifcate",
    text: "اعداد الموظفين حسب التحصيل العلمي",
  });
  const tableData = {
    employeeByCertifcate: {
      data: empData,
      total: emptotal,
      type: "TypeOfCertifcate",
      tableHeadext: "الشهادة",
      text: "اعداد الموظفين حسب التحصيل العلمي",
    },
    studentsByClass: {
      data: stuData,
      total: stuTotal,
      type: "classNumber",
      tableHeadext: "الصف",
      text: "اعداد الطلاب حسب الصف",
    },
    studentsBySocial: {
      data: stuSocialData,
      total: stuSocialTotal,
      type: "familySituation",
      tableHeadext: "الحالة",
      text: "الوضع الاجتماعي للطلاب",
    },
    studentsByHealth: {
      data: stuHelthData,
      total: stuHelthTotal,
      type: "healthSituation",
      tableHeadext: "الحالة",
      text: "الوضع الصحي للطلاب",
    },
  };
  function handleMenuClick(e) {
    setClickedKey({
      text: tableData[e.key].text,
      value: e.key,
    });
  }

  const menu = (
    <Menu onClick={handleMenuClick} className="text-right">
      <Menu.Item key="employeeByCertifcate">
        <p>اعداد الموظفين حسب التحصيل العلمي</p>
      </Menu.Item>
      <Menu.Item key="studentsByClass">
        <p>اعداد الطلاب حسب الصف</p>
      </Menu.Item>
      <Menu.Item key="studentsBySocial">
        <p>الوضع الاجتماعي للطلاب</p>
      </Menu.Item>
      <Menu.Item key="studentsByHealth">
        <p>الوضع الصحي للطلاب</p>
      </Menu.Item>
    </Menu>
  );
  const td = tableData[clickedKey.value];
  return (
    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <h3 className="font-semibold text-base text-gray-900">
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <a className="ant-dropdown-link">
                {clickedKey.text}
                <i className="fas fa-caret-down mr-2"></i>
              </a>
            </Dropdown>
          </h3>
        </div>
        <div className="block w-full overflow-x-auto ">
          <table className="text-center items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <TableHead data={td.tableHeadext} />
                <TableHead data="العدد" />
                <TableHead data="النسبة" />
              </tr>
            </thead>
            <tbody>
              {td.data.map((d, i) => (
                <tr key={i}>
                  <TableRow data={d._id[td.type]} />
                  <TableRow data={d.total} />
                  <TableRow data={`% ${calculateAvrage(d.total, td.total)} `} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr />
        <div className="bg-gray-800 text-white text-base pr-4 font-semibold py-1 flex items-center">
          <h3 className="text-white ml-3">العدد الاجمالي</h3>
          <em className="text-lg">{td.total}</em>
        </div>
      </div>
    </div>
  );
};
export default TableSummary;

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
