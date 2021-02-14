import styled from "styled-components";
import { Carousel } from "antd";
import React from "react";
import Image from "next/image";
import { santyImageLoader } from "../../utils/sanityImageLoader";
const PartnersSection = ({ partners, banner }) => {
  const backgroundImage = banner.find((b) => b.title === "partners");

  return (
    <Wraper backgroundImage={backgroundImage.image}>
      <PartnersLogo partners={partners} />
    </Wraper>
  );
};

export default PartnersSection;

const Wraper = styled.section<{ backgroundImage: string }>`
  height: 100px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 50px;
`;

const PartnersLogo = ({ partners }) => {
  const settings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    dots: false,

    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <PartnersLogoStyle>
      <Carousel {...settings}>
        {partners.map((icon, i) => (
          <div className="imgContainer" key={i}>
            <Image
              alt="Picture of the author"
              loader={santyImageLoader}
              src={icon.image.split("images")[1]}
              width={150}
              height={100}
            />
          </div>
        ))}
      </Carousel>
    </PartnersLogoStyle>
  );
};

const PartnersLogoStyle = styled.div`
  text-align: center;
`;
