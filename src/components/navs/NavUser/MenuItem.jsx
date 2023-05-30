import "./NavUser.module.scss";
import PropTypes from "prop-types";

function MenuItem({ svg, title, ...props }) {
  return (
    <li {...props}>
      {svg}
      {title}
    </li>
  );
}

MenuItem.propTypes = {
  svg: PropTypes.node,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default MenuItem;
