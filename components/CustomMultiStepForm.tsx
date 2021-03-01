import { Formik, FormikConfig, FormikValues } from "formik";
import {
  FormItem,
  Input,
  InputNumber,
  Radio,
  DatePicker,
  Form,
  Select,
} from "formik-antd";
import { object, string, mixed } from "yup";
import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import FormStyle from "./styles/FormStyle";
const { Step } = Steps;
const { Option } = Select;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const CustomMultiStepForm = ({ setIsModalVisible, setdestroyOnClose }) => {
  const children = [];
  for (let i = 1; i < 13; i++) {
    children.push(<Option key={i}>{i}</Option>);
  }

  const [imageState, setImage] = useState("");
  const [graduateImage, setGraduateImage] = useState("");
  const initialValues = {
    // name: "",
    // fatherName: "",
    // motherName: "",
    // sex: "",
    // dateOfBirth:  ,
    // plaseOfBirth: "",
    // city: "",
    // region: "",
    // street: "",
    // number1: "",
    // number2: "",

    // email: "",

    subject: [],
    classNumber: [],
    division: [],
    dateOfStart: "",

    typeOfDegree: "",
    DateOfGraduate: "",
  };

  const personalInfoValidation = object({
    // name: string().required("الرجاء ادخال الاسم"),
    // fatherName: string().required("الرجاء ادخال اسم الاب"),
    // motherName: string().required("الرجاء ادخال الام"),
    // sex: string().required("الرجاء ادخال الجنس"),
  });
  const studentInfoValidation = object({
    // plaseOfBirth: string().required("الرجاء ادخال  مكان الولادة"),
    // familySituation: string().required("الرجاء ادخال الحالة الاجتماعية"),
  });

  const addressInfoValidation = object({
    // city: string().required("الرجاء ادخال اسم المدينة"),
    // region: string().required("الرجاء ادخال اسم المنطقة"),
    // street: string().required("الرجاء ادخال اسم الشارع"),
    // number1: string().required("الرجاء ادخال رقم الهاتف"),
    // contactName1: string().required("الرجاء ادخال الاسم"),
    // contactType1: string().required("الرجاء ادخال صلة القرابة"),
  });
  return (
    <FormStyle>
      <FormStepper
        initialValues={initialValues}
        onSubmit={async (values, helpers) => {
          console.log("values", { ...values, image: imageState });
          // try {
          //   const res = await axios.post("/api/student/new", {
          //     ...values,
          //     image: imageState,
          //   });
          //   if (res.status === 200) {
          //     helpers.resetForm();
          //     setdestroyOnClose(true);
          //     message.success("تم تسجيل الطالب بنجاح");
          //     setIsModalVisible(false);
          //   }
          // } catch (error) {
          //   message.error(error.response.data.error);
          //   console.log(error.response.data.error);
          // }
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
          <FormItem name="dateOfBirth" label="تاريخ الميلاد">
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

        <FormikStep label="الاختصاص">
          subject: [], classNumber: [], division: [],
          <FormItem {...layout} name="subject" label="المسمى الوظيفي">
            <Select
              mode="multiple"
              allowClear
              placeholder="الرجاء الاختيار"
              defaultValue={[1]}
              name="subject"
            >
              <Option value="arabic">لغة عربية</Option>
              <Option value="math">رياضيات</Option>
            </Select>
          </FormItem>
          <FormItem {...layout} name="classNumber" label="الصف">
            {/* <InputNumber name="classNumber" autoFocus /> */}
            <Select
              mode="multiple"
              allowClear
              placeholder="الرجاء الاختيار"
              defaultValue={[1]}
              name="classNumber"
            >
              {children}
            </Select>
          </FormItem>
          <FormItem {...layout} name="division" label="الشعبة">
            <InputNumber name="division" />
          </FormItem>
          <FormItem {...layout} name="typeOfDegree" label="الاختصاص">
            <InputNumber name="typeOfDegree" />
          </FormItem>
          <FormItem {...layout} name="DateOfGraduate" label="تاريخ التخرج">
            <DatePicker name="DateOfGraduate" placeholder="اختر تاريخ" />
          </FormItem>
          <FormItem {...layout} name="dateOfStart" label="تاريخ الالتحاق">
            <DatePicker name="dateOfStart" placeholder="اختر تاريخ" />
          </FormItem>
        </FormikStep>

        <FormikStep label="صورة الطالب">
          <FormItem name="image">
            <ImageUpload setImage={setImage} />
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
