import { NavManagerRoom } from "../../navs";
import PropTypes from "prop-types";
// import Footer from "../../Footer";
import styles from "./ManagerRoomLayout.module.scss";
import classNames from "classNames/bind";
import { AiOutlineMenu } from "react-icons/ai";
import { Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const cx = classNames.bind(styles);
function ManagerRoomLayout({ children }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className={cx("wrap")}>
      <Offcanvas
        style={{ with: "300px" }}
        scroll={true}
        show={show}
        onHide={handleClose}
      >
        <div
          className={cx("wrap-offcanvas", "h-100 w-100")}
          style={{ background: "#234fba" }}
        >
          <p className="m-0">
            <MdKeyboardDoubleArrowLeft
              style={{ cursor: "pointer", color: "white" }}
              onClick={handleClose}
              className="float-end me-3 fs-xxl mt-3"
            ></MdKeyboardDoubleArrowLeft>
          </p>
          <NavManagerRoom handleClose={handleClose} />
        </div>
      </Offcanvas>
      <div className={cx("btn-menu")}>
        <button onClick={handleShow}>
          <AiOutlineMenu className="fs-xl"></AiOutlineMenu>
        </button>
      </div>
      <div className={cx("responsive")}>
        <NavManagerRoom />
      </div>

      <div className={cx("child")}>{children}</div>
      <div>{/* <Footer></Footer> */}</div>
    </div>
  );
}

ManagerRoomLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ManagerRoomLayout;
