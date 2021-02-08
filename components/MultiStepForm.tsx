import { Form, Formik, FormikConfig, FormikValues } from "formik";
import { FormItem, Input, InputNumber, Radio, DatePicker } from "formik-antd";
import { object, string, number, boolean, array, mixed } from "yup";
import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import ImageUpload from "./ImageUpload";
import axios from "axios";
const { Step } = Steps;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const MultiStepForm = ({ setIsModalVisible, setdestroyOnClose }) => {
  const [imageState, setImage] = useState("");
  const initialValues = {
    name: "",
    fatherName: "",
    motherName: "",
    sex: "",
    dateOfBirth: new Date().toISOString(),
    plaseOfBirth: "",
    numberOfBrother: 0,
    familySituation: "",
    healthSituation: "",
    sickType: "",
    classNumber: 1,
    division: 1,
    dateOfStart: new Date().toISOString(),
    city: "",
    region: "",
    street: "",
    number1: "",
    contactName1: "",
    contactType1: "",
    number2: "",
    contactName2: "",
    contactType2: "",
  };

  const personalInfoValidation = object({
    name: string().required("الرجاء ادخال الاسم"),
    fatherName: string().required("الرجاء ادخال اسم الاب"),
    motherName: string().required("الرجاء ادخال الام"),
    sex: string().required("الرجاء ادخال الجنس"),
  });
  const studentInfoValidation = object({
    healthSituation: string().required("الرجاء ادخال الحالة الصحية"),
    sickType: mixed().when("healthSituation", {
      is: (healthSituation) => healthSituation === "sick",
      then: string().required(" لان الطالب لديه مرض, يرجى ادخل نوع المرض"),
    }),
    plaseOfBirth: string().required("الرجاء ادخال  مكان الولادة"),
    familySituation: string().required("الرجاء ادخال الحالة الاجتماعية"),
  });

  const addressInfoValidation = object({
    city: string().required("الرجاء ادخال اسم المدينة"),
    region: string().required("الرجاء ادخال اسم المنطقة"),
    street: string().required("الرجاء ادخال اسم الشارع"),
    number1: string().required("الرجاء ادخال رقم الهاتف"),
    contactName1: string().required("الرجاء ادخال الاسم"),
    contactType1: string().required("الرجاء ادخال صلة القرابة"),
  });

  return (
    <FormStepper
      initialValues={initialValues}
      onSubmit={async (values, helpers) => {
        console.log("values", { ...values, image: imageState });
        try {
          const res = await axios.post("/api/student/new", {
            ...values,
            image: imageState,
          });
          if (res.status === 200) {
            helpers.resetForm();
            setdestroyOnClose(true);
            message.success("تم تسجيل الطالب بنجاح");
            setIsModalVisible(false);
          }
        } catch (error) {
          message.error(error.response.data.error);
          console.log(error.response.data.error);
        }
      }}
    >
      <FormikStep
        label="معلومات شخصية"
        validationSchema={personalInfoValidation}
      >
        <FormItem {...layout} name="name" label="اسم الطالب">
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
        label="معلومات الطالب"
        validationSchema={studentInfoValidation}
      >
        <FormItem {...layout} name="healthSituation" label="الحالة الصحية">
          <Radio.Group
            name="healthSituation"
            options={[
              { label: "معافى", value: "healthy" },
              { label: "مريض", value: "sick" },
            ]}
          />
        </FormItem>

        <FormItem {...layout} name="sickType" label="نوع المرض">
          <Input name="sickType" />
        </FormItem>

        <FormItem {...layout} name="dateOfBirth" label="تاريخ الميلاد">
          <DatePicker name="dateOfBirth" />
        </FormItem>
        <FormItem {...layout} name="plaseOfBirth" label="مكان الولادة">
          <Input name="plaseOfBirth" />
        </FormItem>
        <FormItem {...layout} name="numberOfBrother" label="عدد الاخوة">
          <InputNumber name="numberOfBrother" />
        </FormItem>

        <FormItem {...layout} name="familySituation" label="الحالة الاجتماعية">
          <Radio.Group name="familySituation" style={{ marginLeft: "10px" }}>
            <div>
              <Radio name="familySituation" value="parents">
                أبوان
              </Radio>
              <Radio
                name="familySituation"
                value="orphanParents"
                style={{ marginLeft: "35px" }}
              >
                يتيم الأبوين
              </Radio>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Radio name="familySituation" value="orphanMother">
                يتيم الأم
              </Radio>
              <Radio
                name="familySituation"
                value="orphanFather"
                style={{ marginLeft: "15px" }}
              >
                يتيم الأب
              </Radio>
            </div>
          </Radio.Group>
        </FormItem>
      </FormikStep>

      <FormikStep label="الصف">
        <FormItem {...layout} name="classNumber" label="الصف">
          <InputNumber name="classNumber" autoFocus  />
        </FormItem>

        <FormItem {...layout} name="division" label="الشعبة">
          <InputNumber name="division" />
        </FormItem>
        <FormItem {...layout} name="dateOfStart" label="تاريخ الالتحاق">
          <DatePicker name="dateOfStart" />
        </FormItem>
      </FormikStep>

      <FormikStep label="العنوان" validationSchema={addressInfoValidation}>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <FormItem name="city">
            <Input addonBefore="المدينة" name="city" autoFocus />
          </FormItem>
          <FormItem name="region">
            <Input addonBefore="المنطقة" name="region" />
          </FormItem>
          <FormItem name="street">
            <Input addonBefore="الشارع" name="street" />
          </FormItem>
        </div>

        <div style={{ display: "flex", marginBottom: "20px" }}>
          <FormItem name="number1">
            <Input addonBefore="1 رقم الهاتف" name="number1" />
          </FormItem>
          <FormItem name="contactName1">
            <Input addonBefore="الاسم" name="contactName1" />
          </FormItem>
          <FormItem name="contactType1">
            <Input addonBefore="صلة القرابة" name="contactType1" />
          </FormItem>
        </div>

        <div style={{ display: "flex", marginBottom: "20px" }}>
          <Input addonBefore="2 رقم الهاتف" name="number2" />
          <Input addonBefore="الاسم" name="contactName2" />
          <Input addonBefore="صلة القرابة" name="contactType2" />
        </div>
      </FormikStep>
      <FormikStep label="صورة الطالب">
        <FormItem name="image">
          <ImageUpload setImage={setImage} />
        </FormItem>
      </FormikStep>
    </FormStepper>
  );
};

export default MultiStepForm;

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
        <Form>
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
