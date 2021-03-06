import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import styled from "styled-components";

const FooterStyle = styled.div`
  .ant-table-footer {
    background-color: rgba(34, 41, 56, 0.1);
    .total {
      color: var(--blue);

      font-weight: bold;
    }
  }
`;
const CustomTable = ({ allData, setTotal, total }) => {
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
  // const newColumns = [];
  // columns.forEach((c) =>
  //   newColumns.push({ ...c, ...getColumnSearchProps(c.dataIndex, c.title) })
  // );

  const teachersColumns = [
    {
      title: "الشعبة",
      dataIndex: "division",

      ...getColumnSearchProps("division", "الشعبة"),
      render: (text) => (
        <>
          {text?.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </>
      ),
    },
    {
      title: "الصف",
      dataIndex: "classNumber",

      ...getColumnSearchProps("classNumber", "الصف"),
      render: (text) => (
        <>
          {text?.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </>
      ),
    },
    {
      title: "المادة",
      dataIndex: "subject",
      ...getColumnSearchProps("subject", "المادة"),
      render: (text) => (
        <>
          {text?.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </>
      ),
    },
    {
      title: "الاسم",
      dataIndex: "name",
      ...getColumnSearchProps("name", "الاسم"),
    },
  ];

  return (
    <FooterStyle>
      <Table
        columns={teachersColumns}
        dataSource={allData}
        rowKey="_id"
        bordered
        loading={!allData}
        onChange={handleTableChange}
        scroll={{ x: 500, y: 520 }}
        showSorterTooltip={false}
        footer={() => (
          <p style={{ textAlign: "end" }}>
            اجمالي عدد المدرسين: <span className="total">{total}</span>
          </p>
        )}
      />
    </FooterStyle>
  );
};

export default CustomTable;
