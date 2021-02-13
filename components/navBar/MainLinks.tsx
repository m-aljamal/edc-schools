import { Drawer } from "antd";
import styled from "styled-components";
import Link from "next/link";

const MainLinks = ({ links, visible, setVisible }) => {
  return (
    <LinksStyle>
      {visible ? (
        <Drawer
          title="EDC"
          placement="right"
          closable={true}
          onClose={() => setVisible(false)}
          visible={visible}
        >
          {links.map((link, i) => (
            <div key={i} className="hoverEffect">
              <li>
                <Link href={link.url}>
                  <a>{link.arabicText}</a>
                </Link>
              </li>
            </div>
          ))}
        </Drawer>
      ) : (
        links.map((link, i) => (
          <div key={i} className=" navLink">
            <Link href={link.url}>
              <a>{link.arabicText}</a>
            </Link>
          </div>
        ))
      )}
    </LinksStyle>
  );
};

export default MainLinks;

MainLinks.defaultProps = {
  links: [
    {
      arabicText: "الرئيسية",
      englishText: "Home",
      turkText: "tukish",
      url: "/",
    },

    {
      arabicText: "المشاريع",
      englishText: "Projects",
      turkText: "tukish",
      url: "/projects",
    },
    {
      arabicText: "تواصل معنا",
      englishText: "Contact us",
      turkText: "tukish",
      url: "/contact",
    },
    {
      arabicText: "تبرع",
      englishText: "Donate",
      turkText: "tukish",
      url: "/donate",
    },
  ],
};

const LinksStyle = styled.div`
  display: flex;
  flex-direction: row-reverse;
  .navLink {
    margin: 0 35px;
  }
  a {
    color: var(--blue);
    font-size: 1.2rem;
  }

  .active {
    background: var(--blue);
    color: white;
    padding-top: 48px;
  }

  @media (max-width: 950px) {
    .navLink {
      margin: 0 20px;
    }
  }
  @media (max-width: 750px) {
    display: none;
  }
`;
