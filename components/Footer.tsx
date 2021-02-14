import styled from "styled-components";
import SocialLinks from "./navBar/SocialLinks";
import Image from "next/image";
const Footer = () => {
  return (
    <Wraper>
      <div className="container">
        <div className="imageContiner">
          <Image
            alt="Picture of the author"
            src="/websiteImage/footer-logo_ku2xch.png"
            width={175}
            height={132}
          />
        </div>
        <div className="contacts ">
          {/* start location */}
          <div className="location ">
            <div className=" withLine">
              <div className="line"> </div>
              <h4 className="footerTitle">تفضل بزيارتنا</h4>
            </div>
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.761680764482!2d37.17757552470896!3d36.70426434511298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152fd17d4cd6f7b9%3A0x122a856f51adc165!2s79000%20Be%C5%9Fikkaya%2FKilis%20Merkez%2FKilis!5e0!3m2!1sen!2str!4v1598435154903!5m2!1sen!2str"
                width="200"
                height="100"
                frameBorder="0"
                aria-hidden="false"
              ></iframe>
            </div>
          </div>
          {/* start address */}
          <div className="address ">
            <div className=" withLine">
              <div className="line"> </div>
              <h4 className="footerTitle">اتصل بنا</h4>
            </div>
            <p className="text">
              Oylum Mah. Gaziantep yolu <span>:العنوان</span> <br />
              Kümeevleri Hayat Vilları NO: 5AE
            </p>
            <p className="text">
              +905527222275<span>:الهاتف</span>
            </p>
            <p className="text">
              info@edcommission.com <span>:الإيميل</span>
            </p>
          </div>
          {/* start social */}
          <div className="social  ">
            <div className=" withLine">
              <div className="line"> </div>
              <h4 className="footerTitle">للتواصل</h4>
            </div>
            <p className="text">
              يسرنا تواصلكم والإجابة على استفساراتكم <br /> عبر صفحاتنا على
              مواقع التواصل الإجتماعي
            </p>
            <div className="socialLinks">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
      <AllRights />
    </Wraper>
  );
};

export default Footer;
const Wraper = styled.section`
  background-image: url("https://res.cloudinary.com/dqoung1wz/image/upload/v1613317577/websiteImage/footer_29_kvrzdo.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  padding-top: 10px;
  .container {
    padding: 0 10px;
  }
  h4 {
    font-size: 1.2rem;
  }

  .imageContiner {
    display: flex;
    justify-content: center;
  }
  .contacts {
    display: flex;
    justify-content: space-around;
    text-align: end;
    margin-top: 20px;
  }
  .footerTitle {
    color: white;
  }
  .footerText {
    color: rgb(255, 255, 255, 0.5);
  }
  .withLine {
    display: flex;
    justify-content: flex-end;
    .line {
      color: white;
      margin-right: 10px;
      background-color: white;
      width: 50px;
      height: 2px;
      margin-top: auto;
    }
  }
  .socialLinks {
    display: flex;
    justify-content: flex-end;
  }
  .text {
    color: rgb(255, 255, 255, 0.5);
    font-size: 1.1rem;
    padding: 2px 0;
    span {
      margin-left: 15px;
    }
  }
  .map {
    margin-top: 15px;
  }
  @media (max-width: 700px) {
    .contacts {
      flex-direction: column-reverse;
      align-items: center;
    }
    .address {
      margin: 25px 0;
    }
  }
`;

const AllRights = () => {
  const word = {
    ar: {
      text: " ﺟﻤﻴﻊ اﻟﺤﻘﻮق ﻣﺤﻔﻮﻇﺔ",
      name: " هيئة تطوير التعليم ",
    },
  };
  return (
    <AllRightsStyle>
      <h4 className="rights">
        {word.ar.text}
        {` ${new Date().getFullYear()}`} &copy;
        {word.ar.name}
      </h4>
    </AllRightsStyle>
  );
};

const AllRightsStyle = styled.section`
  padding: 10px 0;
  text-align: center;
  background: var(--blue);
  word-spacing: 3px;
  h4 {
    color: white;
    font-size: 1.2rem;
  }
  @media (max-width: 450px) {
    h4 {
      font-size: 0.9rem;
    }
  }
`;
