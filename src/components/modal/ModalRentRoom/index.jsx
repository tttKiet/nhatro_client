import { Button, Modal, FormCheck, ToggleButton } from "react-bootstrap";
import styles from "./ModalRentRoom.module.scss";
import classNames from "classNames/bind";
import { AiFillStar } from "react-icons/ai";
import { CiDollar } from "react-icons/ci";
const cx = classNames.bind(styles);

function ModalRentRoom({ show, toggleShow }) {
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
                  <h5 className={cx("title")}>Confirm rental information</h5>
                  <div className={cx("feedback")}>
                    <AiFillStar size={14} />
                    <b>4,84</b>|<span>140 Evaluate</span>
                  </div>
                </div>
              </div>
              <div className={cx("gr")}>
                <h5 className={cx("title")}>Room number:</h5>
                <div className={cx("ctent")}>3</div>
              </div>
              <div className={cx("gr")}>
                <h5 className={cx("title")}>Address:</h5>
                <div className={cx("ctent")}>
                  per kilo of electricity and get unlimited use.
                </div>
              </div>

              <div className={cx("gr")}>
                <h5 className={cx("title")}>Check in date:</h5>
                <div className={cx("ctent")}>22/2/222</div>
              </div>
              <div className={cx("gr")}>
                <h5 className={cx("title")}>Price on month:</h5>
                <div className={cx("ctent")}>
                  <div className="d-flex align-items-center">
                    1m2
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
                <div className={cx("ctent")}>Bui kiet</div>
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
          <button className={cx("btn-send")} type="button" onClick={toggleShow}>
            Agree
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalRentRoom;
