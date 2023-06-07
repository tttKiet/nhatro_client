import "./NavUser.module.scss";
import PropTypes from "prop-types";
import classNames from "classNames/bind";
import styles from "./NavUser.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function MenuItem({ svg, title, onlyView, to, ...props }) {
  if (to) {
    return (
      <Link to={to} {...props} className={cx({ notcursor: onlyView })}>
        {svg}
        {title}
      </Link>
    );
  }
  return (
    <li {...props} className={cx({ notcursor: onlyView })}>
      {svg}
      {title}
    </li>
  );
}

MenuItem.propTypes = {
  svg: PropTypes.node,
  to: PropTypes.string,
  onlyView: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default MenuItem;
