import styled from "styled-components";
import { calculateAvrage } from "../../utils/calculateAvrage";
import { Tooltip } from "antd";

const LinkCardStyle = styled.div`
  margin-top: 30px;
  border-radius: 12px;
  background-color: white;
  padding: 10px 30px;
  .bar {
    display: flex;
  }

  .table {
    width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
  }
  tr {
    border-bottom: 1px dashed #e1e1e1;
  }
  .title {
    display: flex;
    align-items: center;
  }
  .dot {
    margin-left: 10px;
    height: 10px;
    width: 10px;
    background-color: #f30707;
    border-radius: 50%;
  }
  .center {
    text-align: center;
  }
`;
const LineCard = ({ data, total, type, text }) => {
  const colors = [
    "rgba(54, 162, 235,0.3)",
    "rgba(255, 99, 132,0.3)",
    "rgba(239, 121, 0,0.3)",
    "rgba(61, 92, 5,0.3)",
    "rgba(0, 44, 240,0.3)",
    "rgba(216, 99, 251,0.3)",
    "rgba(248, 60, 60,0.3)",
    "rgba(250, 227, 16,0.3)",
    "rgba(159, 243, 156,0.3)",
    "rgba(75, 130, 167,0.3)",
    "rgba(174, 150, 230,0.3)",
  ];
  return (
    <LinkCardStyle>
      <p>{text}</p>
      <p> العدد الاجمالي: {total}</p>
      <div>
        <div className="bar">
          {data.map((d, i) => (
            <Tooltip placement="topLeft" title={d._id[type]} key={i}>
              <Bar
                color={colors[i]}
                avg={calculateAvrage(d.total, total)}
              ></Bar>
            </Tooltip>
          ))}
        </div>
        <div>
          <table className="table">
            <tbody>
              {data.map((d, i) => (
                <tr key={i}>
                  <td className="title">
                    <Dot color={colors[i]}></Dot>
                    <p>{d._id[type]}</p>
                  </td>
                  <td className="center">{d.total}</td>
                  <td className="center">{calculateAvrage(d.total, total)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LinkCardStyle>
  );
};

export default LineCard;

const Bar = styled.div<{ avg: number; color: string }>`
  flex: ${(props) => `0 0 ${props.avg}%`};
  max-width: 50%;
  height: 10px;
  background-color: ${(props) => props.color};
`;

const Dot = styled.p<{ color: string }>`
  margin-left: 10px;
  height: 10px;
  width: 10px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;
