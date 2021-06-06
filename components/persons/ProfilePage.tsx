import React from "react";
import styled from "styled-components";
import SkeletonLoading from "../shared/SkeletonLoading";
const ProfileStyle = styled.div`
  line-height: 2;
  display: flex;
  .image {
    display: inline-flex;
    max-width: 250px;
    img {
      width: 100%;
      height: 250px;
    }
  }
  .info {
    flex: 1;
    margin-right: 30px;
    span {
      color: var(--blue);
      padding-left: 20px;
    }
  }
  .array {
    display: flex;
  }
  .arrayContent {
    display: flex;
  }
  .element {
    margin-left: 20px;
  }
`;
const ProfilePage = ({ data, type }) => {
  if (!data) return <SkeletonLoading />;
  const {
    image,
    name,
    sex,
    fatherName,
    motherName,
    TypeOfCertifcate,
    dateOfBirth,
    email,
    graduateImage,
    plaseOfBirth,
    typeOfDegree,
    DateOfGraduate,
    city,
    region,
    street,
    number1,
    number2,
    contractImage,
    dateOfStart,
    subject,
    division,
    classNumber,
    jobTitle,
    familySituation,
    numberOfBrother,
    healthSituation,
    sickType,
  } = data;

  const showData = {
    students: (
      <>
        <h3>
          <span> الصف :</span>
          {classNumber}
        </h3>
        <h3>
          <span> الشعبة :</span>
          {division}
        </h3>
        <h3>
          <span> الوضع الاجتماعي :</span>
          {familySituation}
        </h3>
        <h3>
          <span>عدد الاخوة :</span>
          {numberOfBrother}
        </h3>
        <h3>
          <span>الوضع الصحي :</span>
          {healthSituation}
        </h3>
        {healthSituation !== "معافاة" && (
          <h3>
            <span>نوع المرض :</span>
            {sickType}
          </h3>
        )}
      </>
    ),
    services: (
      <>
        <h3>
          <span>التحصيل العلمي:</span>
          {TypeOfCertifcate}
        </h3>
        <h3>
          <span> المسمى الوظيفي :</span>
          {jobTitle}
        </h3>
      </>
    ),
    teacher: (
      <>
        <h3>
          <span>التحصيل العلمي:</span>
          {TypeOfCertifcate}
        </h3>
        <h3>
          <span> الأختصاص:</span>
          {typeOfDegree}
        </h3>
        <h3>
          <span> تاريخ التخرج:</span>
          {new Date(DateOfGraduate).toLocaleDateString()}
        </h3>
        <h3 className="arrayContent">
          <span> مدرس لمادة :</span>
          <p className="array">
            {subject?.map((s) => (
              <p className="element" key={s}>
                {s}
              </p>
            ))}
          </p>
        </h3>
        {type === "teacher" && (
          <>
            <h3 className="arrayContent">
              <span> الصف :</span>
              <p className="array">
                {classNumber?.map((s) => (
                  <p className="element" key={s}>
                    {s}
                  </p>
                ))}
              </p>
            </h3>
            <h3 className="arrayContent">
              <span> الشعبة :</span>
              <p className="array">
                {division?.map((s) => (
                  <p className="element" key={s}>
                    {s}
                  </p>
                ))}
              </p>
            </h3>
          </>
        )}
      </>
    ),
    administrators: (
      <>
        <h3>
          <span>التحصيل العلمي:</span>
          {TypeOfCertifcate}
        </h3>
        <h3>
          <span> الأختصاص:</span>
          {typeOfDegree}
        </h3>
        <h3>
          <span> تاريخ التخرج:</span>
          {new Date(DateOfGraduate).toLocaleDateString()}
        </h3>
        <h3>
          <span> المسمى الوظيفي :</span>
          {jobTitle}
        </h3>
      </>
    ),
  };

  return (
    <ProfileStyle>
      <div className="info">
        <h3>
          <span>الاسم: </span>
          {name}
        </h3>
        <h3>
          <span>اسم الاب: </span>
          {fatherName}
        </h3>
        <h3>
          <span>اسم الام:</span>
          {motherName}
        </h3>
        <h3>
          <span>الجنس:</span>
          {sex}
        </h3>
        <h3>
          <span>تاريخ الميلاد:</span>
          {new Date(dateOfBirth).toLocaleDateString()}
        </h3>
        <h3>
          <span>مكان الولادة:</span>
          {plaseOfBirth}
        </h3>

        <h3>
          <span>الايميل:</span>
          {email}
        </h3>
        <h3>
          <span>عنوان الاقامة:</span>
          {city} - {region} - {street}
        </h3>
        <h3>
          <span> رقم الهاتف:</span>
          {number1}
        </h3>
        <h3>
          <span> رقم الهاتف :</span>
          {number2}
        </h3>
        <h3>
          <span> تاريخ البدء :</span>
          {new Date(dateOfStart).toLocaleDateString()}
        </h3>
        {showData[type]}
        {type !== "students" && (
          <div className="imageLink">
            <a href={graduateImage?.url} target="_blank" download>
              <img src={graduateImage?.url} width="100" height="100" />
            </a>
            <a href={contractImage?.url} target="_blank" download>
              <img src={contractImage?.url} width="100" height="100" />
            </a>
          </div>
        )}
      </div>
      <div className="image">
        <img
          src={
            image.url
              ? image.url
              : sex === "ذكر"
              ? "/images/male.jpg"
              : "/images/femal.png"
          }
          alt="profile image"
        />
      </div>
    </ProfileStyle>
  );
};

export default ProfilePage;
