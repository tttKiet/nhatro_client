import { Link } from "react-router-dom";
import styles from "./RootViewAccountPermissions.module.scss";
import classNames from "classNames/bind";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import InfoAccountPermission from "../../components/InfoAccountPermission";
import RequestFromAccount from "../../components/RequestFromAccount";

const cx = classNames.bind(styles);

function RootViewAccountPermissions() {
  return (
    <div className={cx("wrap")}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Permissions
          </li>
        </ol>
      </nav>

      <Tabs
        defaultActiveKey="info"
        id="uncontrolled-tab-example"
        className="mb-3 mt-4"
      >
        <Tab eventKey="info" title="View information account">
          <InfoAccountPermission />
        </Tab>
        <Tab eventKey="request" title="Request from account">
          <RequestFromAccount getData={true} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default RootViewAccountPermissions;
