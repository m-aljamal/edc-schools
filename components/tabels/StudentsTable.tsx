import { useState } from "react";
import {
  classes,
  typeOfCertifcate,
  division,
  familySituation,
} from "../../utils/SchoolSubjects";
import { NameAndImageShredColumns, SharedTableItems } from "./SharedTableItems";
import { getColumnSearchProps } from "./searchInTable";
import TableComponent from "./TableComponent";

export const StudentsTable = ({ allData, type, isAdmin }) => {
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
      title: "الصف",
      dataIndex: "classNumber",
      filters: classes,
      onFilter: (value, record) => record.classNumber?.includes(value),
    },

    {
      title: "الشعبة",
      dataIndex: "division",
      filters: division,
      onFilter: (value, record) => record.division?.includes(value),
    },
    {
      title: "الوضع العائلي",
      dataIndex: "familySituation",
      filters: familySituation,
      onFilter: (value, record) => record.familySituation?.includes(value),
    },
    {
      title: "الوضع الصحي",
      dataIndex: "healthSituation",
      filters: [
        {
          text: "مريض",
          value: "مريض",
        },
        {
          text: "معافاة",
          value: "معافاة",
        },
      ],
      onFilter: (value, record) => record.healthSituation.indexOf(value) === 0,
    },
    {
      title: "نوع المرض",
      dataIndex: "sickType",
      ...getColumnSearchProps(
        "sickType",
        "نوع المرض",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn
      ),

      render: (text) => <>{text ? <p>{text}</p> : <p>....</p>}</>,
    },
    {
      title: "الجنس",
      dataIndex: "sex",
      filters: [
        {
          text: "ذكر",
          value: "ذكر",
        },
        {
          text: "انثى",
          value: "انثى",
        },
      ],
      onFilter: (value, record) => record.sex?.indexOf(value) === 0,
      sorter: (a, b) => a.sex.length - b.sex.length,
    },
  ];

  return <TableComponent columns={columns} allData={allData} />;
};
