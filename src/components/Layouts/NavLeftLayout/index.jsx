import { NavLeft } from "../../navs";
import PropTypes from "prop-types";
import styles from "./NavLeftLayout.module.scss";
import classNames from "classNames/bind";
import { Container } from "react-bootstrap";
import StarsCanvas from "../../StarsCanvas";

const cx = classNames.bind(styles);

function NavLeftLayout({ children }) {
  return (
    <div className={cx("min-vh-100", "wrap", "position-relative")}>
      <StarsCanvas />
      <Container fluid="sm">
        <div className={cx("contai")}>
          <div className={cx("nav")}>
            <NavLeft />
          </div>
          <div className={cx("child")}>{children}</div>
        </div>
      </Container>
    </div>
  );
}

NavLeftLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavLeftLayout;
