import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";
import ModalReqOwner from "../modal/ModalReqOwner";
import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import TableReqOwnUser from "../tables/TableReqOwnUser";
// scss
import styles from "./ReqUpOwner.module.scss";
import classNames from "classNames/bind";
const cx = classNames.bind(styles);

function ReqUpOwner() {
  const [activeTab, setActiveTab] = useState("information");
  const [, , user] = useAuth();
  if (!user.emailVerified) {
    return (
      <div className={cx("notifications")}>
        <h4> You need to verify your email as to as continues!!</h4>
        <div className={cx("to_ver")}>
          <Link to={`/profile/${user?._id}?tag=verify-email`}>
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
            className="have_icon btn btn-primary"
            onClick={() => setActiveTab("model")}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
            Create request
          </button>
          <TableReqOwnUser activeTab={activeTab} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default ReqUpOwner;
