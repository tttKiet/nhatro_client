import classNames from "classNames/bind";
import styles from "./ModalCheckOutRoom.module.scss";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import MyCalendar from "../../../pages/AdminManagerBillPage/Calendar";
import moment from "moment";
const cx = classNames.bind(styles);

function ModalCheckOutRoom({ show, handleClose, handleClickArgee }) {
  const [check, setCheck] = useState(1);
  const [date, setDate] = useState(new Date());

  function handleChangeDate(event) {
    setDate(event);
  }

  function handleChange(e) {
    setCheck(e.target.value);
  }

  return (
    <Modal show={show} onHide={handleClose} size="x" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Verify check out room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx("wrapper")}>
          <div className={cx("title")}>When is the room to check out?</div>

          <div className={cx("grs")}>
            <div className={cx("gr")}>
              <input
                type="radio"
                value={1}
                checked={check == 1}
                name="ch"
                id="here"
                onChange={handleChange}
              />
              <label htmlFor="here">Here</label>
            </div>

            <div className={cx("gr")}>
              <input
                type="radio"
                checked={check == 2}
                value={2}
                name="ch"
                id="order"
                onChange={handleChange}
              />
              <label htmlFor="order">
                Choose date
                <span className={cx("date_v")}>
                  [ {moment(date).format("L")} ]
                </span>
              </label>
            </div>

            {check == 2 && (
              <div className={cx("date")}>
                <div
                  className={cx(
                    "calendar",
                    "p-2 rounded-3 border border-primary-subtle shadow border-2"
                  )}
                >
                  <MyCalendar
                    min={new Date().setDate(new Date().getDate() + 1)}
                    handleChangeDate={handleChangeDate}
                    date={date}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            check == 1 ? handleClickArgee(new Date()) : handleClickArgee(date);
          }}
        >
          Argee
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCheckOutRoom;
