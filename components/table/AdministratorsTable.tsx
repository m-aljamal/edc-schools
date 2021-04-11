import React, { useState } from "react";
import { typeOfCertifcate, subjects } from "../../utils/SchoolSubjects";
import {
  NameAndImageShredColumns,
  SharedTableItems,
} from "../shared/SharedTableItems";
import TableComponent from "./TableComponent";

export const AdministratorsTable = ({ allData, type, isAdmin }) => {
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
      title: "المسمى الوظيفي",
      dataIndex: "jobTitle",
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