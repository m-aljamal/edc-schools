import { useState } from "react";
import {
  classes,
  typeOfCertifcate,
  division,
  subjects,
} from "../../utils/SchoolSubjects";
import {
  NameAndImageShredColumns,
  SharedTableItems,
} from "./SharedTableItems";
import TableComponent from "./TableComponent";

export const TeachersTable = ({ allData, type, isAdmin }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const columns = [
    ...NameAndImageShredColumns(
      searchText,
      setSearchText,
      searchedColumn,
      setSearchedColumn
    ),

    {
      title: "المادة",
      dataIndex: "subject",
      filters: subjects,
      onFilter: (value, record) => record.subject?.includes(value),
      render: (text) => (
        <>
          {text?.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </>
      ),
    },
    {
      title: "الصف",
      dataIndex: "classNumber",
      filters: classes,
      onFilter: (value, record) => record.classNumber?.includes(value),
      render: (text) => (
        <>
          {text?.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </>
      ),
    },

    {
      title: "الشعبة",
      dataIndex: "division",
      filters: division,
      onFilter: (value, record) => record.division?.includes(value),
      render: (value, row, index) => (
        <>
          {value?.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </>
      ),
    },
    {
      title: "الاختصاص",
      dataIndex: "typeOfDegree",
      filters: subjects,
      onFilter: (value, record) => record.typeOfDegree.indexOf(value) === 0,
    },
    ...SharedTableItems(typeOfCertifcate, type, allData, isAdmin),
  ];

  return <TableComponent columns={columns} allData={allData} />;
};
