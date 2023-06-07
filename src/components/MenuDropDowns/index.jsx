import PropTypes from "prop-types";

import styles from "./MenuPropDown.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);
function MenuPropDown({ body }) {
  return <div className={cx("menu", "User_Control-user-menu")}>{body}</div>;
}

MenuPropDown.propTypes = {
  body: PropTypes.node.isRequired,
};

export default MenuPropDown;
