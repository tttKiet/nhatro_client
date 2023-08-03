import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styles from "./Logo.module.scss";
import classNames from "classNames/bind";
import logo from "../../assets/favicon/favicon.png";
import { Image } from "react-bootstrap";

const cx = classNames.bind(styles);
function Logo() {
  const [, type] = useAuth();
  const content = type === "user" ? "" : type;
  return (
    <div className={cx("wrap")}>
      <Link to={"/"} className={cx("link")}>
        <Image src={logo} className={cx("img-logo")}></Image>
        Future Motel
      </Link>
      {/* {content && (
        <p className={cx("des")}>
          <b>{content}</b>
        </p>
      )} */}
    </div>
  );
}

export default Logo;
