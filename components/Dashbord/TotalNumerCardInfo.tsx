import styled from "styled-components";

const SingleInfoStyle = styled.div`
  display: flex;
  background-color: white;
  padding: 10px 20px;
  align-items: center;
  box-shadow: var(--bs);
  border-radius: 5px;
  justify-content: space-between;
  width: 250px;
  p {
    font-size: 1.7rem;
  }
  .number {
    color: var(--blue);
    font-weight: bold;
  }
  .icon {
    width: 60px;
    margin-right: 20px;
  }
`;

const TotalNumerCardInfo = ({ data }) => {
  const words = {
    teacher: {
      text: "مدرس",
      icon: "/icons/classroom.svg",
    },
    administrators: {
      text: "اداري",
      icon: "/icons/manger.png",
    },
    services: {
      text: "مستخدم",
      icon: "/icons/cleaning-staff.svg",
    },
    students: {
      text: "طلاب",
      icon: "/icons/students.svg",
    },
  };
  return (
    <SingleInfoStyle>
      <div>
        <p>{words[data?._id.type].text}</p>
        <p className="number">{data?.total}</p>
      </div>
      <img src={words[data?._id.type].icon} alt="icon" className="icon" />
    </SingleInfoStyle>
  );
};

export default TotalNumerCardInfo;
