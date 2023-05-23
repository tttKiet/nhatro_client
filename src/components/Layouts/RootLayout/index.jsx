import { RootNav } from "../../navs";
import PropTypes from "prop-types";
import styles from "./RootLayout.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function RootLayout({ children }) {
  return (
    <div className={cx("wrap")}>
      <div className={cx("nav")}>
        <RootNav />
      </div>
      <div className={cx("child")}>{children}</div>
    </div>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
