import Carousel from "react-responsive-carousel/lib/js/components/Carousel";
import styles from "./MotelItem.module.scss";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdAttachMoney, MdMap, MdOutlineLocationOn } from "react-icons/md";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import classNames from "classNames/bind";
import { Image } from "react-bootstrap";
import { Tooltip } from "react-tooltip";

const cx = classNames.bind(styles);

function MotelItem({
  images = [],
  name: boadrHouseName,
  phone,
  address,
  userId: owner,
  maxPrice,
  minPrice,
  star,
  addressFilter,
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
              <AiFillStar className="fs-m" color="#ffbe2ae3" />
              {star ? star : "5"}
            </span>
          </div>
          <div className={cx("owner", "mb-2")}>
            <h4 className={cx("author")}>Owner: {owner?.fullName}</h4>
          </div>
          <div className={cx("location", "mb-2")}>
            <MdOutlineLocationOn /> {address}
          </div>
          <div className={cx("location-filter", "mb-2")}>
            <Tooltip id="my-tooltip" className={cx("tooltip-style")} />
            <span
              data-tooltip-id="my-tooltip"
              data-tooltip-content={
                addressFilter?.ward?.label +
                " - " +
                addressFilter?.district?.label +
                " - " +
                addressFilter?.province?.label
              }
            >
              <div className={cx("text-description")}>
                {" "}
                <MdMap />{" "}
                {addressFilter?.ward?.label +
                  " - " +
                  addressFilter?.district?.label +
                  " - " +
                  addressFilter?.province?.label}
              </div>
            </span>
          </div>
          <div className={cx("price", "mb-2", "pt-1")}>
            <h4 className={cx("alone_price")}>
              <i>
                <MdAttachMoney className="fs-l me-1 mb-1" color="#db5353" />
                Price:
              </i>
              {minPrice == maxPrice && minPrice !== null ? (
                <span className={cx("price_hl")}>
                  {Number(minPrice).toLocaleString() + " VND"}
                </span>
              ) : minPrice !== null ? (
                <span className={cx("price_hl")}>
                  {Number(minPrice).toLocaleString() + " VND"} -{" "}
                  {Number(maxPrice).toLocaleString() + " VND"}
                </span>
              ) : (
                <span className={cx("price_hl")}>Updating...</span>
              )}
              {/* {!minPrice && <span className={cx("price_hl")}>Updating...</span>} */}
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MotelItem;
