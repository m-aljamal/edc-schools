import { getAllImages } from "../db/sanity-api/heroImages";
import { Carousel } from "antd";
import Image from "next/image";
import { santyImageLoader } from "../utils/sanityImageLoader";
const Home = ({ allHeroImages, preview }) => {
  console.log({ allHeroImages, preview });

  const settings: {} = {
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 3000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    pauseOnHover: false,
  };
  return (
    <div>
      <Carousel {...settings}>
        {allHeroImages.map((img) => (
          <div key={img.slug}>
            <Image
              alt="Picture of the author"
              loader={santyImageLoader}
              src={img.image.split("images")[1]}
              priority
              layout="fill"
              quality={100}
              objectFit="cover"
            />
            <div style={{ position: "absolute", backgroundColor: "red" }}>
              <h1> {img.title} </h1>
              <p className="desc">{img.body}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default Home;

export async function getStaticProps({ preview = false }) {
  const allHeroImages = await getAllImages(preview);
  return {
    props: { allHeroImages, preview },
  };
}

// body: "تاسست المدرسة عام 2015 في قرية الاتارب في ريف حلب الغربي "
// image: "https://cdn.sanity.io/images/3n3a6tz7/production/8dc0ca0409aa327737e50c0fd2bed6fbf9810a5f-1000x372.png"
// name: "مدرسة ايتام الاتارب"
// slug: "y1"
// title: "y1"
