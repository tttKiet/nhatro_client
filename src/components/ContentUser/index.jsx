import { Link } from "react-router-dom";
import styles from "./Content.module.scss";
import classNames from "classNames/bind";
import imgBanner from "../../assets/images/banner1.jpg"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const cx = classNames.bind(styles);
function Logo() {
  return (
    <div className={cx("wrap-all")}>
        <Carousel className={cx("carousel")} 
                showThumbs = {false} autoPlay={true} 
                nterval={2000} infiniteLoop={true} transitionTime={1000}>
              <div className={cx("main-banner")}>  
                  <div className={cx("left-banner")}>
                        <h5 >Future Motel</h5>
                        <h2 >UY TÍN & CHẤT LƯỢNG</h2>
                        <button>Liên hệ ngay</button>
                  </div>
                  <div className={cx("right-banner")}>
                    <img src="https://yyusti.com/wp-content/uploads/2021/07/10-15959302107241449964770-e1626168693156.jpg" alt="" />
                  </div>
              </div>
              <div className={cx("main-banner")}>  
                  <div className={cx("left-banner")}>
                        <h5 >Future Motel</h5>
                        <h2 >UY TÍN & CHẤT LƯỢNG</h2>
                        <button>Liên hệ ngay</button>
                  </div>
                  <div className={cx("right-banner")}>
                    <img src="https://cdn.chotot.com/xysda65btefeRDh22aD1DuAOhNLsCPu34jN6bXaTk74/preset:view/plain/789bcbaff2e597a18c78ccb203362343-2825275447493714215.jpg" alt="" />
                  </div>
              </div>
              <div className={cx("main-banner")}>  
                  <div className={cx("left-banner")}>
                        <h5 >Future Motel</h5>
                        <h2 >UY TÍN & CHẤT LƯỢNG</h2>
                        <button>Liên hệ ngay</button>
                  </div>
                  <div className={cx("right-banner")}>
                    <img src="https://bandon.vn/resize/1000x700/a-c/zc-1/f/uploads/posts/thiet-ke-nha-tro-dep-2020-bandon-0.jpg" alt="" />
                  </div>
              </div>
        </Carousel>
    </div>
  );

}

export default Logo;
