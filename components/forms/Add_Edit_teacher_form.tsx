import { Formik, FormikConfig, FormikValues } from "formik";
import { FormItem, Input, Radio, DatePicker, Form, Select } from "formik-antd";
import { object, string, date } from "yup";
import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import ImageUpload from "../ImageUpload";
import axios from "axios";
import useSWR from "swr";
import { mutate, trigger } from "swr";

import FormStyle from "../styles/FormStyle";
import {
  classes,
  subjects,
  division,
  typeOfCertifcate,
} from "../../utils/SchoolSubjects";
import styled from "styled-components";
const { Step } = Steps;
const { Option } = Select;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const AddressStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 90px;
`;

const AddNewTeacherForm = ({
  setIsModalVisible,
  setdestroyOnClose,
  oldData,
  edit,
}) => {
  const { data } = useSWR("/api/employee");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(oldData?.image || "");
  const [graduateImage, setGraduateImage] = useState(
    oldData?.graduateImage || ""
  );
  const [contractImage, setContractImage] = useState(
    oldData?.contractImage || ""
  );
  const initialValues = {
    name: oldData?.name || "",
    fatherName: oldData?.fatherName || "",
    motherName: oldData?.motherName || "",
    sex: oldData?.sex || "",
    dateOfBirth: oldData?.dateOfBirth || "",
    plaseOfBirth: oldData?.plaseOfBirth || "",
    city: oldData?.city || "",
    region: oldData?.region || "",
    street: oldData?.street || "",
    number1: oldData?.number1 || "",
    number2: oldData?.number2 || "",
    email: oldData?.email || "",
    subject: oldData?.subject || [],
    classNumber: oldData?.classNumber || [],
    division: oldData?.division || [],
    dateOfStart: oldData?.dateOfStart || "",
    TypeOfCertifcate: oldData?.TypeOfCertifcate || "",
    typeOfDegree: oldData?.typeOfDegree || "",
    DateOfGraduate: oldData?.DateOfGraduate || "",
    type: "teacher",
  };

  const personalInfoValidation = object({
    // name: string().required("الرجاء ادخال الاسم"),
    // fatherName: string().required("الرجاء ادخال اسم الاب"),
    // motherName: string().required("الرجاء ادخال الام"),
    // sex: string().required("الرجاء ادخال الجنس"),
  });
  const studentInfoValidation = object({
    // plaseOfBirth: string().required("الرجاء ادخال  مكان الولادة"),
    // dateOfBirth: date().required("الرجاء ادخال تاريخ الولادة"),
    // city: string().required("الرجاء ادخال اسم المدينة"),
    // region: string().required("الرجاء ادخال اسم المنطقة"),
    // street: string().required("الرجاء ادخال اسم الشارع"),
    // number1: string().required("الرجاء ادخال رقم الهاتف"),
    // email: string().email().required("الرجاء ادخال الايميل"),
  });

  const subjectValidation = object({
    // dateOfStart: date().required("الرجاء ادخال تاريخ بدأ العمل"),
  });

  const handleEdit = async (values, helpers) => {
    try {
      const res = await axios.put(`/api/employee/${oldData._id}`, {
        ...values,
        image,
        graduateImage,
        contractImage,
      });
      trigger("/api/employee");
      if (res.status === 200) {
        helpers.resetForm();
        setdestroyOnClose(true);
        message.success("تم تعديل المدرس بنجاح");
        setIsModalVisible(false);
      }
    } catch (error) {
      console.log(error);

      message.error(error.response.data.error);
    }
  };

  const handleNew = async (values, helpers) => {
    try {
      mutate(
        "/api/employee",
        [...data, { ...values, image, graduateImage, contractImage }],
        false
      );
      const res = await axios.post("/api/employee", {
        ...values,
        image,
        graduateImage,
        contractImage,
      });

      trigger("/api/employee");
      if (res.status === 200) {
        helpers.resetForm();
        setdestroyOnClose(true);
        message.success("تم تسجيل المدرس بنجاح");
        setIsModalVisible(false);
      }
    } catch (error) {
      console.log(error);

      message.error(error.response.data.error);
    }
  };
  return (
    <FormStyle>
      <FormStepper
        initialValues={initialValues}
        onSubmit={edit ? handleEdit : handleNew}
      >
        <FormikStep
          label="معلومات شخصية"
          validationSchema={personalInfoValidation}
          loading={loading}
        >
          <FormItem {...layout} name="name" label="اسم ">
            <Input name="name" autoFocus dir="rtl" />
          </FormItem>
          <FormItem {...layout} name="fatherName" label="اسم الاب">
            <Input name="fatherName" dir="rtl" />
          </FormItem>
          <FormItem {...layout} name="motherName" label="اسم الام">
            <Input name="motherName" dir="rtl" />
          </FormItem>
          <FormItem {...layout} name="sex" label="الجنس">
            <Radio.Group name="sex">
              <Radio name="sex" value="ذكر">
                ذكر
              </Radio>
              <Radio name="sex" value="انثى">
                انثى
              </Radio>
            </Radio.Group>
          </FormItem>
        </FormikStep>

        <FormikStep
          loading={loading}
          label="معلومات المدرس"
          validationSchema={studentInfoValidation}
        >
          <FormItem name="dateOfBirth" label="تاريخ الولادة">
            <DatePicker name="dateOfBirth" placeholder="اختر تاريخ" />
          </FormItem>
          <FormItem name="plaseOfBirth" label="مكان الولادة">
            <Input name="plaseOfBirth" dir="rtl" />
          </FormItem>
          <p
            style={{
              marginBottom: "5px",
              marginRight: "5px",
            }}
          >
            :عنوان الاقامة
          </p>
          <AddressStyle>
            <FormItem name="street">
              <Input addonAfter="الشارع" name="street" dir="rtl" />
            </FormItem>
            <FormItem name="region">
              <Input addonAfter="المنطقة" name="region" dir="rtl" />
            </FormItem>
            <FormItem name="city">
              <Input addonAfter="المدينة" name="city" dir="rtl" />
            </FormItem>
          </AddressStyle>
          <AddressStyle>
            <FormItem name="email">
              <Input addonAfter="الايميل" name="email" dir="rtl" />
            </FormItem>
            <FormItem name="number2">
              <Input addonAfter="2   الهاتف" name="number2" dir="rtl" />
            </FormItem>
            <FormItem name="number1">
              <Input addonAfter="1   الهاتف" name="number1" dir="rtl" />
            </FormItem>
          </AddressStyle>
        </FormikStep>

        <FormikStep
          label="الاختصاص"
          validationSchema={subjectValidation}
          loading={loading}
        >
          <FormItem {...layout} name="subject" label="مدرس لمادة">
            <Select
              mode="multiple"
              allowClear
              placeholder="الرجاء الاختيار"
              name="subject"
            >
              {subjects?.map((s, i) => (
                <Option key={i} value={s.text}>
                  {s.text}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem {...layout} name="classNumber" label="الصف">
            <Select
              dropdownClassName="style"
              mode="multiple"
              allowClear
              placeholder="الرجاء الاختيار"
              name="classNumber"
            >
              {classes?.map((c) => (
                <Option value={c.text} key={c.text}>
                  {c.text}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem {...layout} name="division" label="الشعبة">
            <Select
              mode="multiple"
              allowClear
              placeholder="الرجاء الاختيار"
              name="division"
            >
              {division?.map((d) => (
                <Option value={d.text} key={d.text}>
                  {d.text}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem {...layout} name="typeOfDegree" label="الاختصاص">
            <Select
              allowClear
              placeholder="الرجاء الاختيار"
              name="typeOfDegree"
            >
              {subjects?.map((s, i) => (
                <Option key={i} value={s.text}>
                  {s.text}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem {...layout} name="TypeOfCertifcate" label="التحصيل العلمي">
            <Select
              allowClear
              placeholder="الرجاء الاختيار"
              name="TypeOfCertifcate"
            >
              {typeOfCertifcate?.map((s, i) => (
                <Option key={i} value={s.text}>
                  {s.text}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem {...layout} name="DateOfGraduate" label="تاريخ التخرج">
            <DatePicker name="DateOfGraduate" placeholder="اختر تاريخ" />
          </FormItem>
          <FormItem {...layout} name="dateOfStart" label="تاريخ الالتحاق">
            <DatePicker name="dateOfStart" placeholder="اختر تاريخ" />
          </FormItem>
        </FormikStep>

        <FormikStep label="الملحقات" loading={loading}>
          <FormItem name="image">
            <ImageUpload
              loading={loading}
              setLoading={setLoading}
              setImage={setImage}
              imageState={image}
              title="الصورة الشخصية"
            />
          </FormItem>
          <FormItem name="image">
            <ImageUpload
              loading={loading}
              setLoading={setLoading}
              imageState={graduateImage}
              setImage={setGraduateImage}
              title="صورة الشهادة الدراسية"
            />
          </FormItem>
          <FormItem name="image">
            <ImageUpload
              loading={loading}
              setLoading={setLoading}
              imageState={contractImage}
              setImage={setContractImage}
              title="صورة عقد العمل"
            />
          </FormItem>
        </FormikStep>
      </FormStepper>
    </FormStyle>
  );
};

export default AddNewTeacherForm;

interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
  loading: boolean;
}

function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

const FormStepper = ({ children, ...props }: FormikConfig<FormikValues>) => {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (step === childrenArray.length - 1) {
          // on the last step
          await props.onSubmit(values, helpers);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <Form labelAlign="left">
          <Steps size="small" current={step} style={{ marginBottom: "50px" }}>
            {childrenArray.map((c, i) => {
              return <Step key={i} title={c.props.label} />;
            })}
          </Steps>
          {currentChild}
          <div
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row-reverse",
            }}
          >
            <div>
              <Button
                disabled={step === 0 || isSubmitting}
                color="primary"
                onClick={() => setStep((s) => s - 1)}
              >
                للخلف
              </Button>
            </div>

            <div>
              <Button
                disabled={isSubmitting || childrenArray[step].props.loading}
                color="primary"
                htmlType="submit"
              >
                {isSubmitting
                  ? "جاري التسجيل"
                  : isLastStep()
                  ? "تسجيل"
                  : "التالي"}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};