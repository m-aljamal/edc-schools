import { Table, Input, Button, Space, Avatar, Dropdown } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import styled from "styled-components";
import DropdownMenu from "./DropdownMenu";
import {
  classes,
  typeOfCertifcate,
  division,
  subjects,
} from "../../utils/SchoolSubjects";

const TableStyle = styled.div`
  .ant-table-footer {
    background-color: rgba(34, 41, 56, 0.1);
    .total {
      color: var(--blue);

      font-weight: bold;
    }
  }
`;
const TeacherTable = ({ allData, setTotal, total, type }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const getColumnSearchProps = (dataIndex: string, title: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          dir="rtl"
          autoFocus
          placeholder={`بحث ${title} `}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            بحث
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            إعادة تعيين
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);

              setSearchedColumn(dataIndex);
            }}
          >
            تصفية
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();

    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const handleTableChange = (pagination, filters, sorter, extra) => {
    setTotal(extra.currentDataSource.length);
  };

  const columnsByType = {
    teacher: [
      {
        title: "المادة",
        dataIndex: "subject",
        filters: subjects,
        onFilter: (value, record) => record.subject.includes(value),
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
        onFilter: (value, record) => record.classNumber.includes(value),
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
        onFilter: (value, record) => record.division.includes(value),
        render: (value, row, index) => (
          <>
            {value?.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </>
        ),
      },
    ],
    administrators: [
      {
        title: "المسمى الوظيفي",
        dataIndex: "jobTitle",
      },
    ],
  };

  const teachersColumns = [
    {
      title: "الاسم",
      dataIndex: "name",
      ...getColumnSearchProps("name", "الاسم"),
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
    ...columnsByType[type],
    // {
    //   title: "المادة",
    //   dataIndex: "subject",
    //   filters: subjects,
    //   onFilter: (value, record) => record.subject.includes(value),
    //   render: (text) => (
    //     <>
    //       {text?.map((t, i) => (
    //         <p key={i}>{t}</p>
    //       ))}
    //     </>
    //   ),
    // },
    // {
    //   title: "الصف",
    //   dataIndex: "classNumber",
    //   filters: classes,
    //   onFilter: (value, record) => record.classNumber.includes(value),
    //   render: (text) => (
    //     <>
    //       {text?.map((t, i) => (
    //         <p key={i}>{t}</p>
    //       ))}
    //     </>
    //   ),
    // },

    // {
    //   title: "الشعبة",
    //   dataIndex: "division",
    //   filters: division,
    //   onFilter: (value, record) => record.division.includes(value),
    //   render: (value, row, index) => (
    //     <>
    //       {value?.map((t, i) => (
    //         <p key={i}>{t}</p>
    //       ))}
    //     </>
    //   ),
    // },

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
      onFilter: (value, record) => record.sex.indexOf(value) === 0,
      sorter: (a, b) => a.sex.length - b.sex.length,
    },

    {
      title: "التحصيل العلمي",
      dataIndex: "TypeOfCertifcate",
      filters: typeOfCertifcate,
      onFilter: (value, record) => record.TypeOfCertifcate.indexOf(value) === 0,
    },

    {
      title: "الاختصاص",
      dataIndex: "typeOfDegree",
      filters: subjects,
      onFilter: (value, record) => record.typeOfDegree.indexOf(value) === 0,
    },

    {
      title: "",
      width: 50,
      render: (row) => (
        <DropdownMenu data={row} allData={allData} type={type} />
      ),
    },
  ];

  return (
    <TableStyle>
      <Table
        columns={teachersColumns}
        dataSource={allData}
        rowKey="_id"
        bordered
        loading={!allData}
        onChange={handleTableChange}
        scroll={{ x: 1150, y: 520 }}
        showSorterTooltip={false}
        pagination={{ position: ["bottomRight"] }}
        footer={() => (
          <p style={{ textAlign: "start" }}>
            اجمالي عدد المدرسين: <span className="total">{total}</span>
          </p>
        )}
      />
    </TableStyle>
  );
};

export default TeacherTable;
