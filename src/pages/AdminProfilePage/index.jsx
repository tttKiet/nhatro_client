import { useEffect, useState } from "react";
import RegisterForm from "../../components/RegisterForm";
import styles from "./AdminProfilePage.module.scss";
import classNames from "classNames/bind";
import { userServices } from "../../services";
import { useAuth } from "../../hooks";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

function AdminProfilePage() {
  const [showUpdateInformation, setShowUpdateInformation] = useState(false);
  const [dataAdmin, setAdminData] = useState([]);
  const [, , admin] = useAuth();
  const getAdmin = async () => {
    const res = await userServices.getUserById(admin._id);
    if (res.err === 0) {
      setAdminData(res.dataUser);
    }
  };

  function handleShowUpdateInformation() {
    setShowUpdateInformation(!showUpdateInformation);
  }

  useEffect(() => {
    getAdmin();
  }, []);
  return (
    <div className={cx("wrap")}>
      <div className="container pt-3">
        <div className="row">
          <div className="col-md-3">
            <div
              className="card shadow  mb-5 bg-body-tertiary rounded overflow-hidden"
              style={{ width: 18 + "rem" }}
            >
              <img
                src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-meo-con-than-chet.jpg"
                className="card-img-top"
                alt="admin-avatar"
              />
              <div className="card-body">
                <h5 className="card-title">{dataAdmin.fullName}</h5>
                <span
                  className={`badge d-flex p-1 my-2 align-items-center  rounded-pill ${
                    dataAdmin.emailVerified
                      ? "text-bg-success"
                      : "text-bg-danger"
                  } `}
                  style={{ width: 120 + "px" }}
                >
                  <span className="px-1">
                    Email verified{" "}
                    {dataAdmin.emailVerified ? (
                      <svg
                        width={20 + "px"}
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
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        width={20 + "px"}
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
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </span>
                </span>
                <div className="info-box d-flex align-items-center mb-2">
                  <svg
                    width={20 + "px"}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 me-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>

                  <p className="card-text">{dataAdmin.email}</p>
                </div>
                <div className="info-box d-flex align-items-center mb-2">
                  <svg
                    width={20 + "px"}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 me-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>

                  <p className="card-text">{dataAdmin.address}</p>
                </div>
                <div className="info-box d-flex align-items-center mb-2">
                  <svg
                    width={20 + "px"}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 me-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>

                  <p className="card-text">{dataAdmin.phone}</p>
                </div>
                <button
                  className="btn btn-primary p-1 px-2 mt-2"
                  onClick={handleShowUpdateInformation}
                >
                  <small>Update Information</small>
                </button>
              </div>
              <span className={cx("line-admin-profile")}></span>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card shadow p-2 mb-5 bg-body-tertiary rounded">
              <img
                src="https://truongthang.vn/wp-content/uploads/2020/02/truong-thang-5-y-tuong-trang-tri-noi-that-phong-tro-cao-cap-cuc-don-gian.jpg"
                className={cx("img-profile-admin", "card-img-top ")}
                alt="your-motel"
              />
              <div className="card-body">
                <h5 className="card-title">Dãy trọ abc</h5>
                <div className="info-box d-flex align-items-center mb-2">
                  <svg
                    width={20 + "px"}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 me-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>

                  <p className="card-text">Địa chỉ: Ninh Kiều, Cần Thơ</p>
                </div>
                <div className="info-box d-flex align-items-center mb-2">
                  <svg
                    width={20 + "px"}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 me-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                    />
                  </svg>

                  <p className="card-text">Tổng số phòng: 109</p>
                </div>
                <div className="info-box d-flex align-items-center mb-2">
                  <svg
                    width={20 + "px"}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 me-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <p className="card-text">Giá điện: 3000 VNĐ</p>
                </div>
                <div className="info-box d-flex align-items-center mb-2">
                  <svg
                    width={20 + "px"}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 me-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <p className="card-text">Giá nước: 3000 VNĐ</p>
                </div>
                <p className="card-text">
                  <small className="text-body-secondary">
                    Chỉnh sửa vào ngày: 11/11/2034
                  </small>
                </p>
              </div>
            </div>
            {showUpdateInformation && (
              <div
                className={
                  (cx("form-update-infomation"),
                  "row card shadow p-2 mb-5 bg-body-tertiary rounded mx-1")
                }
              >
                <RegisterForm _id={dataAdmin._id}></RegisterForm>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfilePage;
