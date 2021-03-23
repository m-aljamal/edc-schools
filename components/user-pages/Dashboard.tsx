import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";

const DashboaedStyle = styled.div`
  .totalInfo {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 50px;
  }
`;

const Dashboard = ({ totalNumbers }) => {
  console.log({ totalNumbers });

  // const words = {
  //   students: {
  //     name: " طلاب",
  //     count: totalNumbers.students,
  //     icon: "/icons/student.svg",
  //   },
  //   teachers: {
  //     name: "معلم",
  //     count: totalNumbers.teachers,
  //     icon: "/icons/classroom.svg",
  //   },
  //   administrators: {
  //     name: " اداري",
  //     count: totalNumbers.administrators,
  //     icon: "/icons/manager.svg",
  //   },
  //   services: {
  //     name: " خدمي",
  //     count: totalNumbers.services,
  //     icon: "/icons/cleaning-staff.svg",
  //   },
  // };


  // const d = {
  //   labels: ["ذكور", "اناث"],
  //   datasets: [
  //     {
  //       data: [totalNumbers.femalStudents, totalNumbers.maleStudents],
  //       backgroundColor: ["#336699", "#999933"],
  //     },
  //   ],
  // };
  return (
    <DashboaedStyle>
      <div className="totalInfo">
        {/* {Object.keys(totalNumbers).map((key, i) => (
          <SingleInfo data={words[key]} key={i} />
        ))} */}
      </div>
      {/* <Doughnut data={d} /> */}
    </DashboaedStyle>
  );
};

export default Dashboard;

const SingleInfoStyle = styled.div`
  display: flex;
  padding: 15px 0;
  align-items: center;
  box-shadow: var(--bs);
  justify-content: space-evenly;
  border-radius: 5px;
  background-color: white;
  .icon {
    width: 50px;
  }
`;

const SingleInfo = ({ data }) => {
  return (
    <SingleInfoStyle>
      <div>
        <p>{data?.count}</p>
        <p>{data?.name}</p>
      </div>
      <img src={data?.icon} alt="icon" className="icon" />
    </SingleInfoStyle>
  );
};
