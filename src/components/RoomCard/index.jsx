import styles from "./RoomCard.module.scss";
import classNames from "classNames/bind";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const cx = classNames.bind(styles);
function RoomCard() {
  return (
    <div className={cx("wrap")}>
      <div className={cx("carousel")}>
        <Carousel
          className={cx("carousel-control")}
          showArrows={true}
          showThumbs={false}
          emulateTouch={true}
          showIndicators={true}
          infiniteLoop={true}
          interval={3000}
          autoPlay={true}
        >
          <div>
            <img
              className={cx("item-img")}
              src="https://a0.muscache.com/im/pictures/0d50c161-9049-498c-8e78-78b2bd543c14.jpg?im_w=720"
            />
          </div>
          <div>
            <img
              className={cx("item-img")}
              src="https://a0.muscache.com/im/pictures/3e897683-695d-4482-aebb-018966bb5468.jpg?im_w=720"
            />
          </div>
          <div>
            <img
              className={cx("item-img")}
              src="https://a0.muscache.com/im/pictures/a6b1b0bc-51f3-4a21-86f0-8b1124276b74.jpg?im_w=720"
            />
          </div>
        </Carousel>
        <div className="">
          <div className={cx("title-room", "fs-m")}>
            <p style={{ margin: 0 }} className="fs-m fw-bold">
              Phong 1
            </p>
            <p style={{ margin: 0 }} className={cx("star-wrap", "fs-m ")}>
              5{" "}
              <svg
                style={{ fill: "#ffd148" }}
                width={"18px"}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#ffd148"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </p>
          </div>
          <p className={cx("description-room", "fs-s")}>
            <svg
              width={"20px"}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 me-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
            3.000.000 VND/ Month
          </p>

          <p className={cx("description-room", "fs-s")}>
            <svg
              width={"20px"}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 me-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
              />
            </svg>
            4 Members/ Room
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
