import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";

const DoughnutStyle = styled.div`
  width: 300px;
  .text {
    display: flex;
    justify-content: space-between;
  }
`;

const Gender = ({ data, maleTotal, femalTotal }) => {
  return (
    <DoughnutStyle>
      <Doughnut
        data={data}
        options={{
          legend: {
            display: false,
          },
          cutoutPercentage: 60,
        }}
      />
      <div className="text">
        <p>ذكور {maleTotal}</p>
        <p>اناث {femalTotal}</p>
      </div>
    </DoughnutStyle>
  );
};

export default Gender;
