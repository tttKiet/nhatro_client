import Logo from "../../Logo";
import NavControl from "./NavControl";
import UserControl from "./UserControl";
import classNames from "classNames/bind";
import styles from "./NavUser.module.scss";
import { Fragment, useEffect, useState } from "react";
import { BiBuildingHouse, BiHome, BiNews, BiUser } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const cx = classNames.bind(styles);
function NavUser() {
  const location = useLocation();
  const url = location.pathname;
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // hide navbar when scroll down
  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <Fragment>
      <div className={cx("wrap")}>
        <div className="container-lg">
          <div
            className={cx(
              "d-flex align-items-center justify-content-between",
              "navbar"
            )}
          >
            <Logo />
            <NavControl />
            <UserControl />
          </div>
        </div>
      </div>

      <div className={cx("wrap-mobile", `${!show && "auto-hide"}`)}>
        <Link to="/" className={cx("item", { active: url === "/" })}>
          <BiHome className={cx("sub-icon")}></BiHome>
          <p className={cx("sub-text")}>Home</p>
        </Link>

        <Link
          to="/post"
          className={cx("item", { active: url.includes("/post") })}
        >
          <BiNews className={cx("sub-icon")}></BiNews>
          <p className={cx("sub-text")}>Posts</p>
        </Link>

        <Link
          to="/motel"
          className={cx("item", { active: url.includes("/motel") })}
        >
          <BiBuildingHouse className={cx("sub-icon")}></BiBuildingHouse>
          <p className={cx("sub-text")}>Motel</p>
        </Link>

        <Link
          to="/profile?tag=my-profile"
          className={cx("item", { active: url.includes("/profile") })}
        >
          <BiUser className={cx("sub-icon")}></BiUser>
          <p className={cx("sub-text")}>Profile</p>
        </Link>
      </div>
    </Fragment>
  );
}

export default NavUser;
