import { AdminNav } from "../../navs";
import PropTypes from "prop-types";
import styles from "./AdminLayout.module.scss";
import classNames from "classNames/bind";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks";
import { boardHouseServices } from "../../../services/";
import CheckUpdateBoardHouse from "../../CheckUpdateBoardHouse";
import ErrorPage from "../../../pages/ErrorPage";
import Offcanvas from "react-bootstrap/Offcanvas";
import { HiMenu } from "react-icons/hi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  const [, , dataAdmin] = useAuth();
  const [boardHouse, setBoardHouse] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // async function handleGetBoardHouse(adminId) {
  //   const response = await boardHouseServices.getBoardHouseById(adminId);
  //   if (response.err == 0) {
  //     setBoardHouse(response.data);
  //   } else {
  //     console.log(response);
  //   }
  // }

  // useEffect(() => {
  //   handleGetBoardHouse(dataAdmin._id);
  // }, [dataAdmin._id]);

  if (dataAdmin.type !== "admin") {
    return <ErrorPage></ErrorPage>;
  }

  // let shouldRenderUpdateBoardHouse = false;

  // if (boardHouse && boardHouse.length > 0) {
  //   shouldRenderUpdateBoardHouse = boardHouse.some((item) => item.name === "");
  // }

  // if (shouldRenderUpdateBoardHouse) {
  //   return boardHouse.map((item) => {
  //     if (item.name === "") {
  //       return <CheckUpdateBoardHouse key={item._id} id={item._id} />;
  //     }
  //     return null;
  //   });
  // }

  return (
    <div className={cx("wrap")}>
      <div className={cx("nav")}>
        <AdminNav />
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
