import styles from "./MotelDetailsPage.module.scss";
import classNames from "classNames/bind";
import { Image } from "react-bootstrap";
import { HiAtSymbol } from "react-icons/hi";
import { CiLineHeight } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";

import { useEffect, useState } from "react";
import { boardHouseServices } from "../../services";
const cx = classNames.bind(styles);

function MotelDetailsPage() {
  return (
    <div className={cx("wrapper")}>
      <div className="container">
        <div className={cx("boardhouse_name")}>
          <span className="pe-2">
            <HiAtSymbol size={26} />
          </span>
          <span>Căn hộ đẹp với bãi đỗ xe an toàn - Cas713</span>
        </div>

        <div className={cx("feedback")}>
          <span className="pe-1">
            <AiFillStar />
          </span>
          <b>4,84</b>
          <span className="px-2">|</span>
          <span>140 Evaluate</span>
        </div>

        <div className={cx("images")}>
          <div className={cx("image_wrapper")}>
            <div className="row g-2">
              <div className="col-6">
                <Image
                  className={cx("onepic")}
                  src="https://res.cloudinary.com/djvlxywoe/image/upload/v1683341438/nienluan_image-post/butlifkoztvuczdkharz.jpg"
                />
              </div>
              <div className="col-6">
                <div className="row g-2">
                  <div className="col-6">
                    <Image
                      height={200}
                      src="https://res.cloudinary.com/djvlxywoe/image/upload/v1683341438/nienluan_image-post/butlifkoztvuczdkharz.jpg"
                    />
                  </div>
                  <div className="col-6">
                    <Image
                      height={200}
                      src="https://res.cloudinary.com/djvlxywoe/image/upload/v1683341438/nienluan_image-post/butlifkoztvuczdkharz.jpg"
                    />
                  </div>
                  <div className="col-6">
                    <Image
                      height={200}
                      src="https://res.cloudinary.com/djvlxywoe/image/upload/v1683341438/nienluan_image-post/butlifkoztvuczdkharz.jpg"
                    />
                  </div>
                  <div className="col-6">
                    <Image
                      height={200}
                      src="https://res.cloudinary.com/djvlxywoe/image/upload/v1683341438/nienluan_image-post/butlifkoztvuczdkharz.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("btn-all-image")}>
              <CiLineHeight />

              <span>Show all image</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MotelDetailsPage;
