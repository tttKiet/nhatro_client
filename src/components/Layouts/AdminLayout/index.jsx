import { AdminNav } from "../../navs";
import PropTypes from "prop-types";
import styles from "./AdminLayout.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  return (
    <div className={cx("wrap")}>
      <div className={cx("nav")}>
        <AdminNav />
      </div>
      <div className={cx("child")}>{children}</div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
