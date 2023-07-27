import { Button, Modal, FormCheck, ToggleButton } from "react-bootstrap";
import styles from "./ModalRentRoom.module.scss";
import classNames from "classNames/bind";
import { rentServices } from "../../../services";
import { PulseLoader } from "react-spinners";
import { useAuth } from "../../../hooks";
import { AiFillStar } from "react-icons/ai";
import { CiDollar } from "react-icons/ci";
import moment from "moment";
import { toast } from "react-toastify";
import { useState } from "react";
const cx = classNames.bind(styles);

function ModalRentRoom({
  boardHouseName,
  roomNumber,
  startDate,
  roomPrice,
  address,
  show,
  owner,
  toggleShow,
  roomId,
}) {
  const [, , user] = useAuth();
  const [loadding, setLoadding] = useState(false);

  const handleClickAgree = () => {
    setLoadding(true);
    rentServices
      .createRent({ userId: user._id, roomId: roomId, startDate })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Success!!");
          toggleShow();
        }
      })
      .catch((err) => {
        toast.error(err?.message || "Erorr");
      })
      .finally(() => {
        setLoadding(false);
      });
  };

  return (
    <Modal
      centered
      size="lg"
      show={show}
      onHide={toggleShow}
      backdrop="static"
      keyboard={false}
      dialogClassName={cx("wrap")}
    >
      <div className={cx("header")}>
        <h4>Confirm rental information</h4>
      </div>

      <Modal.Body>
        <div className={cx("wrapper")}>
          <div className="row">
            <div className="col-7">
              <div className={cx("gr")}>
                <div className={cx("boardH-name")}>
                  <h5 className={cx("title")}>{boardHouseName}</h5>
                  <div className={cx("feedback")}>
                    <AiFillStar size={14} />
                    <b>4,84</b>|<span>140 Evaluate</span>
                  </div>
                </div>
              </div>
              <div className={cx("gr")}>
                <h5 className={cx("title")}>Room number:</h5>
                <div className={cx("ctent")}>{roomNumber}</div>
              </div>
              <div className={cx("gr")}>
                <h5 className={cx("title")}>Address:</h5>
                <div className={cx("ctent")}>{address}</div>
              </div>

              <div className={cx("gr")}>
                <h5 className={cx("title")}>Check in date:</h5>
                <div className={cx("ctent")}>
                  {moment(startDate).calendar()}
                </div>
              </div>
              <div className={cx("gr")}>
                <h5 className={cx("title")}>Price on month:</h5>
                <div className={cx("ctent")}>
                  <div className="d-flex align-items-center">
                    {roomPrice}
                    <CiDollar size={22} color="#000" />
                  </div>
                </div>
              </div>
              <div className={cx("gr", "mt-3")}>
                <h5 className={cx("title", "d-flex align-items-center ")}>
                  <FormCheck
                    inline
                    type="checkbox"
                    variant="secondary"
                    className="me-1"
                  ></FormCheck>
                  By clicking agree, you agree to our terms.
                </h5>
              </div>
            </div>
            <div className="col-5">
              <div className={cx("gr")}>
                <h5 className={cx("title")}>Owner:</h5>
                <div className={cx("ctent")}>{owner?.fullName}</div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className={cx("submit")}>
          <button
            className={cx("btn-send", "cancel")}
            type="button"
            onClick={toggleShow}
          >
            Cancel
          </button>
          <button
            className={cx("btn-send")}
            type="button"
            onClick={handleClickAgree}
            disabled={loadding}
          >
            {loadding ? <PulseLoader size={7} color="#fff" /> : "Agree"}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalRentRoom;
