import DropdownMenu from "../table/DropdownMenu";
import { Avatar } from "antd";
import { getColumnSearchProps } from "../table/searchInTable";
export const NameAndImageShredColumns = (
  searchText,
  setSearchText,
  searchedColumn,
  setSearchedColumn
) => {
  return [
    {
      title: "الاسم",
      dataIndex: "name",
      ...getColumnSearchProps(
        "name",
        "الاسم",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn
      ),
    },

    {
      title: "الصورة",
      width: 75,
      dataIndex: "image",
      render: (text) => (
        <>
          {text.url ? (
            <Avatar size="large" src={text.url} alt="image" />
          ) : (
            <Avatar>U</Avatar>
          )}
        </>
      ),
    },
  ];
};

export const SharedTableItems = (typeOfCertifcate, type, allData, isAdmin) => {
  return [
    {
      title: "التحصيل العلمي",
      dataIndex: "TypeOfCertifcate",
      filters: typeOfCertifcate,
      onFilter: (value, record) => record.TypeOfCertifcate.indexOf(value) === 0,
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

    {
      title: "",
      width: 50,
      render: (row) => (
        <DropdownMenu
          data={row}
          allData={allData}
          type={type}
          isAdmin={isAdmin}
        />
      ),
    },
  ];
};
