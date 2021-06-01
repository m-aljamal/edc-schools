import { useState } from "react";
import FormStepper, { FormikStep } from "./FormStepper";
import { FormItem, Input, Select, TreeSelect } from "formik-antd";

import FormStyle from "../styles/FormStyle";
import { classes, subjects } from "../../utils/SchoolSubjects";
import { sharedInitialValues } from "./shredInitialValues";
import {
  PersonalFormStep,
  ContactFormStep,
  JobFormStep,
  ImagesFormStep,
} from "./SharedFormStep";
import {
  InfoValidation,
  personalInfoValidation,
  subjectValidation,
} from "./formValidation";
import ImageUpload from "../persons/ImageUpload";
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

  const initialValues = {
    password: oldData?.password || "",
    subject: oldData?.subject || [],
    classNumber: oldData?.classNumber || [],
    division: oldData?.division || [],
    ...sharedInitialValues(oldData, type),
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
          >
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
          </ImagesFormStep>
        </FormikStep>
      </FormStepper>
    </FormStyle>
  );
}
