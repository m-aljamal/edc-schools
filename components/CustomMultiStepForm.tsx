import { Formik, FormikConfig, FormikValues } from "formik";
import { FormItem, Input, Radio, DatePicker, Form, Select } from "formik-antd";
import { object, string, date } from "yup";
import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import useSWR from "swr";
import { mutate, trigger } from "swr";

import FormStyle from "./styles/FormStyle";
import {
  classes,
  subjects,
  division,
  typeOfCertifcate,
} from "../utils/SchoolSubjects";
const { Step } = Steps;
const { Option } = Select;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const CustomMultiStepForm = ({ setIsModalVisible, setdestroyOnClose }) => {
  const { data } = useSWR("/api/employee");

  const [imageState, setImage] = useState("");
  const [graduateImage, setGraduateImage] = useState("");
  const initialValues = {
    name: "",
    fatherName: "",
    motherName: "",
    sex: "",
    dateOfBirth: "",
    plaseOfBirth: "",
    city: "",
    region: "",
    street: "",
    number1: "",
    number2: "",
    email: "",
    subject: [],
    classNumber: [],
    division: [],
    dateOfStart: "",
    TypeOfCertifcate: "",
    typeOfDegree: "",
    DateOfGraduate: "",
    type: "teacher",
  };

  const personalInfoValidation = object({
    name: string().required("الرجاء ادخال الاسم"),
    fatherName: string().required("الرجاء ادخال اسم الاب"),
    motherName: string().required("الرجاء ادخال الام"),
    sex: string().required("الرجاء ادخال الجنس"),
  });
  const studentInfoValidation = object({
    plaseOfBirth: string().required("الرجاء ادخال  مكان الولادة"),
    dateOfBirth: date().required("الرجاء ادخال تاريخ الولادة"),
    city: string().required("الرجاء ادخال اسم المدينة"),
    region: string().required("الرجاء ادخال اسم المنطقة"),
    street: string().required("الرجاء ادخال اسم الشارع"),
    number1: string().required("الرجاء ادخال رقم الهاتف"),
    email: string().email().required("الرجاء ادخال الايميل"),
  });

  const subjectValidation = object({
    typeOfDegree: string().required("الرجاء ادخال الاختصاص"),
    TypeOfCertifcate: string().required("الرجاء اختيار اخر تحصيل علمي"),
    DateOfGraduate: date().required("الرجاء ادخال تاريخ التخرج"),
    dateOfStart: date().required("الرجاء ادخال تاريخ بدأ العمل"),
  });

  return (
    <FormStyle>
      <FormStepper
        initialValues={initialValues}
        onSubmit={async (values, helpers) => {
          try {
            mutate("/api/employee", [...data, values], false);
            const res = await axios.post("/api/employee/new", {
              ...values,
              image: imageState,
              graduateImage: graduateImage,
            });
            trigger("/api/employee");
            if (res.status === 200) {
              helpers.resetForm();
              setdestroyOnClose(true);
              message.success("تم تسجيل الطالب بنجاح");
              setIsModalVisible(false);
            }
          } catch (error) {
            message.error(error.response.data.error);
          }
        }}
      >
        <FormikStep
          label="معلومات شخصية"
          validationSchema={personalInfoValidation}
        >
          <FormItem {...layout} name="name" label="اسم ">
            <Input name="name" autoFocus />
          </FormItem>
          <FormItem {...layout} name="fatherName" label="اسم الاب">
            <Input name="fatherName" />
          </FormItem>
          <FormItem {...layout} name="motherName" label="اسم الام">
            <Input name="motherName" />
          </FormItem>
          <FormItem {...layout} name="sex" label="الجنس">
            <Radio.Group name="sex">
              <Radio name="sex" value="male">
                ذكر
              </Radio>
              <Radio name="sex" value="femal">
                انثى
              </Radio>
            </Radio.Group>
          </FormItem>
        </FormikStep>

        <FormikStep
          label="معلومات المدرس"
          validationSchema={studentInfoValidation}
        >
          <FormItem name="dateOfBirth" label="تاريخ الولادة">
            <DatePicker name="dateOfBirth" placeholder="اختر تاريخ" />
          </FormItem>
          <FormItem name="plaseOfBirth" label="مكان الولادة">
            <Input name="plaseOfBirth" />
          </FormItem>
          <p
            style={{
              textAlign: "end",
              marginBottom: "5px",
              marginRight: "5px",
            }}
          >
            :عنوان الاقامة
          </p>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <FormItem name="street">
              <Input addonAfter="الشارع" name="street" />
            </FormItem>
            <FormItem name="region">
              <Input addonAfter="المنطقة" name="region" />
            </FormItem>
            <FormItem name="city">
              <Input addonAfter="المدينة" name="city" />
            </FormItem>
          </div>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <FormItem name="email">
              <Input addonAfter="الايميل" name="email" />
            </FormItem>
            <FormItem name="number2">
              <Input addonAfter="2   الهاتف" name="number2" />
            </FormItem>
            <FormItem name="number1">
              <Input addonAfter="1   الهاتف" name="number1" />
            </FormItem>
          </div>
        </FormikStep>

        <FormikStep label="الاختصاص" validationSchema={subjectValidation}>
          <FormItem {...layout} name="subject" label="مدرس لمادة">
            <Select
              mode="multiple"
              allowClear
              placeholder="الرجاء الاختيار"
              name="subject"
            >
              {subjects?.map((s, i) => (
                <Option key={i} value={s.value}>
                  {s.title}
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
                <Option value={c.value} key={c.value}>
                  {c.title}
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
                <Option value={d.value} key={d.value}>
                  {d.title}
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
                <Option key={i} value={s.value}>
                  {s.title}
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
                <Option key={i} value={s.value}>
                  {s.title}
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

        <FormikStep label="الملحقات">
          <FormItem name="image">
            <ImageUpload
              setImage={setImage}
              imageState={imageState}
              title="تحميل صورة المدرس"
            />
          </FormItem>
          <FormItem name="image">
            <ImageUpload
              imageState={graduateImage}
              setImage={setGraduateImage}
              title=" تحميل صورة الشهادة الدراسية"
            />
          </FormItem>
        </FormikStep>
      </FormStepper>
    </FormStyle>
  );
};

export default CustomMultiStepForm;

interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
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
      {({ isSubmitting }) => (
        <Form
          labelAlign="left"
          // colon={false}
        >
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
              <Button disabled={isSubmitting} color="primary" htmlType="submit">
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
