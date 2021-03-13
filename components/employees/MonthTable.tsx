import { Table, Input, Button, Space, Avatar } from "antd";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import styled from "styled-components";

const TableStyle = styled.div`
  .ant-table-footer {
    background-color: rgba(34, 41, 56, 0.1);
    .total {
      color: var(--blue);

      font-weight: bold;
    }
  }
`;
const MonthTable = ({ names, absenceListByMonth, displaySheetMonth }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const date = new Date();
  const y = date.getFullYear();
  const m = displaySheetMonth || date.getMonth() + 1;
  const totalDays = new Date(y, m, 0).getDate();
 
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

  const teachersColumns: [{}] = [
    {
      title: "الاسم",
      dataIndex: "name",
      ...getColumnSearchProps("name", "الاسم"),
      width: 100,
    },
  ];
  for (let i = 1; i <= totalDays; i++) {
    teachersColumns.push({
      title: i,
      width: 25,
      render: (value, row, index) => {
        const weekend = new Date(date.getFullYear(), date.getMonth(), i);
        if (weekend.getDay() == 4 || weekend.getDay() == 5) {
          return <p>-</p>;
        }
        let abcence;
        for (abcence in absenceListByMonth) {
          let employee;
          for (employee in absenceListByMonth[abcence].emplpyees) {
            while (
              new Date(absenceListByMonth[abcence].date).getUTCDate() === i &&
              row.name === absenceListByMonth[abcence].emplpyees[employee].name
            ) {
              return <CloseOutlined style={{ color: "red" }} />;
            }
          }
        }

        return <CheckOutlined style={{ color: "green" }} />;
      },
    });
  }
  return (
    <TableStyle>
      <Table
        columns={teachersColumns}
        dataSource={names}
        rowKey="_id"
        bordered
        loading={!names}
        scroll={{ x: 1800, y: 520 }}
        showSorterTooltip={false}
        pagination={{ position: ["bottomRight"] }}
      />
    </TableStyle>
  );
};

export default MonthTable;
