import { AdminNav } from "../../navs";
import PropTypes from "prop-types";
import styles from "./AdminLayout.module.scss";
import classNames from "classNames/bind";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks";
import ErrorPage from "../../../pages/ErrorPage";
import Offcanvas from "react-bootstrap/Offcanvas";
import { HiMenu } from "react-icons/hi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useLocation } from "react-router-dom";
const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  const [, , dataAdmin] = useAuth();
  const location = useLocation();
  const url = location.pathname;
  const [prevUrl, setPrevUrl] = useState("/admin");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseNavBar = () => {
    if (prevUrl != url) {
      setPrevUrl(url);
      setShow(false);
    }
  };

  useEffect(() => {
    handleCloseNavBar();
  }, [url]);

  if (dataAdmin.type !== "admin") {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <div className={cx("wrap")}>
      <div className={cx("nav")}>
        <AdminNav handleClose={() => setShow(false)} />
      </div>

      {/* responsive */}
      <div className={cx("responsive-nav")}>
        <span className={cx("icon-wrap")}>
          <HiMenu className={cx("icon-menu")} onClick={handleShow}></HiMenu>
        </span>
        <Offcanvas show={show} onHide={handleClose}>
          <p className="m-0">
            <MdKeyboardDoubleArrowLeft
              style={{ cursor: "pointer" }}
              onClick={handleClose}
              className="float-end me-3 fs-xxl mt-3"
            ></MdKeyboardDoubleArrowLeft>
          </p>
          <Offcanvas.Body>
            <AdminNav />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <div className={cx("child")}>{children}</div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
