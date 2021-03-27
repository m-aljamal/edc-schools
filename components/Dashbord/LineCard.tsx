import styled from "styled-components";

const LinkCardStyle = styled.div`
  background-color: white;
  padding: 10px 30px;
  .bar {
    display: flex;
  }

  .b1 {
    flex: 0 0 50%;
    max-width: 50%;
    height: 10px;
    background-color: #304ffe;
  }
  .b2 {
    flex: 0 0 50%;
    max-width: 50%;
    height: 10px;
    background-color: #1de9b6;
  }
  .table {
    width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
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
`;
const LineCard = ({ data, total }) => {
  console.log(data);

  return (
    <LinkCardStyle>
      <p>اعداد الموظفين:</p>
      <p>{total}</p>
      <div>
        <div className="bar">
          <div className="b1"></div>
          <div className="b2"></div>
        </div>
        <div>
          <table className="table">
            <tbody>
              {data.map((d) => (
                <tr>
                  <td className="title">
                    <p className="dot"></p>
                    <p>{d._id.jobTitle}</p>
                  </td>
                  <td>{d.total}</td>
                  <td>1%</td>
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
