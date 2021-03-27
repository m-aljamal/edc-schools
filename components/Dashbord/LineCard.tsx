import styled from "styled-components";

const LinkCardStyle = styled.div`
  background-color: white;
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
    height: 15px;
    width: 15px;
    background-color: #f30707;
    border-radius: 50%;
  }
`;
const LineCard = () => {
  return (
    <LinkCardStyle>
      <p>اعداد الموظفين:</p>
      <p>15</p>
      <div>
        <div className="bar">
          <div className="b1"></div>
          <div className="b2"></div>
        </div>
        <div>
          <table className="table">
            <tbody>
              <tr>
                {/* <td className="dot"></td> */}
                <td className="title">
                  <p className="dot"></p>
                  <p>مدير</p>
                </td>
                <td>2</td>
                <td>1%</td>
              </tr>
              <tr>
                {/* <td className="dot"></td> */}
                <td>مدرس</td>
                <td>10</td>
                <td>3%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </LinkCardStyle>
  );
};

export default LineCard;
