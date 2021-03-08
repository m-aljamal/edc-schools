import { Transfer } from "antd";
 const DataTransfer = ({ data, setTargetKeys, targetKeys }) => {
  const onChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  return (
    <Transfer
      style={{ justifyContent: " center", marginTop: "15px" }}
      dataSource={data}
      targetKeys={targetKeys}
      onChange={onChange}
      render={(item) => item.name}
      oneWay
      rowKey={(record) => record._id}
      pagination
    />
  );
};

export default DataTransfer;
