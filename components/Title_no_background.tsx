import React from "react";
import styled from "styled-components";
const Title_no_background = ({ title, width }) => {
  return (
    <Wraper width={width}>
      <h3>{title}</h3>
    </Wraper>
  );
};

export default Title_no_background;
const Wraper = styled.div<{ width: string }>`
  text-align: center;
  h3 {
    color: var(--blue);
    position: relative;
    font-size: 2rem;
    font-weight: bold;
    &::before {
      content: "";
      width: ${(props) => (props.width ? props.width : "28%")};
      height: 1px;
      background: var(--blue);
      position: absolute;
      bottom: -10px;
      box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.75);
    }
  }
`;
