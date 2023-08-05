import Carousel from "react-responsive-carousel/lib/js/components/Carousel";
import styles from "./MotelItem.module.scss";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";
import { GiMoneyStack } from "react-icons/gi";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import classNames from "classNames/bind";
import { Image } from "react-bootstrap";

const cx = classNames.bind(styles);

function MotelItem({
  images = [],
  name: boadrHouseName,
  phone,
  address,
  userId: owner,
  _id,
}) {
  return (
    <div className={cx("wrap", "col-xxl-3 col-lg-4 col-sm-6 col-12")}>
      <div className={cx("contair", "shadow-sm")}>
        <div className={cx("slides")}>
          <div className={cx("sildes_img")}>
            <Carousel
              className={cx("custom-carousel")}
              infiniteLoop={true}
              swipeable={false}
              autoPlay={false}
              showIndicators={true}
              showThumbs={false}
              animationHandler="fade"
            >
              {images.map((image, index) => (
                <Link
                  to={`/motel/${_id}`}
                  key={index}
                  className={cx("sildes_item")}
                >
                  <Image src={image} />
                </Link>
              ))}
            </Carousel>
          </div>
        </div>
        <Link
          to={`/motel/${_id}`}
          className={cx("info", " bg-white p-2 shadow-sm")}
        >
          <div className={cx("name_star", "mb-2")}>
            <h4 className={cx("name")}>{boadrHouseName}</h4>
            <span className={cx("star")}>
              <AiFillStar />
              4.8
            </span>
          </div>
          <div className={cx("owner", "mb-2")}>
            <h4 className={cx("author")}>Owner: {owner?.fullName}</h4>
          </div>
          <div className={cx("location", "mb-2")}>
            <CiLocationArrow1 /> {address}
          </div>
          <div className={cx("price", "mb-2", "pt-1")}>
            <h4 className={cx("alone_price")}>
              <i>
                <GiMoneyStack color="blue" />
                VND/month:
              </i>
              <span className={cx("price_hl")}>1.8M</span>
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MotelItem;
