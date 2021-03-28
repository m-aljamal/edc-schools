import styled from "styled-components";

export const PieStyle = styled.div`
  width: 400px;
  box-shadow: var(--bs);
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  margin-bottom: 30px;
  .text {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .color {
    width: 50px;
    height: 5px;
    border-radius: 50px;
    margin-bottom: 10px;
  }

  .devider {
    background-color: var(--lightGrey);
    width: 1px;
    height: 60px;
  }
`;
