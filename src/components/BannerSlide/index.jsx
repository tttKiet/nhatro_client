import { useEffect, useRef, useState } from "react";
import styles from "./BannerSlide.module.scss";
import classNames from "classNames/bind";
const cx = classNames.bind(styles);
function BannerSlide({ title, contentButton, imgLink, alt = "Image" }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(elementRef.current);
      }
    };
  }, []);
  return (
    <div
      ref={elementRef}
      className={cx(
        "main-banner",
        {
          isVisible,
        },
        "row"
      )}
    >
      <div className={cx("left-banner", "col-md-5 col-12 my-5")}>
        <h5>Future Motel</h5>
        <h2>{title}</h2>
        <button>{contentButton}</button>
      </div>
      <div className={cx("right-banner", "col-md-7 col-12")}>
        <img src={imgLink} alt={alt} className="rounded-1" />
      </div>
    </div>
  );
}

export default BannerSlide;
