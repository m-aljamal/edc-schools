import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import { calculateAvrage } from "../../utils/calculateAvrage";
import { PieStyle } from "../styles/PieStyle";

const DoughnutStyle = styled.div`
  .femal {
    background-color: rgba(255, 99, 132, 0.3);
  }
  .male {
    background-color: rgba(54, 162, 235, 0.3);
  }
  .last {
    text-align: end;
  }
  .end {
    margin-right: auto;
  }
`;

const Gender = ({ data, type }) => {
  const maleTotal = data[0].total;
  const femalTotal = data[1].total;
  const gender = {
    datasets: [
      {
        data: [
          calculateAvrage(maleTotal, femalTotal + maleTotal),
          calculateAvrage(femalTotal, femalTotal + maleTotal),
        ],

        backgroundColor: ["rgba(54, 162, 235,0.6)", "rgba(255, 99, 132,0.6)"],
        borderWidth: 2,
      },
    ],
    labels: ["ذكور", "اناث"],
  };
  return (
    <PieStyle>
      <DoughnutStyle>
        <p>{type}:</p>
        <Doughnut
          data={gender}
          options={{
            legend: {
              display: false,
            },
            cutoutPercentage: 60,
          }}
        />
        <div className="text">
          <div>
            <p className="color male"></p>
            <p>{maleTotal}</p>
            <p> عدد {type} الذكور </p>
          </div>
          <p className="devider"></p>
          <div className="last">
            <p className="color end femal"></p>
            <p>{femalTotal}</p>
            <p> عدد {type} الاناث </p>
          </div>
        </div>
      </DoughnutStyle>
    </PieStyle>
  );
};

export default Gender;
