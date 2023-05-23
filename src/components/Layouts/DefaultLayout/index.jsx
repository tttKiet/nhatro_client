import { UserNav } from "../../navs";
import PropTypes from "prop-types";
import styles from "./DefaultLayout.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrap")}>
      <div className={cx("nav")}>
        <UserNav />
      </div>
      <div className={cx("child")}>{children}</div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
