import { Modal } from "react-bootstrap";
import { GrFormClose } from "react-icons/gr";
import styles from "./ModalRentRoomDetails.module.scss";
import classNames from "classNames/bind";
import { useAuth } from "../../../hooks";
import moment from "moment";
const cx = classNames.bind(styles);

function ModalRentRoomDetails({ show, toggleShow }) {
  const [, , user] = useAuth();

  return (
    <Modal
      centered
      size="lg"
      show={show}
      onHide={toggleShow}
      // backdrop="static"
      keyboard={true}
      dialogClassName={cx("wrap")}
    >
      <div className={cx("header")}>
        <h4>Confirm rental information</h4>
        <div className={cx("x")} onClick={toggleShow}>
          <GrFormClose size={26} />
        </div>
      </div>

      <Modal.Body>
        <div className={cx("wrapper")}></div>
      </Modal.Body>
      <Modal.Footer>
        {/* <div className={cx("submit")}>
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
        </div> */}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalRentRoomDetails;
