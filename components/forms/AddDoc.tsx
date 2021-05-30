import FormItem from "antd/lib/form/FormItem";
import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import { Button, message } from "antd";
import axios from "axios";
import { trigger } from "swr";

export default function AddDoc({ setIsModalVisible, setdestroyOnClose }) {
  return (
    <div>
      <div>
        <p>انشاء مجلد جديد:</p>
        <AddNewFolder
          setIsModalVisible={setIsModalVisible}
          setdestroyOnClose={setdestroyOnClose}
        />
      </div>
      <hr />
      <div>
        <p>رفع ملف</p>
      </div>
    </div>
  );
}

const AddNewFolder = ({ setIsModalVisible, setdestroyOnClose }) => {
  const folderInitialValue = {
    name: "",
  };
  const handleCreateNewFolder = async (values, helpers) => {
    try {
      const res = await axios.post("/api/drive", values);
      console.log(res);

      if (res.status === 200) {
        // setLoading(false);
        trigger("/api/drive");
        helpers.resetForm();
        setdestroyOnClose(true);
        message.success(`تم انشاء المجلد بنجاح`);
        setIsModalVisible(false);
      }
    } catch (error) {
      message.error(error.response.data.error);
    }
  };
  return (
    <Formik initialValues={folderInitialValue} onSubmit={handleCreateNewFolder}>
      {({ values }) => (
        <Form>
          <FormItem name="name" label="اسم المجلد">
            <Input name="name" autoFocus />
          </FormItem>
          <Button
            className="text-base bg-blue-400 hover:bg-blue-500"
            htmlType="submit"
            block
            type="primary"
          >
            اضافة
          </Button>
        </Form>
      )}
    </Formik>
  );
};
