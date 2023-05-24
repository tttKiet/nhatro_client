import AdminCard from "../../components/AdminCard";
import styles from "./AdminHomePage.module.scss";
import classNames from "classNames/bind";
import { useAuth } from "../../hooks";
import Notification from "../../components/Notification";
const cx = classNames.bind(styles);

function AdminHomePage() {
  const [, , dataAdmin] = useAuth();
  return (
    <div className={cx("wrap", "flex")}>
      <div className={cx("d-flex justify-content-between ", "heading")}>
        <span className="badge d-flex align-items-center p-2 pe-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill">
          <img
            className="rounded-circle me-2 border border-light border-3"
            width="40"
            height="40"
            src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-meo-con-than-chet.jpg"
            alt=""
          />
          Xin chào {dataAdmin.fullName}! Hãy quản lý nhà trọ của bạn
        </span>
      </div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb breadcrumb-chevron p-3 bg-body-tertiary rounded-3">
          <li className="breadcrumb-item">
            <a
              className="link-body-emphasis fw-semibold text-decoration-none"
              href="#"
            >
              Admin
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            DashBoard
          </li>
        </ol>
      </nav>
      <div className="row">
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
