import styled from "styled-components";
import VideoContainer from "../VideoContainer";
const AboutSection = ({ aboutText, vision }) => {
  return (
    <Wraper>
      <div className="aboutUs">
        <p className="aboutText textJustify">{aboutText.text}</p>
        <h2 className="about">من نحن</h2>
      </div>
      <div className="ourVision">
        <div className="visionText">
          <h2>:رؤيتنا</h2>
          <p>{vision && vision.text}</p>
        </div>

        <VideoContainer
          src={
            "https://res.cloudinary.com/dqoung1wz/video/upload/v1598956018/Video/EDC_no_sub_lmwsvk.mp4"
          }
          width="50%"
        />
      </div>
    </Wraper>
  );
};

export default AboutSection;

const Wraper = styled.section`
  .aboutUs {
    margin-top: 25px;
    background-color: var(--blue);
    display: flex;
    justify-content: flex-end;
    background: var(--lightGray);
  }

  .aboutText {
    margin-left: auto;
    width: 85%;
    padding: 20px 10px;
    margin-left: 20px;
    font-size: 1.2rem;
    color: var(--darkGray);
    margin-bottom: 0;
  }

  .about {
    width: 20%;
    text-align: center;
    background-color: var(--blue);
    color: white;
    display: grid;
    place-items: center;
    font-weight: bold;
    font-size: 1.6rem;
    margin-bottom: 0;
  }

  @media (max-width: 400px) {
    .aboutUs {
      flex-direction: column-reverse;
    }
    .aboutText {
      width: 100%;
      margin-left: 0;
      font-size: 1rem;
    }
    .about {
      width: 100%;
      font-size: 1.3rem;
    }
  }
  .ourVision {
    display: flex;
    justify-content: space-between;
    margin: 30px 20px;
  }
  .visionText {
    text-align: end;
    margin-right: 10px;
    width: 50%;
    h2 {
      color: var(--blue);
      font-size: 2rem;
    }
    p {
      color: var(--darkGray);
      font-size: 1.2rem;
      word-spacing: 5px;
    }
  }
  @media (max-width: 900px) {
    .visionText {
      p {
        font-size: 1rem;
      }
    }
  }
  @media (max-width: 700px) {
    .ourVision {
      flex-direction: column-reverse;
      align-items: center;
    }
    .visionText {
      width: 100%;
    }
  }
`;
