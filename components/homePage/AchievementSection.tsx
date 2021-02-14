import styled from "styled-components";
import Image from "next/image";
import { santyImageLoader } from "../../utils/sanityImageLoader";
import CountUp from "react-countup";

const AchievementSection = ({ achievement, banner }) => {
   const backgroundImage = banner.find(
    (b) => b.title === "home page achevments"
  );

  return (
    <Wraper backgroundImageurl={backgroundImage.image}>
      <div className="container">
        {achievement &&
          achievement.map((ac) => (
            <div>
              <Image
                alt="Picture of the author"
                loader={santyImageLoader}
                src={ac.image.split("images")[1]}
                width={50}
                height={50}
                quality={100}
              />
              <p className="number">
                <CountUp
                  separator=" "
                  delay={2}
                  duration={20}
                  end={ac.number}
                />
              </p>
              <p className="name">{ac.name}</p>
            </div>
          ))}
      </div>
    </Wraper>
  );
};

export default AchievementSection;

const Wraper = styled.section<{ backgroundImageurl: string }>`
  background-image: url(${(props) => props.backgroundImageurl});
  background-size: cover;
  background-repeat: no-repeat;
  margin: 40px 0;
  color: white;
  text-align: center;
  padding: 30px 0;
  .container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .number {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 0;
  }
  .name {
    font-size: 1.2rem;
    margin-bottom: 0;
  }
  @media (max-width: 530px) {
    .container {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }
  }
  @media (max-width: 250px) {
    .container {
      grid-template-columns: repeat(1, 1fr);
      gap: 30px;
    }
  }
`;
