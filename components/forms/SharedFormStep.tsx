import { DatePicker, FormItem, Input, Radio, Select } from "formik-antd";
import React from "react";
import { subjects, typeOfCertifcate } from "../../utils/SchoolSubjects";
import ImageUpload from "../persons/ImageUpload";
import TextInput from "./TextInput";
const { Option } = Select;

export function PersonalFormStep({ layout }) {
  return (
    <>
      <TextInput name="name" label="الاسم" autoFocus />
      <TextInput name="fatherName" label="اسم الاب" />
      <TextInput name="motherName" label="اسم الام" />
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
      <TextInput name="plaseOfBirth" label="مكان الولادة" />
      <TextInput name="address" label="عنوان الاقامة" />
      <TextInput name="phone" label="رقم الهاتف" />
      {!props.noEmail && <TextInput name="email" label="الايميل" />}
      {props.children}
    </>
  );
};

export const JobFormStep = ({ layout, ...props }) => {
  return (
    <>
      {props.children}
      {!props.serviceForm && (
        <FormItem {...layout} name="typeOfDegree" label="الاختصاص">
          <Select allowClear placeholder="الرجاء الاختيار" name="typeOfDegree">
            {subjects?.map((s, i) => (
              <Option key={i} value={s.text}>
                {s.text}
              </Option>
            ))}
          </Select>
        </FormItem>
      )}
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
      {!props.serviceForm && (
        <FormItem {...layout} name="DateOfGraduate" label="تاريخ التخرج">
          <DatePicker name="DateOfGraduate" placeholder="اختر تاريخ" />
        </FormItem>
      )}
      <FormItem {...layout} name="dateOfStart" label="تاريخ الالتحاق">
        <DatePicker name="dateOfStart" placeholder="اختر تاريخ" />
      </FormItem>
    </>
  );
};

export const ImagesFormStep = ({ setImage, image, askIfLoading, ...props }) => {
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
      {props.children}
    </div>
  );
};
