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

const EditAbcenceForm = ({
  names,
  displaySheetMonth,
  oldData,
  setIsEdit,
  type,
}) => {
  const initialValues = {
    date: oldData?.date,
    absenceIds: oldData?.names?.map((emp) => emp._id),
    reason: oldData?.reason,
  };

  const handleTimeSheet = async (values, helpers) => {
    try {
      let res = await axios.put(`/api/absence/edit/${oldData._id}`, values);
      trigger(`/api/absence/${displaySheetMonth}`);
      if (res.status === 200) {
        setIsEdit(false);
        helpers.resetForm();
        message.success("تم تعديل الغياب بنجاح");
      }
    } catch (error) {
      message.error(error.response?.data?.error);
      console.log(error);
    }
  };
  const handleStudentTimeSheet = async (values, helpers) => {
    try {
      let res = await axios.put(
        `/api/student/absence/edit/${oldData._id}`,
        values
      );
      trigger(`/api/student/absence/${displaySheetMonth}`);
      if (res.status === 200) {
        setIsEdit(false);
        helpers.resetForm();
        message.success("تم تعديل الغياب بنجاح");
      }
    } catch (error) {
      message.error(error.response?.data?.error);
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={type === "employees" ? handleTimeSheet : handleStudentTimeSheet}
      validationSchema={validation}
    >
      {(isSubmitting, values) => (
        <Form {...layout}>
          <FormItem name="date" label="التاريخ">
            <DatePicker name="date" placeholder="تاريخ الغياب" />
          </FormItem>
          <FormItem name="absenceIds" label="الاسماء">
            <Transfer
              name="absenceIds"
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
              تعديل الغياب
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditAbcenceForm;
