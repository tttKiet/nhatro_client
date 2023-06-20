import { Link, useLocation } from "react-router-dom";
import classNames from "classNames/bind";
import styles from "./NavUser.module.scss";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);
function NavControl() {
  const [isShowSearch, setIsShowSearch] = useState(false);
  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
    const handleClickWindow = (e) => {
      const isClickThis = e.target.closest(".nav_control-search");
      if (!isClickThis) {
        setIsShowSearch(false);
      }
    };
    window.addEventListener("click", handleClickWindow);

    return () => {
      window.removeEventListener("click", handleClickWindow);
    };
  }, []);

  return (
    <div className={cx("nav_middle", "d-none d-md-block")}>
      <nav className="d-flex align-items-center">
        <div className={cx("nav_middle-link")}>
          <Link to="/" className={cx("control_item", { active: url === "/" })}>
            Home
          </Link>
        </div>
        <div className={cx("nav_middle-link")}>
          <Link
            to="/post"
            className={cx("control_item", { active: url.includes("/post") })}
          >
            Post
          </Link>
        </div>
        <div className={cx("nav_middle-link")}>
          <Link
            to="/motel"
            className={cx("control_item", { active: url.includes("/motel") })}
          >
            Motel
          </Link>
        </div>
        <div className={cx("nav_middle-link")}>
          <div
            className={cx(
              "search",
              { show: isShowSearch },
              "nav_control-search"
            )}
          >
            <div className={cx("input")}>
              <input type="text" placeholder="Looking for motel name... " />
            </div>
            <div
              className={cx("svg")}
              onClick={() => setIsShowSearch((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavControl;
