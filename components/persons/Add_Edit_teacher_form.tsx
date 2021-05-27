import { Formik, FormikConfig, FormikValues } from "formik";
import {
  FormItem,
  Input,
  Radio,
  DatePicker,
  Form,
  Select,
  InputNumber,
  TreeSelect,
} from "formik-antd";
import { object, string, date } from "yup";
import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { mutate, trigger } from "swr";

import FormStyle from "../styles/FormStyle";
import {
  classes,
  subjects,
  division,
  typeOfCertifcate,
  jopTitle,
  serviceJopTitle,
  familySituation,
} from "../../utils/SchoolSubjects";
import styled from "styled-components";
const { Step } = Steps;
const { Option } = Select;
const { TreeNode } = TreeSelect;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const AddressStyle = styled.div`
  display: flex;
  direction: ltr;
  justify-content: center;
  margin-top: 10px;
`;

const AddNewTeacherForm = ({
  setIsModalVisible,
  setdestroyOnClose,
  oldData,
  edit,
  type,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const askIfLoading = (state) => {
    setIsImageLoading(state);
  };
  const [image, setImage] = useState(oldData?.image || "");
  const [graduateImage, setGraduateImage] = useState(
    oldData?.graduateImage || ""
  );
  const [contractImage, setContractImage] = useState(
    oldData?.contractImage || ""
  );

  const otherValues = {
    teacher: {
      subject: oldData?.subject || [],
      classNumber: oldData?.classNumber || [],
      division: oldData?.division || [],
      TypeOfCertifcate: oldData?.TypeOfCertifcate || "",
      typeOfDegree: oldData?.typeOfDegree || "",
      DateOfGraduate: oldData?.DateOfGraduate || "",
    },
    administrators: {
      jobTitle: oldData?.jobTitle || "",
      TypeOfCertifcate: oldData?.TypeOfCertifcate || "",
      typeOfDegree: oldData?.typeOfDegree || "",
      DateOfGraduate: oldData?.DateOfGraduate || "",
    },
    services: {
      jobTitle: oldData?.jobTitle || "",
      TypeOfCertifcate: oldData?.TypeOfCertifcate || "",
    },
    students: {
      classNumber: oldData?.classNumber || "",
      division: oldData?.division || "",
      familySituation: oldData?.familySituation || "",
      numberOfBrother: oldData?.numberOfBrother || 0,
      healthSituation: oldData?.healthSituation || "",
      sickType: oldData?.sickType || "",
    },
  };
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
    dateOfStart: oldData?.dateOfStart || "",
    type,
    ...otherValues[type],
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
    dateOfStart: date().required("الرجاء ادخال تاريخ بدأ العمل"),
  });

  const handleEdit = async (values, helpers) => {
    try {
      const res = await axios.put(`/api/names/${type}/${oldData._id}`, {
        ...values,
        image,
        graduateImage,
        contractImage,
      });
      trigger(`/api/names/${type}`);
      if (res.status === 200) {
        helpers.resetForm();
        setdestroyOnClose(true);
        message.success(words[type].edit);
        setIsModalVisible(false);
      }
    } catch (error) {
      console.log(error);

      message.error(error.response.data.error);
    }
  };

  const handleNew = async (values, helpers) => {
    const url = `/api/names/${type}`;
    try {
      const res = await axios.post(url, {
        ...values,
        image,
        graduateImage,
        contractImage,
      });

      trigger(url);
      if (res.status === 200) {
        helpers.resetForm();
        setdestroyOnClose(true);
        message.success(words[type].create);
        setIsModalVisible(false);
      }
    } catch (error) {
      console.log(error);

      message.error(error.response.data.error);
    }
  };

  const otherFormData = {
    teacher: {
      form: (
        <FormikStep
          label="الاختصاص"
          validationSchema={subjectValidation}
          loading={isImageLoading}
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
      ),
    },
    administrators: {
      form: (
        <FormikStep
          label="الاختصاص"
          validationSchema={subjectValidation}
          loading={isImageLoading}
        >
          <FormItem {...layout} name="jobTitle" label="المسمى الوظيفي">
            <Select
              dropdownClassName="style"
              placeholder="الرجاء الاختيار"
              name="jobTitle"
            >
              {jopTitle?.map((c) => (
                <Option value={c.text} key={c.text}>
                  {c.text}
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
      ),
    },
    services: {
      form: (
        <FormikStep
          label="الاختصاص"
          validationSchema={subjectValidation}
          loading={isImageLoading}
        >
          <FormItem {...layout} name="jobTitle" label="المسمى الوظيفي">
            <Select
              dropdownClassName="style"
              placeholder="الرجاء الاختيار"
              name="jobTitle"
            >
              {serviceJopTitle?.map((c) => (
                <Option value={c.text} key={c.text}>
                  {c.text}
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
          <FormItem {...layout} name="dateOfStart" label="تاريخ الالتحاق">
            <DatePicker name="dateOfStart" placeholder="اختر تاريخ" />
          </FormItem>
        </FormikStep>
      ),
    },
    students: {
      form: (
        <FormikStep
          label="معلومات الصف"
          validationSchema={subjectValidation}
          loading={isImageLoading}
        >
          <FormItem {...layout} name="classNumber" label="الصف">
            <Select
              dropdownClassName="style"
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
            <Select allowClear placeholder="الرجاء الاختيار" name="division">
              {division?.map((d) => (
                <Option value={d.text} key={d.text}>
                  {d.text}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem {...layout} name="dateOfStart" label="تاريخ الالتحاق">
            <DatePicker name="dateOfStart" placeholder="اختر تاريخ" />
          </FormItem>
        </FormikStep>
      ),
    },
  };

  const words = {
    teacher: {
      edit: "تم تعديل معلومات المدرس بنجاح",
      create: "تم تسجيل المدرس بنجاح",
      information: "معلومات المدرس",
    },
    administrators: {
      edit: "تم تعديل  معلومات الاداري بنجاح",
      create: "تم تسجيل الاداري بنجاح",
      information: "معلومات الاداري",
    },
    services: {
      edit: "تم تعديل معلومات المستخدم بنجاح",
      create: "تم تسجيل المستخدم بنجاح",
      information: "معلومات المستخدم",
    },
    students: {
      edit: "تم تعديل معلومات الطالب بنجاح",
      create: "تم تسجيل الطالب بنجاح",
      information: "معلومات الطالب",
    },
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
          loading={isImageLoading}
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
          loading={isImageLoading}
          label={words[type]?.information}
          validationSchema={studentInfoValidation}
        >
          <FormItem {...layout} name="dateOfBirth" label="تاريخ الولادة">
            <DatePicker name="dateOfBirth" placeholder="اختر تاريخ" />
          </FormItem>
          <FormItem {...layout} name="plaseOfBirth" label="مكان الولادة">
            <Input name="plaseOfBirth" />
          </FormItem>
          <p
            style={{
              marginRight: "90px",
            }}
          >
            عنوان الاقامة :
          </p>
          <AddressStyle>
            <FormItem name="street">
              <Input addonAfter="الشارع" name="street" />
            </FormItem>
            <FormItem name="region">
              <Input addonAfter="المنطقة" name="region" />
            </FormItem>
            <FormItem {...layout} name="city">
              <Input addonAfter="المدينة" name="city" />
            </FormItem>
          </AddressStyle>
          <AddressStyle>
            <FormItem name="email">
              <Input addonAfter="الايميل" name="email" />
            </FormItem>
            <FormItem name="number2">
              <Input addonAfter="2   الهاتف" name="number2" />
            </FormItem>
            <FormItem {...layout} name="number1">
              <Input addonAfter="1   الهاتف" name="number1" />
            </FormItem>
          </AddressStyle>
        </FormikStep>

        {otherFormData[type]?.form}
        {type === "students" && (
          <FormikStep label="الوضع الاجتماعي" loading={isImageLoading}>
            <FormItem {...layout} name="healthSituation" label="الوضع الصحي">
              <Select
                allowClear
                placeholder="الرجاء الاختيار"
                name="healthSituation"
              >
                <Option value="معافاة">معافاة</Option>
                <Option value="مريض">مريض</Option>
              </Select>
            </FormItem>
            <FormItem {...layout} name="sickType" label="نوع المرض">
              <Input name="sickType" />
            </FormItem>
            <FormItem {...layout} name="familySituation" label="الوضع العائلي">
              <Select
                allowClear
                placeholder="الرجاء الاختيار"
                name="familySituation"
              >
                {familySituation?.map((d) => (
                  <Option value={d.text} key={d.text}>
                    {d.text}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <FormItem {...layout} name="numberOfBrother" label="عدد الاخوة">
              <InputNumber name="numberOfBrother" min={0} max={20} />
            </FormItem>
          </FormikStep>
        )}
        {type === "teacher" && (
          <FormikStep label="الصف" loading={isImageLoading}>
            <FormItem {...layout} name="classNumber" label="الصف">
              <Select
                mode="multiple"
                dropdownClassName="style"
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
              <TreeSelect
                showSearch
                style={{ width: "100%" }}
                name="division"
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                placeholder="اختار الشعبة"
                allowClear
                multiple
                treeCheckable
                showCheckedStrategy="SHOW_CHILD"
              >
                {classes.map((c) => (
                  <TreeNode value={c.value} title={`الصف ${c.text}`}>
                    <TreeNode value={` ${c.value} /اولى`} title="شعبة اولى" />
                    <TreeNode value={` ${c.value}/ثانية`} title="شعبة ثانية" />
                    <TreeNode value={` ${c.value}/ثالثة`} title="شعبة ثالثة" />
                    <TreeNode value={` ${c.value}/رابعة`} title="شعبة رابعة" />
                  </TreeNode>
                ))}
              </TreeSelect>
            </FormItem>
          </FormikStep>
        )}
        <FormikStep label="الملحقات" loading={isImageLoading}>
          <div className="imagesContainer">
            <FormItem name="image">
              <ImageUpload
                askIfLoading={askIfLoading}
                setImage={setImage}
                imageState={image}
                title="الصورة الشخصية"
              />
            </FormItem>
            {type !== "students" && (
              <>
                <FormItem name="image">
                  <ImageUpload
                    askIfLoading={askIfLoading}
                    imageState={graduateImage}
                    setImage={setGraduateImage}
                    title="صورة الشهادة الدراسية"
                  />
                </FormItem>
                <FormItem name="image">
                  <ImageUpload
                    askIfLoading={askIfLoading}
                    imageState={contractImage}
                    setImage={setContractImage}
                    title="صورة عقد العمل"
                  />
                </FormItem>
              </>
            )}
          </div>
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
