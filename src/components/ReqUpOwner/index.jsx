import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";
import ModalReqOwner from "../modal/ModalReqOwner";
import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import TableReqOwnUser from "../tables/TableReqOwnUser";
// scss
import styles from "./ReqUpOwner.module.scss";
import classNames from "classNames/bind";
import { VscAdd } from "react-icons/vsc";
import { MdAdd } from "react-icons/md";
const cx = classNames.bind(styles);

function ReqUpOwner() {
  const [activeTab, setActiveTab] = useState("information");
  const [, , user] = useAuth();
  if (!user.emailVerified) {
    return (
      <div
        className={cx("notifications", "bg-white p-2 rounded w-75 text-center")}
      >
        <h4 className="fs-l ">
          {" "}
          You need to verify your email as to as continues!!
        </h4>
        <div className={cx("to_ver")}>
          <Link to={`/profile?tag=verify-email`} className="">
            Verify email here
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={cx("wrap")}>
      <Tabs
        defaultActiveKey={"my-profile"}
        activeKey={activeTab}
        className="mb-3"
        style={{ display: "none" }}
      >
        <Tab eventKey="model" title="model">
          <ModalReqOwner activeTab={activeTab} setActiveTab={setActiveTab} />
        </Tab>
        <Tab eventKey="information" title="information">
          <button
            className={cx("btn-create")}
            onClick={() => setActiveTab("model")}
          >
            <p className="m-0">
              Create request <MdAdd></MdAdd>
            </p>
          </button>
          <TableReqOwnUser activeTab={activeTab} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default ReqUpOwner;
