import { NavManagerRoom } from "../../navs";
import PropTypes from "prop-types";
// import Footer from "../../Footer";
import styles from "./ManagerRoomLayout.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);
function ManagerRoomLayout({ children }) {
  return (
    <div className={cx("wrap")}>
      <NavManagerRoom />
      <div className={cx("child")}>{children}</div>
      <div>{/* <Footer></Footer> */}</div>
    </div>
  );
}

ManagerRoomLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ManagerRoomLayout;
