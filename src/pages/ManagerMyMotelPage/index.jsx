import { GiSuperMushroom } from "react-icons/gi";
import styles from "./ManagerMyMotelPage.module.scss";
import { useAuth } from "../../hooks";
import { rentServices } from "../../services";
import classNames from "classNames/bind";
import { useEffect, useState } from "react";
import ModalRoomDetails from "../../components/modal/ModalRoomDetails";
import { BsHouse } from "react-icons/bs";
const cx = classNames.bind(styles);

function ManagerMyMotelPage() {
  const [rentRoom, setRentRoom] = useState([]);
  const [currRoomDetails, setCurrRoomDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [, , user] = useAuth();

  function toggleShowModal() {
    setShowModal((s) => !s);
  }

  function handleClickDetails(rent) {
    toggleShowModal();
    setCurrRoomDetails({ ...rent });
  }

  useEffect(() => {
    rentServices
      .getRentRoomUser({ userId: user._id })
      .then((res) => {
        res?.status === 200 &&
          res?.data?.err === 0 &&
          setRentRoom(res?.data?.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user._id]);

  return (
    <div className={cx("wrapper")}>
      <ModalRoomDetails
        toggleShow={toggleShowModal}
        {...currRoomDetails}
        show={showModal}
      />
      <div className={cx("title")}>My room</div>

      <div className={cx("row")}>
        {rentRoom?.length > 0 ? (
          <>
            {rentRoom.map((rent) => (
              <div
                key={rent._id}
                className="col-4"
                onClick={() => handleClickDetails(rent)}
              >
                <div className={cx("room")}>
                  <h5 className={cx("number")}>
                    Room {rent?.room?.number}{" "}
                    <BsHouse className="fs-l mb-1 ms-1" />
                  </h5>
                  <div className="d-flex justify-content-center flex-column align-items-center g-2 mt-2">
                    <div className={cx("info")}>
                      <div className={cx("item")}>
                        {rent?.room?.boardHouseId?.userId?.fullName}
                      </div>
                    </div>

                    <div className={cx("info")}>
                      <div className={cx("item", "price")}>
                        {Number(rent?.room?.price).toLocaleString() + " VND"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>You have not rental room</div>
        )}
      </div>
    </div>
  );
}

export default ManagerMyMotelPage;
