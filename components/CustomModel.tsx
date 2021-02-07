import { Modal, Button } from "antd";

const CustomModel = ({
  isModalVisible,
  setIsModalVisible,
  modelDate,
  title,
}) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal
      footer={false}
      title={title}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={700}
    >
      {modelDate}
    </Modal>
  );
};

export default CustomModel;
