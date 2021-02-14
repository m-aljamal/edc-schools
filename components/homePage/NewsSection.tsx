import styled from "styled-components";
import Title_no_background from "../Title_no_background";
import Image from "next/image";
import { santyImageLoader } from "../../utils/sanityImageLoader";
const NewsSection = ({ news }) => {
  return (
    <section>
      <Title_no_background title="أخر الأخبار" width="125px" />
      <Wraper>
        <News news={news[0]} />
        <News news={news[1]} />
      </Wraper>
    </section>
  );
};

export default NewsSection;
const Wraper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  margin-top: 50px;
`;
const News = ({ news }) => {
  return (
    <NewsStyle>
      <div className="newsText ">
        <p className="title">:{news.title}</p>
        <p className="descriotion textJustify">{news.description}</p>
        <p className="date">{news.date}</p>
      </div>
      <Image
        alt={news.title}
        loader={santyImageLoader}
        src={news.image.split("images")[1]}
        width={300}
        height={250}
        quality={100}
      />
    </NewsStyle>
  );
};

const NewsStyle = styled.div`
  display: flex;
  margin: 0 20px;
  justify-content: center;
  .newsText {
    max-width: 40%;
    text-align: end;
    margin: 0 20px;
  }
  .title {
    font-size: 1.3rem;
    color: var(--blue);
  }
  .descriotion {
    color: var(--darkGray);
    font-size: 1.1rem;
  }
  .date {
    color: var(--blue);
    text-align: start;
  }
  @media (max-width: 550px) {
    flex-direction: column-reverse;
    .newsText {
      max-width: 100%;
      margin-top: 10px;
    }
  }
`;
