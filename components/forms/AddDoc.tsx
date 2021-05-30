import FormItem from "antd/lib/form/FormItem";
import { Formik } from "formik";
// import { Form, Input, AutoComplete } from "formik-antd";
import { Button, message, AutoComplete } from "antd";
import axios from "axios";
import useSWR, { trigger } from "swr";
import LoadingSpin from "../shared/LoadingSpin";
import { useState } from "react";

export default function AddDoc({ setIsModalVisible, setdestroyOnClose }) {
  const { data, error } = useSWR("/api/drive");
  if (!data) {
    return <LoadingSpin />;
  }
  if (error) {
    <p>error</p>;
  }
  console.log(data);

  return (
    <div>
      <div>
        <AddNewFolder
          setIsModalVisible={setIsModalVisible}
          setdestroyOnClose={setdestroyOnClose}
          folders={data}
        />
      </div>
    </div>
  );
}

const AddNewFolder = ({ setIsModalVisible, setdestroyOnClose, folders }) => {
  const [folder, setFolder] = useState({
    name: "",
    id: "",
  });
  const options = [];
  folders.forEach((f) => options.push({ value: f.name, id: f.id }));

  const folderInitialValue = {
    name: "",
  };
  const [files, setFile] = useState([]);
  console.log(files);

  const handleCreateNewFolder = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", folder.name);
      formData.append("folderId", folder.id);
      for (let file of files) {
        formData.append("files", file);
      }
      const res = await axios.post("/api/drive/upload", formData);
      console.log(res);
      if (res.status === 200) {
        // setLoading(false);
        // trigger("/api/drive");
        // helpers.resetForm();
        // setdestroyOnClose(true);
        // message.success(`تم انشاء المجلد بنجاح`);
        // setIsModalVisible(false);
      }
    } catch (error) {
      console.log(error);

      message.error(error.response.data.error);
    }
  };
  const handleChange = async (e) => {
    setFile(e.target.files);
  };
  const onChange = (value) => {
    const id = options.find((o) => o.value === value)?.id;
    setFolder({ name: value, id });
  };

  return (
    <form onSubmit={handleCreateNewFolder}>
      <div>
        <AutoComplete
          className="w-full mb-4"
          onChange={onChange}
          allowClear
          options={options}
          placeholder="اختار المجلد"
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
      <input type="file" onChange={handleChange} multiple />
      <Button
        className="text-base bg-blue-400 hover:bg-blue-500"
        htmlType="submit"
        block
        type="primary"
      >
        رفع الملف
      </Button>
    </form>
    // <Formik initialValues={folderInitialValue} onSubmit={handleCreateNewFolder}>
    //   {({ values }) => (
    //     <Form>
    //       <FormItem name="name" label="اسم المجلد">
    //         <AutoComplete
    //           allowClear
    //           name="name"
    //           options={options}
    //           placeholder="اختار المجلد"
    //           filterOption={(inputValue, option) =>
    //             option!.value
    //               .toUpperCase()
    //               .indexOf(inputValue.toUpperCase()) !== -1
    //           }
    //         />
    //       </FormItem>
    //       <FormItem>
    //         <input type="file" onChange={handleChange} multiple />
    //       </FormItem>
    //       <Button
    //         className="text-base bg-blue-400 hover:bg-blue-500"
    //         htmlType="submit"
    //         block
    //         type="primary"
    //       >
    //         رفع الملف
    //       </Button>
    //     </Form>
    //   )}
    // </Formik>
  );
};
