import { AdminNav } from "../../navs";
import PropTypes from "prop-types";
import styles from "./AdminLayout.module.scss";
import classNames from "classNames/bind";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks";
import { boardHouseServices } from "../../../services/";
import CheckUpdateBoardHouse from "../../CheckUpdateBoardHouse";
const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  const [, , dataAdmin] = useAuth();
  const [boardHouse, setBoardHouse] = useState([]);

  async function handleGetBoardHouse(adminId) {
    const response = await boardHouseServices.getBoardHouseById(adminId);
    if (response.err == 0) {
      setBoardHouse(response.data);
    } else {
      console.log(response.err);
    }
  }

  useEffect(() => {
    handleGetBoardHouse(dataAdmin._id);
  }, [dataAdmin._id]);

  if (dataAdmin.type !== "admin") {
    return <h1>You are not admin</h1>;
  }

  let shouldRenderUpdateBoardHouse = false;

  if (boardHouse && boardHouse.length > 0) {
    shouldRenderUpdateBoardHouse = boardHouse.some((item) => item.name === "");
  }

  if (shouldRenderUpdateBoardHouse) {
    return boardHouse.map((item) => {
      if (item.name === "") {
        return <CheckUpdateBoardHouse key={item._id} id={item._id} />;
      }
      return null;
    });
  }

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
