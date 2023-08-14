import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import classNames from "classNames/bind";
import styles from "./ModalDetailBill.module.scss";

const cx = classNames.bind(styles);

function ModalDetailBill({ show, onHide, data }) {
  console.log("Data", data);
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
          Detail bill
        </p>

        <div className="row">
          <div className="col-6">
            <p className="fs-m">
              <b>Board House:</b> {data?.rent?.room?.boardHouseId?.name}
            </p>
            <p className="fs-m">
              <b>Address:</b> {data?.rent?.room?.boardHouseId?.address}
            </p>
            <p className="fs-m">
              <b>Water Price:</b>{" "}
              {Number(
                data?.rent?.room?.boardHouseId?.waterPrice
              ).toLocaleString() + " VND"}
            </p>
            <p className="fs-m">
              <b>Electric Price:</b>{" "}
              {Number(
                data?.rent?.room?.boardHouseId?.electricPrice
              ).toLocaleString() + " VND"}
            </p>
          </div>

          <div className="col-6">
            <p className="fs-m">
              <b>Room number:</b> {data?.rent?.room?.number}
            </p>
            <p className="fs-m">
              <b>Room Price:</b>{" "}
              {Number(data?.rent?.room?.price).toLocaleString() + " VND"}
            </p>
            <p className="fs-m">
              <b>Water price:</b>{" "}
              {Number(
                data?.electricNumber *
                  data?.rent?.room?.boardHouseId?.electricPrice
              ).toLocaleString() + " VND"}
            </p>
            <p className="fs-m">
              <b>Electric price:</b>{" "}
              {Number(
                data?.waterNumber * data?.rent?.room?.boardHouseId?.waterPrice
              ).toLocaleString() + " VND"}
            </p>
            <p className="fs-m">
              <b>User:</b> {data?.rent?.user?.fullName}
            </p>
            <p className="fs-m">
              <b>Contact:</b>{" "}
              {data?.rent?.user?.email + " | " + data?.rent?.user?.phone}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className="fs-m text-center">
              <b>Total Price:</b>{" "}
              {Number(data?.priceSum).toLocaleString() + " VND"}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalDetailBill;
