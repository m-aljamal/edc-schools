import styled from "styled-components";

export const UploadImageStyle = styled.div`
  text-align: center;
  .imageHoler {
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .removeImage {
      background-color: red;
      color: white;
      position: absolute;
      top: -15px;
      z-index: 50;
      right: 0;
      border-radius: 50%;
      width: 20px;
      height: 23px;
      cursor: pointer;
    }
  }
  .imageContainer {
    height: 100px;
    max-width: 150px;
    background-color: var(--offWhite);
    margin-left: auto;
    border: 1px dashed var(--darkGray);
  }
`;
