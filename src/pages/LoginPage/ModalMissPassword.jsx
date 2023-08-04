import Modal from "react-bootstrap/Modal";
import { MdClose } from "react-icons/md";
import classNames from "classNames/bind";
import styles from "./ModalMissPassword.module.scss";
import { BsFillSendFill } from "react-icons/bs";

const cx = classNames.bind(styles);

function ModalMissPassword({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      //   fullscreen="sm-down"
    >
      <span className={cx("button-close")}>
        <MdClose className={cx("close")} onClick={onHide}></MdClose>
      </span>
      <Modal.Body>
        <div className={cx("")}>
          <p
            className="fs-m text-center rounded shadow py-2"
            style={{ background: "#068FFF", color: "#ffff" }}
          >
            We will send to your email a code, enter your email here:{" "}
          </p>
          <div className={cx("gr", "form-floating mb-3")}>
            <input
              type="text"
              className={cx("input-custom", "form-control")}
              id="password"
              name="password"
              placeholder="name@example.com"
            />
            <label htmlFor="password" className="fs-m fst-italic">
              Your email
            </label>
          </div>

          <button className={cx("btn-action")}>
            Send <BsFillSendFill></BsFillSendFill>
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalMissPassword;
