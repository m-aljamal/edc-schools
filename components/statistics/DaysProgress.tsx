import { Progress } from "antd";

export default function DaysProgress() {
  return (
    <div className="bg-white mx-4 p-4 shadow-lg flex items-center mb-4 justify-between rounded">
      <h5 className="text-gray-500 font-bold text-base    ">
        متبقي على نهاية الفصل الأول
      </h5>
      <Progress type="line" status="active" className="w-4/6 " percent={40} />
    </div>
  );
}
