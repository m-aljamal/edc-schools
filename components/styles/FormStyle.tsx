import styled from "styled-components";

const FormStyle = styled.div`
  .ant-row {
    flex-direction: row-reverse;
  }
  .ant-form-item-control-input-content {
    text-align: right;
  }
  .ant-form-item-label > label::before {
    content: ":";
    position: relative;
    top: -0.5px;
    margin: 0 2px 0 8px;
  }
  .ant-form-item-label > label::after {
    content: "";
  }
  .ant-steps {
    flex-direction: row-reverse;
  }

  .ant-steps-item {
    padding-right: 12px;
  }

  .ant-steps-small .ant-steps-item-title {
    padding-left: 12px;
  }

  .ant-steps-small .ant-steps-item-icon {
    margin: 0 0px 8px 0;
  }

  .ant-steps-item-container {
    text-align: end;
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
