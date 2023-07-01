import styles from "./Banner.module.scss";
import classNames from "classNames/bind";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import BannerSlide from "../BannerSlide";
const cx = classNames.bind(styles);
function Banner() {
  return (
    <div className={cx("wrap-all", "mt-4")}>
      <Carousel
        className={cx("carousel")}
        showThumbs={false}
        autoPlay={true}
        interval={2000}
        infiniteLoop={true}
        transitionTime={1000}
        showStatus={false}
        emulateTouch={true}
        showArrows={false}
        showIndicators={false}
      >
        <BannerSlide
          title={"quick room search"}
          contentButton={"Search here"}
          imgLink={
            "https://img.freepik.com/premium-photo/modern-house-exterior-sale-rent_293060-7831.jpg?size=626&ext=jpg&ga=GA1.1.994684043.1684584897&semt=sph"
          }
        />
        <BannerSlide
          title={"Posting is easy"}
          contentButton={"Post here"}
          imgLink={
            "https://yyusti.com/wp-content/uploads/2021/07/10-15959302107241449964770-e1626168693156.jpg"
          }
        />
        <BannerSlide
          title={"cheap accommodation"}
          contentButton={"rent here"}
          imgLink={
            "https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg?size=626&ext=jpg&ga=GA1.1.994684043.1684584897&semt=sph"
          }
        />
      </Carousel>
    </div>
  );
}

export default Banner;
