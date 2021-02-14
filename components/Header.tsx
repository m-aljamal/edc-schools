import styled from "styled-components";
import MainLinks from "./navBar/MainLinks";
import SocialLinks from "./navBar/SocialLinks";
import { useState } from "react";
const Header = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Wraper>
      <SocialLinks />
      <MainLinks visible={visible} setVisible={setVisible} />
      <img
        src="https://res.cloudinary.com/dqoung1wz/image/upload/v1613318362/websiteImage/mobileButton_nvpfmi.svg"
        onClick={() => setVisible(!visible)}
        className="mobileButton"
      />
      <img
        src="https://res.cloudinary.com/dqoung1wz/image/upload/v1613318354/websiteImage/edcLogo_vupus2.png"
        alt="edc logo"
        className="logoimg"
      />
    </Wraper>
  );
};

export default Header;

const Wraper = styled.nav`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  align-items: center;
  .logoimg {
    width: 165px;
    margin-top: 10px;
    @media (max-width: 400px) {
      width: 125px;
    }
  }
  .mobileButton {
    display: none;
  }
  @media (max-width: 750px) {
    .mobileButton {
      display: block;
      width: 35px;
      cursor: pointer;
      margin-left: 20px;
      transform: translateY(-25px);
    }
  }
`;
