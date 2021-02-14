import {
  getAllImages,
  getAboutText,
  getbanner,
  getAchievement,
  getvision,
  getNews,
  getPartners,
} from "../db/sanity-api/homePageComponents";
import { Carousel } from "antd";
import Image from "next/image";
import { santyImageLoader } from "../utils/sanityImageLoader";
import styled from "styled-components";
import AboutSection from "../components/homePage/AboutSection";
import AchievementSection from "../components/homePage/AchievementSection";
import NewsSection from "../components/homePage/NewsSection";
import Partners from "../components/homePage/Partners";
const Home = ({
  allHeroImages,
  preview,
  aboutText,
  achievement,
  banner,
  vision,
  news,
  partners,
}) => {
  const settings: {} = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 1500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    pauseOnHover: false,
  };
  return (
    <Wrapper>
      <div className="heroContainer">
        <Image
          alt="Picture of the author"
          loader={santyImageLoader}
          src={allHeroImages[0].image.split("images")[1]}
          width={1900}
          height={700}
          quality={100}
        />
        <div className="text textJustify">
          <h1> {allHeroImages[0].title} </h1>
          <p className="desc">{allHeroImages[0].body}</p>
        </div>
      </div>

      {/* <Carousel {...settings}>
        {allHeroImages.map((img) => (
          <div key={img.slug} className="heroContainer">
            <Image
              alt="Picture of the author"
              loader={santyImageLoader}
              src={img.image.split("images")[1]}
              priority
              layout="fill"
              quality={100}
              objectFit="cover"
            />
            <div className="text textJustify">
              <h1> {img.title} </h1>
              <p className="desc">{img.body}</p>
            </div>
          </div>
        ))}
      </Carousel> */}
      <AboutSection aboutText={aboutText} vision={vision} />
      <AchievementSection achievement={achievement} banner={banner} />
      <NewsSection news={news} />
      <Partners partners={partners} banner={banner} />
    </Wrapper>
  );
};
export default Home;

export async function getStaticProps({ preview = false }) {
  const allHeroImages = await getAllImages(preview);
  const aboutText = await getAboutText(preview);
  const achievement = await getAchievement(preview);
  const banner = await getbanner(preview);
  const vision = await getvision(preview);
  const news = await getNews(preview);
  const partners = await getPartners(preview);
  return {
    props: {
      allHeroImages,
      preview,
      aboutText,
      achievement,
      banner,
      vision,
      news,
      partners,
    },
    revalidate: 5,
  };
}
const Wrapper = styled.div`
  .heroContainer {
    height: calc(100vh - 260px);
  }
  .text {
    z-index: 10;
    background: rgb(255 255 255 / 0.7);
    padding: 20px 50px 20px 10px;
    position: absolute;
    top: 50%;
    right: 0;
    width: 20rem;
    h1 {
      margin-bottom: 10px;
      color: var(--blue);
      font-size: 1.5rem;
    }
    .desc {
      font-size: 1.2rem;
    }
  }
  @media (max-width: 400px) {
    .text {
      padding: 5px 10px;
      top: 55%;
      width: 15rem;
      h1 {
        font-size: 1.2rem;
      }
      .desc {
        font-size: 1rem;
      }
    }
  }
`;
