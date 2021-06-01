import { DatePicker, FormItem, Input, Radio, Select } from "formik-antd";
import React from "react";
import { object } from "yup";
import { subjects, typeOfCertifcate } from "../../utils/SchoolSubjects";
import ImageUpload from "../persons/ImageUpload";
import { FormikStep } from "./FormStepper";
const { Option } = Select;

export function PersonalFormStep({ layout }) {
  return (
    <>
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
    </>
  );
}

export const ContactFormStep = ({ layout, ...props }) => {
  return (
    <>
      <FormItem {...layout} name="dateOfBirth" label="تاريخ الولادة">
        <DatePicker name="dateOfBirth" placeholder="اختر تاريخ" />
      </FormItem>
      <FormItem {...layout} name="plaseOfBirth" label="مكان الولادة">
        <Input name="plaseOfBirth" />
      </FormItem>

      <FormItem {...layout} name="address" label="عنوان الاقامة">
        <Input name="address" />
      </FormItem>
      <FormItem {...layout} name="phone" label="رقم الهاتف">
        <Input name="phone" />
      </FormItem>
      <FormItem {...layout} name="email" label="الايميل">
        <Input name="email" />
      </FormItem>
      {props.children}
    </>
  );
};

export const JobFormStep = ({ layout, ...props }) => {
  return (
    <>
      {props.children}
      <FormItem {...layout} name="typeOfDegree" label="الاختصاص">
        <Select allowClear placeholder="الرجاء الاختيار" name="typeOfDegree">
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
    </>
  );
};

export const ImagesFormStep = ({
  setImage,
  image,
  askIfLoading,
  graduateImage,
  setGraduateImage,
  contractImage,
  setContractImage,
}) => {
  return (
    <div className="imagesContainer">
      <FormItem name="image">
        <ImageUpload
          askIfLoading={askIfLoading}
          setImage={setImage}
          imageState={image}
          title="الصورة الشخصية"
        />
      </FormItem>

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
    </div>
  );
};
