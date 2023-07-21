import styles from "./AdminCardRoom.module.scss";
import classNames from "classNames/bind";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import PropTypes from "prop-types";
import { useState } from "react";
import UpdateBoardHouseForm from "../UpdateBoardHouseForm";
import ModalCustom from "../ModalCustom";
const cx = classNames.bind(styles);

function AdminCardRoom({ room, updateData }) {
  const [showModal, setShowModal] = useState(false);

  const dataExisted = {
    _id: room._id,
    address: room.address,
    phone: room.phone,
    electricPrice: room.electricPrice,
    waterPrice: room.waterPrice,
    Images: room.images,
    fileImages: room.fileImages,
    originalImage: room.images,
  };

  return (
    <div className={cx("wrap")}>
      <div className="card shadow p-2 mb-5 bg-body-tertiary rounded">
        <Carousel
          className={cx("carousel-control")}
          showArrows={true}
          showThumbs={false}
          emulateTouch={true}
          showIndicators={true}
          infiniteLoop={true}
          interval={3000}
          autoPlay={true}
        >
          {room.images.map((image, index) => (
            <div key={index}>
              <img
                key={index}
                src={image}
                className={cx("img-profile-admin")}
                alt="your-motel"
              />
            </div>
          ))}
        </Carousel>

        <div className="card-body">
          <h5 className="card-title">{room.name}</h5>
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

            <p className="card-text">Adress: {room.address}</p>
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

            <p className="card-text">Total rooms: ?</p>
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

            <p className="card-text">
              Electric Price: {room.electricPrice} VNĐ
            </p>
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

            <p className="card-text">Water Price: {room.waterPrice} VNĐ</p>
          </div>
          <p className="card-text">
            <small className="text-body-secondary">
              Updated at: {room.updatedAt}
            </small>
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
          >
            Update board house
          </button>
        </div>
      </div>
      <ModalCustom
        updateData={updateData}
        show={showModal}
        onHide={() => setShowModal(false)}
        data={room}
        dataExisted={dataExisted}
        Component={UpdateBoardHouseForm}
        action="Edit board house"
      />
    </div>
  );
}

AdminCardRoom.propTypes = {
  room: PropTypes.object,
};

export default AdminCardRoom;
