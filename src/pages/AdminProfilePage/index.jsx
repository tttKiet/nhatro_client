import { useEffect, useState } from "react";
import RegisterForm from "../../components/RegisterForm";
import { boardHouseServices, userServices } from "../../services";
import { useAuth } from "../../hooks";
import { useParams } from "react-router-dom";
import AdminCardRoom from "../../components/AdminCardRoom";
import ModalCustom from "../../components/ModalCustom";
import Image from "react-bootstrap/Image";

import classNames from "classNames/bind";
import styles from "./AdminProfilePage.module.scss";
const cx = classNames.bind(styles);

function AdminProfilePage() {
  const [showUpdateInformation, setShowUpdateInformation] = useState(false);
  // const navigate = useNavigate();
  const [, , dataAdmin] = useAuth();
  const [rooms, setRooms] = useState([]);
  const [admin, setAdmin] = useState([]);
  const { id } = useParams();

  // async function getAdminData(id) {
  //   const res = await userServices.getUserById(id);
  //   if (res.err === 0) {
  //     setAdmin(res.dataUser);
  //   }
  // }

  const getAdminData = async () => {
    try {
      const res = await userServices.getUserById(id);
      if (res.err === 0) {
        setAdmin(res.dataUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBoardHouse = async () => {
    try {
      const res = await boardHouseServices.getBoardHouseById(id);
      setRooms(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdminData();
    getBoardHouse();
  }, []);

  function handleShowUpdateInformation() {
    setShowUpdateInformation(!showUpdateInformation);
  }

  // async function getBoardHouse(adminId) {
  //   const res = await boardHouseServices.getBoardHouseById(adminId);
  //   setRooms(res.data);
  // }

  return (
    <div className={cx("wrap")}>
      <div className="container pt-3">
        <div className="row">
          <div className="col-lg-4">
            <div
              className="card shadow  mb-5 bg-body-tertiary rounded overflow-hidden"
              // style={{ width: 20 + "rem" }}
            >
              {admin.avatar && admin.avatar.length > 4 ? (
                <Image src={admin.avatar} className={cx("card-img")}></Image>
              ) : (
                <Image
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.994684043.1684584897&semt=sph"
                  className={cx("card-img")}
                />
              )}

              <div className="card-body">
                <h5 className="card-title">{admin.fullName}</h5>
                <span
                  className={`badge d-flex p-1 my-2 align-items-center  rounded-pill ${
                    admin.emailVerified ? "text-bg-success" : "text-bg-danger"
                  } `}
                  style={{ width: 120 + "px" }}
                >
                  <span className="px-1">
                    Email verified{" "}
                    {admin.emailVerified ? (
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

                  <p className="card-text text-break">{dataAdmin.email}</p>
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

                  <p className="card-text text-break">{admin.address}</p>
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

                  <p className="card-text">{admin.phone}</p>
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
          <div className="col-lg-8">
            {rooms.map((room, index) => (
              <AdminCardRoom
                updateData={getBoardHouse}
                key={index}
                room={room}
              ></AdminCardRoom>
            ))}

            <ModalCustom
              show={showUpdateInformation}
              onHide={() => setShowUpdateInformation(false)}
              data={dataAdmin}
              Component={RegisterForm}
              action="Update information"
              _id={dataAdmin._id}
            ></ModalCustom>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfilePage;
