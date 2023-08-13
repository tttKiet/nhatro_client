import { RootNav } from "../../navs";
import PropTypes from "prop-types";
import styles from "./RootLayout.module.scss";
import classNames from "classNames/bind";
import { BiMenu } from "react-icons/bi";
import { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiOutlineClose } from "react-icons/ai";

const cx = classNames.bind(styles);

function RootLayout({ children }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={cx("wrap")}>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Body className="p-1">
          <AiOutlineClose
            className={cx("close-icon")}
            onClick={handleClose}
          ></AiOutlineClose>
          <RootNav />
        </Offcanvas.Body>
      </Offcanvas>

      <div className={cx("nav-responsive")}>
        <BiMenu className={cx("menu-icon")} onClick={handleShow}></BiMenu>
      </div>
      <div className={cx("", "row m-0 p-0")}>
        <div className={cx("nav", "col-3")}>
          <RootNav onHide={handleClose} />
        </div>
        <div className={cx("child", "col-9")}>{children}</div>
      </div>
    </div>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
