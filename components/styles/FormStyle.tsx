import styled from "styled-components";

const FormStyle = styled.div`
  .ant-form-item-control-input-content {
    text-align: right;
  }

  .ant-steps-item-title::before {
    position: absolute;
    top: 16px;
    /* left: 100%; */
    right: 100%;
    display: none;
    width: 9999px;
    height: 1px;
    background: #f0f0f0;
    content: "";
  }
  .ant-steps-item-title::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 0;
    height: 0;
    background: #f0f0f0;
    content: "";
  }
  .ant-form-item-explain,
  .ant-input-group-wrapper {
    text-align: end;
  }
`;

export default FormStyle;
