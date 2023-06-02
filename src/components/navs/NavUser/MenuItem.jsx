import "./NavUser.module.scss";
import PropTypes from "prop-types";
import classNames from "classNames/bind";
import styles from "./NavUser.module.scss";

const cx = classNames.bind(styles);
function MenuItem({ svg, title, onlyView, ...props }) {
  return (
    <li {...props} className={cx({ notcursor: onlyView })}>
      {svg}
      {title}
    </li>
  );
}

MenuItem.propTypes = {
  svg: PropTypes.node,
  onlyView: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default MenuItem;
