import styled from "styled-components";
import Link from "next/link";
const SocialLinks = ({ socialLinks }) => {
  return (
    <LinksStyle>
      {socialLinks.map((link, index) => (
        <li key={index}>
          <Link href={link.url}>
            <img
              src={`/icons/socialIcons/${link.icon}-icon.svg`}
              alt="social link"
              className="socialimg"
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
      icon: "facebook",
    },
    {
      url: "/",
      icon: "youtube",
    },
    {
      url: "/",
      icon: "instagram",
    },
    {
      url: "/",
      icon: "twitter",
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
    width: 30px;
    cursor: pointer;
  }

  @media (max-width: 815px) {
    .socialimg {
      width: 25px;
      transform: translateY(-15px);
    }
  }

  @media (max-width: 750px) {
    display: none;
  }
`;
