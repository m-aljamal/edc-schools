import { Formik } from "formik";
import { FormItem, Input, DatePicker, Form, Transfer } from "formik-antd";
import { Button, message, Tag } from "antd";
import { object, string, date, array } from "yup";
import { trigger } from "swr";
import axios from "axios";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const validation = object({
  date: date().required("الرجاء اختيار التاريخ"),
  absenceIds: array()
    .of(string())
    .min(1)
    .required("الرجاء اختيار اسماء الغياب"),
  reason: string().required("الرجاء كتابة سبب الغياب"),
});

const initialValues = {
  date: "",
  absenceIds: [],
  reason: "",
};

const AddNewAbcenceForm = ({ names, displaySheetMonth }) => {
  const handleTimeSheet = async (values, helpers) => {
    try {
      const res = await axios.post("/api/absence/new", values);
      trigger(`/api/absence/${displaySheetMonth}`);
      if (res.status === 200) {
        helpers.resetForm();
        message.success("تم تسجيل الغياب بنجاح");
      }
    } catch (error) {
      message.error(error.response?.data?.error);
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, helpers) => handleTimeSheet(values, helpers)}
      validationSchema={validation}
    >
      {(isSubmitting, values) => (
        <Form {...layout} style={{ marginTop: "20px" }}>
          <FormItem name="date" label="التاريخ">
            <DatePicker name="date" placeholder="تاريخ الغياب" />
          </FormItem>
          <FormItem name="absenceIds" label="الاسماء">
            <Transfer
              name="absenceIds"
              style={{ justifyContent: " center", marginTop: "15px" }}
              dataSource={names}
              titles={[
                <Tag color="geekblue">اسماء الموظفين</Tag>,
                <Tag color="geekblue">اسماء الغياب</Tag>,
              ]}
              render={(item) => item.name}
              oneWay
              rowKey={(record) => record._id}
              pagination
              showSearch
              operations={["اختيار الاسماء"]}
            />
          </FormItem>
          <FormItem name="reason" label="اسباب الغياب">
            <Input.TextArea name="reason" rows={4} placeholder="سبب الغياب" />
          </FormItem>
          <div className="submitButton">
            <Button
              htmlType="submit"
              // loading={isSubmitting}
              type="primary"
              block
            >
              حفظ الغياب
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddNewAbcenceForm;
