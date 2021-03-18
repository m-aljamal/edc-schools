import React from "react";
import styled from "styled-components";
import SkeletonLoading from "./SkeletonLoading";
const ProfileStyle = styled.div`
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
      padding: 0 0 25px 25px;
    }
  }
`;
const ProfilePage = ({ userInfo }) => {
  if (!userInfo) return <SkeletonLoading />;
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
  } = userInfo;
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
          {dateOfBirth}
        </h3>
        <h3>
          <span>التحصيل العلمي:</span>
          {TypeOfCertifcate}
        </h3>
        <h3>
          <span>الايميل:</span>
          {email}
        </h3>
        <div>
          <a href={graduateImage.url} target="_blank" download>
            <img src={graduateImage.url} width="100" height="100" />
          </a>
        </div>
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

// DateOfGraduate: "2021-03-22T12:37:37.805Z"

// city: "دمشق"
// classNumber: ["الرابع"]
// contractImage: {public_id: "jWZLN2Pi6ds6DH_QUmNtd", url: "https://res.cloudinary.com/dqoung1wz/image/upload/v1615120681/jWZLN2Pi6ds6DH_QUmNtd.jpg"}
// dateOfBirth: "2021-03-01T12:37:14.152Z"
// dateOfStart: "2021-03-28T12:37:39.113Z"
// division: ["الخامسة"]
// email: "m@m.com"

// graduateImage: {public_id: "uMnY_zb2fNEcB8Lrj3u5n", url: "https://res.cloudinary.com/dqoung1wz/image/upload/v1615120675/uMnY_zb2fNEcB8Lrj3u5n.jpg"}
// image: {public_id: "71naFrxFqiFq2wqFgRCM6", url: "https://res.cloudinary.com/dqoung1wz/image/upload/v1615130629/71naFrxFqiFq2wqFgRCM6.jpg"}

// number1: "333"
// number2: "44"
// plaseOfBirth: "دمشق"
// region: "دمشق"
// schoolId: "3l-FKqSDBZBwuBgramn2j"

// street: "دمشق"
// subject: ["علوم"]

// typeOfDegree: "رياضيات"
// _id: "Xd8sJOYWj4SX7R
