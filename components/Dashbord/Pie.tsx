import { Fragment } from "react";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import { calculateAvrage } from "../../utils/calculateAvrage";
import { colors } from "../../utils/colors";
import { PieStyle } from "../styles/PieStyle";

const Pie = ({ pieData, total, text, type }) => {
  const labels = pieData.map((l) => l._id[type]);
  const dataArray = pieData.map((e) => calculateAvrage(e.total, total));
  const data = {
    datasets: [
      {
        data: dataArray,

        backgroundColor: colors,
        borderWidth: 2,
      },
    ],
    labels: labels,
  };

  return (
    <PieStyle>
      <p>{text}</p>
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
        {pieData.map((p, i) => (
          <Fragment key={i}>
            <CustomStyle index={i}>
              <p className="color dynamicColor"></p>
              <p>{p.total}</p>
              <p> {p._id[type]} </p>
            </CustomStyle>
            {pieData.length !== i + 1 && <p className="devider"></p>}
          </Fragment>
        ))}
      </div>
    </PieStyle>
  );
};

export default Pie;

const CustomStyle = styled.div<{ index: number }>`
  .dynamicColor {
    background-color: ${(props) => colors[props.index]};
  }
`;
