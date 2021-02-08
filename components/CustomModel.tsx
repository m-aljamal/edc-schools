import { Modal } from "antd";

const CustomModel = ({
  isModalVisible,
  setIsModalVisible,
  modelDate,
  title,
  destroyOnClose
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
      width={900}
      destroyOnClose={destroyOnClose}
    >
      {modelDate}
    </Modal>
  );
};

export default CustomModel;
