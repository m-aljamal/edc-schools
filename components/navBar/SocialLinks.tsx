import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
const SocialLinks = ({ socialLinks }) => {
  return (
    <LinksStyle>
      {socialLinks.map((link, index) => (
        <Link href={link.url} key={index}>
          <a>
            <Image
              priority
              alt="facebook"
              src={link.icon}
              width={35}
              height={65}
            />
          </a>
        </Link>
      ))}
    </LinksStyle>
  );
};

export default SocialLinks;
SocialLinks.defaultProps = {
  socialLinks: [
    {
      url: "/",
      icon: "websiteImage/twitter-icon_wnl2x6.png",
    },
    {
      url: "/",
      icon: "websiteImage/facebook-icon_t17ui1_nbqwze.png",
    },
    {
      url: "/",
      icon: "websiteImage/youtube-icon_puqnkt_rsanj2.png",
    },
    {
      url: "/",
      icon: "websiteImage/instagram-icon_hesjcj_xz1c86.svg",
    },
  ],
};

const LinksStyle = styled.div`
  display: flex;
  transform: translateY(-20px);
  a {
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
