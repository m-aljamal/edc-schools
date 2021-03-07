import React from "react";
import styled from "styled-components";
import { Skeleton } from "antd";
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
      color: var(--slid);
    }
  }
`;
const Profile = ({ data }) => {
  if (!data) return <Skeleton avatar paragraph={{ rows: 4 }} />;
  const { image, name, sex, fatherName, motherName } = data;
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

export default Profile;

// DateOfGraduate: "2021-03-22T12:37:37.805Z"
// TypeOfCertifcate: "ماجستير"
// city: "دمشق"
// classNumber: ["الرابع"]
// contractImage: {public_id: "jWZLN2Pi6ds6DH_QUmNtd", url: "https://res.cloudinary.com/dqoung1wz/image/upload/v1615120681/jWZLN2Pi6ds6DH_QUmNtd.jpg"}
// dateOfBirth: "2021-03-01T12:37:14.152Z"
// dateOfStart: "2021-03-28T12:37:39.113Z"
// division: ["الخامسة"]
// email: "m@m.com"
// fatherName: "الاب"
// graduateImage: {public_id: "uMnY_zb2fNEcB8Lrj3u5n", url: "https://res.cloudinary.com/dqoung1wz/image/upload/v1615120675/uMnY_zb2fNEcB8Lrj3u5n.jpg"}
// image: {public_id: "71naFrxFqiFq2wqFgRCM6", url: "https://res.cloudinary.com/dqoung1wz/image/upload/v1615130629/71naFrxFqiFq2wqFgRCM6.jpg"}
// motherName: "الام"
// name: "مصطفى الشيخ "
// number1: "333"
// number2: "44"
// plaseOfBirth: "دمشق"
// region: "دمشق"
// schoolId: "3l-FKqSDBZBwuBgramn2j"
// sex: "انثى"
// street: "دمشق"
// subject: ["علوم"]
// type: "teacher"
// typeOfDegree: "رياضيات"
// _id: "Xd8sJOYWj4SX7R
