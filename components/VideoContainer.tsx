import styled from "styled-components";
const VideoContainer = ({ src, width }) => {
  return (
    <Wraper width={width}>
      <video
        controls
        poster="https://res.cloudinary.com/dqoung1wz/image/upload/v1613322317/websiteImage/resized-image-Promo_2_sacdrt.jpg"
        className="video"
      >
        <source src={src} type="video/mp4" />
      </video>
    </Wraper>
  );
};
export default VideoContainer;
const Wraper = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  position: relative;
  .video {
    width: 100%;
    object-fit: cover;
    outline: none;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;
