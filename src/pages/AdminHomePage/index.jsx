import AdminCard from "../../components/AdminCard";
import styles from "./AdminHomePage.module.scss";
import classNames from "classNames/bind";
import { useAuth } from "../../hooks";
import Notification from "../../components/Notification";
import { Link } from "react-router-dom";
import ErrorPage from "../ErrorPage";

const cx = classNames.bind(styles);

function AdminHomePage() {
  const [, , dataAdmin] = useAuth();

  if (dataAdmin.type !== "admin") {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <div className={cx("wrap", "flex")}>
      <div className={cx("d-flex justify-content-between ", "heading")}>
        <span className="fs-s badge d-flex align-items-center p-2 pe-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill">
          <img
            className="rounded-circle me-2 border border-light border-3 "
            width="40"
            height="40"
            src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-meo-con-than-chet.jpg"
            alt=""
          />
          Welcome {dataAdmin.fullName}! Let&apos;s manage your motel
        </span>
        <Link
          className={cx("btn-view-profile", "fs-m")}
          to={`/admin/profile/${dataAdmin._id}`}
        >
          View Profile{" "}
          <svg
            width={20 + "px"}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 ms-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Link>
      </div>
      {/* {!dataAdmin.emailVerified && (
        <Alert variant="danger">
          This is a alert with <Alert.Link href="#">an example link</Alert.Link>
          . Give it a click if you like.
        </Alert>
      )} */}
      <div className="row mt-5">
        <div className="col-md-7">
          <AdminCard></AdminCard>
        </div>
        <div className="col-md-1">
          <span className={cx("vertical-line")}></span>
        </div>

        <div className="col-md-4">
          <p className="text-end pe-2">
            All notification <span className="badge text-bg-secondary">4</span>
          </p>
          <Notification></Notification>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
