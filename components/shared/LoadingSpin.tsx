import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
export default function LoadingSpin() {
  const antIcon = <LoadingOutlined className="text-8xl text-gray-500" spin />;
  return (
    <>
      <Spin className="flex justify-center items-center" indicator={antIcon} />
      <p className="text-2xl text-center mt-2 text-gray-800">
        الرجاء الانتظار..
      </p>
    </>
  );
}
