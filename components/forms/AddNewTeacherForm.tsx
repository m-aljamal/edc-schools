import { useState } from "react";
import FormStepper, { FormikStep } from "./FormStepper";
import {
  FormItem,
  Input,
  Radio,
  DatePicker,
  Select,
  TreeSelect,
} from "formik-antd";
import { object, string, date } from "yup";
import { Steps } from "antd";
import ImageUpload from "../persons/ImageUpload";

import FormStyle from "../styles/FormStyle";
import {
  classes,
  subjects,
  typeOfCertifcate,
} from "../../utils/SchoolSubjects";
import { sharedInitialValues } from "./shredInitialValues";
import {
  PersonalFormStep,
  ContactFormStep,
  JobFormStep,
  ImagesFormStep,
} from "./SharedFormStep";
const { Option } = Select;
const { TreeNode } = TreeSelect;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
export default function AddNewTeacherForm({
  oldData,
  edit,
  handleEdit,
  handleNew,
  image,
  setImage,
  graduateImage,
  setGraduateImage,
  contractImage,
  setContractImage,
  type,
}) {
  const [isImageLoading, setIsImageLoading] = useState(false);

  const askIfLoading = (state) => {
    setIsImageLoading(state);
  };
  const personalInfoValidation = object({
    // name: string().required("الرجاء ادخال الاسم"),
    // fatherName: string().required("الرجاء ادخال اسم الاب"),
    // motherName: string().required("الرجاء ادخال الام"),
    // sex: string().required("الرجاء ادخال الجنس"),
  });
  const InfoValidation = object({
    // plaseOfBirth: string().required("الرجاء ادخال  مكان الولادة"),
    // dateOfBirth: date().required("الرجاء ادخال تاريخ الولادة"),
    // street: string().required("الرجاء ادخال العنوان "),
    // number1: string().required("الرجاء ادخال رقم الهاتف"),
    // email: string().email().required("الرجاء ادخال الايميل"),
  });

  const initialValues = {
    password: oldData?.password || "",
    subject: oldData?.subject || [],
    classNumber: oldData?.classNumber || [],
    division: oldData?.division || [],
    ...sharedInitialValues(oldData, type),
  };

  const subjectValidation = object({
    dateOfStart: date().required("الرجاء ادخال تاريخ بدأ العمل"),
  });

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
          <PersonalFormStep layout={layout} />
        </FormikStep>
        <FormikStep
          loading={isImageLoading}
          label="معلومات التواصل"
          validationSchema={InfoValidation}
        >
          <ContactFormStep layout={layout}>
            <FormItem {...layout} name="password" label="كلمة السر">
              <Input name="password" />
            </FormItem>
          </ContactFormStep>
        </FormikStep>
        <FormikStep
          label="الاختصاص"
          validationSchema={subjectValidation}
          loading={isImageLoading}
        >
          <JobFormStep layout={layout}>
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
          </JobFormStep>
        </FormikStep>

        <FormikStep label="الصف" loading={isImageLoading}>
          <FormItem {...layout} name="classNumber" label="الصف">
            <Select
              mode="multiple"
              dropdownClassName="style"
              allowClear
              placeholder="الرجاء الاختيار"
              name="classNumber"
            >
              {classes?.map((c, i) => (
                <Option value={c.text} key={i}>
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
                <TreeNode
                  value={c.value}
                  title={`الصف ${c.text}`}
                  key={c.value}
                >
                  <TreeNode value={` ${c.value} /اولى`} title="شعبة اولى" />
                  <TreeNode value={` ${c.value}/ثانية`} title="شعبة ثانية" />
                  <TreeNode value={` ${c.value}/ثالثة`} title="شعبة ثالثة" />
                  <TreeNode value={` ${c.value}/رابعة`} title="شعبة رابعة" />
                </TreeNode>
              ))}
            </TreeSelect>
          </FormItem>
        </FormikStep>

        <FormikStep label="الملحقات" loading={isImageLoading}>
          <ImagesFormStep
            setImage={setImage}
            image={image}
            askIfLoading={askIfLoading}
            graduateImage={graduateImage}
            setGraduateImage={setGraduateImage}
            contractImage={contractImage}
            setContractImage={setContractImage}
          />
        </FormikStep>
      </FormStepper>
    </FormStyle>
  );
}
