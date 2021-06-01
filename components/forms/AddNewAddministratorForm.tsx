import { useState } from "react";
import FormStepper, { FormikStep } from "./FormStepper";
import { FormItem, Input, Radio, DatePicker, Select } from "formik-antd";
import { object, date } from "yup";
import ImageUpload from "../persons/ImageUpload";

import FormStyle from "../styles/FormStyle";
import {
  jopTitle,
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

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
export default function AddNewAddministratorForm({
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
    jobTitle: oldData?.jobTitle || "",
    ...sharedInitialValues(oldData, type),
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
          <ContactFormStep layout={layout} />
        </FormikStep>
        <FormikStep
          label="الاختصاص"
          validationSchema={subjectValidation}
          loading={isImageLoading}
        >
          <JobFormStep layout={layout}>
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
          </JobFormStep>
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
