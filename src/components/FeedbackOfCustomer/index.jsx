/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import styles from "./FeedbackOfCustomer.module.scss";
import classNames from "classNames/bind";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Image } from "react-bootstrap";

const cx = classNames.bind(styles);
function FeedbackOfCustomer() {
  const data = [
    {
      content:
        "Amazing guest house experience! The website made booking a breeze,and the accommodation exceeded our expectations. Highlyrecommended",
      user: "Karim Chskinned",
      avatar:
        "https://i.pinimg.com/564x/fd/6b/5f/fd6b5ff025acd4440ec057249daaace7.jpg",
    },
    {
      content:
        "User-friendly website with detailed information about guest houses. Found the perfect place and had a comfortable stay. Thank you",
      user: "Neksoan Houere",
      avatar:
        "https://i.pinimg.com/564x/e8/9d/29/e89d292e76d2ffee19e7f17f7f9c6734.jpg",
    },
    {
      content:
        "Efficient and reliable service. The website helped me quickly find a guest house that suited my needs. Will definitely use again in the future.Efficient and reliable service.",
      user: "Jouha Hois",
      avatar:
        "https://i.pinimg.com/564x/ee/c1/85/eec185b08aa46d195d136f177cc3ac6b.jpg",
    },
    {
      content:
        "Impressed with the website's simplicity and ease of navigation. Found the ideal guest house and had a fantastic stay. Great job",
      user: "Elirng Hak",
      avatar:
        "https://i.pinimg.com/736x/4b/78/11/4b78111fc060494a13dc4dc5fc21fef4.jpg",
    },
    {
      content:
        "Excellent website for guest house bookings. The photos and descriptions provided an accurate representation, and the whole process was seamless",
      user: "Lissance Okaque",
      avatar:
        "https://i.pinimg.com/564x/f9/bf/be/f9bfbe7e3280a97ddfa2523c6386b2da.jpg",
    },
  ];

  function Feedback({ fb }) {
    return (
      <div className={cx("wrap-feedback")}>
        <div className={cx("feedback", "shadow rounded-4 ")}>
          <div className="">
            <Image
              className={cx("avatar", "shadow-sm")}
              src={fb.avatar}
            ></Image>
          </div>
          <div className={cx("wrap-text", "flex-grow-1 p-2")}>
            <p className="fs-m fw-normal fst-italic">"{fb.content}"</p>
            <p
              className="fs-s fw-bold fst-italic mb-0"
              style={{ color: "#F3AA60" }}
            >
              - {fb.user}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cx("wrap-all")}>
      {/* title */}
      <p
        className={cx("title", "fs-xxl fst-italic text-center")}
        style={{ color: "#FFC26F", fontWeight: "500" }}
      >
        Here&apos;s what our customers are saying about us:{" "}
      </p>

      <Carousel
        className={cx("carousel", "shadow-sm")}
        showThumbs={false}
        autoPlay={true}
        interval={8000}
        infiniteLoop={true}
        transitionTime={1000}
        showStatus={false}
        emulateTouch={true}
        showArrows={true}
        showIndicators={true}
        swipeable={false}
      >
        {data.map((fb, index) => (
          <Feedback fb={fb} key={index}></Feedback>
        ))}
      </Carousel>
    </div>
  );
}

export default FeedbackOfCustomer;
