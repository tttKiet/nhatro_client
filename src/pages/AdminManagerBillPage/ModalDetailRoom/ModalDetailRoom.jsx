import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import classNames from "classNames/bind";
import styles from "./ModalDetailRoom.module.scss";

const cx = classNames.bind(styles);

function ModalDetailRoom({ show, onHide, data }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className={cx("wrap")}>
        <p
          className="fs-m fw-bold fst-italic text-center"
          style={{ color: "#068FFF" }}
        >
          Detail room
        </p>

        <div className="row">
          <div className="col-6">
            <p className="fs-m">
              <b>Room:</b> {data?.room?.number}
            </p>

            <p className="fs-m">
              <b>size:</b> {data?.room?.size}
            </p>
            <p className="fs-m">
              <b>Price:</b>{" "}
              {Number(data?.room?.price).toLocaleString() + " VND"}
            </p>
          </div>

          <div className="col-6">
            <p className="fs-m">
              <b>User:</b> {data?.user?.fullName}
            </p>
            <p className="fs-m">
              <b>Email:</b> {data?.user?.fullName}
            </p>
            <p className="fs-m">
              <b>Phone:</b> {data?.user?.phone}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalDetailRoom;
