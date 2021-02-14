import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
const SocialLinks = ({ socialLinks }) => {
  return (
    <LinksStyle>
      {socialLinks.map((link, index) => (
        <li key={index}>
          <Link href={link.url}>
            <Image
              alt="facebook"
              src="websiteImage/resized-image-Promo_1_xjhkzb.jpg"
              width={35}
              height={65}
            />
          </Link>
        </li>
      ))}
    </LinksStyle>
  );
};

export default SocialLinks;
SocialLinks.defaultProps = {
  socialLinks: [
    {
      url: "/",
      icon: "/websiteImage/resized-image-Promo_1_xjhkzb.jpg",
    },
    {
      url: "/",
      icon: "/websiteImage/resized-image-Promo_1_xjhkzb.jpg",
    },
    {
      url: "/",
      icon: "websiteImage/resized-image-Promo_1_xjhkzb.jpg",
    },
    {
      url: "/",
      icon: "websiteImage/resized-image-Promo_1_xjhkzb.jpg",
    },
  ],
};

const LinksStyle = styled.ul`
  display: flex;
  transform: translateY(-20px);
  li:not(:first-of-type) {
    margin-left: 10px;
  }

  .socialimg {
    cursor: pointer;
  }

  @media (max-width: 815px) {
    .socialimg {
      transform: translateY(-15px);
    }
  }

  @media (max-width: 750px) {
    display: none;
  }
`;
