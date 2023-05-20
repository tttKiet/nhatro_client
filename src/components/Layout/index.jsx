import Nav from "../Nav";
import PropTypes from "prop-types";
import styles from "./Layout.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function Layout({ children }) {
  return (
    <div className={cx("wrap")}>
      <div className={cx("nav")}>
        <Nav />
      </div>
      <div className={cx("child")}>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
