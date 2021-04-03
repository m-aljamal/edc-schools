import { Table } from "antd";
import React, { useEffect, useState } from "react";
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

const TableComponent = ({ columns, allData }) => {
  const [total, setTotal] = useState("");
  useEffect(() => {
    setTotal(allData?.length);
  }, [allData]);

  const handleTableChange = (pagination, filters, sorter, extra) => {
    setTotal(extra.currentDataSource.length);
  };
  return (
    <TableStyle>
      <Table
        columns={columns}
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
            العدد الاجمالي: <span className="total">{total && total}</span>
          </p>
        )}
      />
    </TableStyle>
  );
};

export default TableComponent;
