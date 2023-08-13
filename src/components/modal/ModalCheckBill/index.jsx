import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback, useEffect, useState } from "react";

import { billServices, rentServices } from "../../../services";
import CardBill from "./CardBill";
import classNames from "classNames/bind";
import styles from "./ModalCheckBill.module.scss";
const cx = classNames.bind(styles);

function ModalCheckBill({ show, handleClose, boardHouse }) {
  // /api/v1/board-house/all-rent/:_id?status=

  const [members, setMembers] = useState([]);
  const [bills, setBills] = useState([]);
  const [mberSlected, setMberSlected] = useState("");

  function handleChangeSelect(e) {
    setMberSlected(e.target.value);
  }

  const getBills = useCallback(async (rentId) => {
    billServices
      .getillByRentId({ rentId: rentId })
      .then((res) => {
        console.log(res);
        res.status === 200 &&
          res.data.err === 0 &&
          setBills(res?.data?.bills || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (boardHouse?._id)
      rentServices
        .getRentsFromBoardHouseId(boardHouse?._id, 1)
        .then((res) => {
          console.log(res);
          res.err === 0 &&
            setMembers(res.data || []) &&
            setMberSlected(res?.data?.[0] || "");
          getBills(res?.data?.[0]._id);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [boardHouse?._id, getBills]);
  return (
    <Modal show={show} onHide={handleClose} centered size="lg" keyboard={false}>
      <Modal.Header closeButton>
        {console.log(boardHouse)}
        <Modal.Title>Check Bill For `{boardHouse?.name}`</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx("wrapper")}>
          <div className={cx("body")}>
            <div className="row">
              <div className="col-6">
                <div className={cx("func_item")}>
                  <div className="h-100 p-2 rounded-3 border border-primary-subtle shadow d-flex justify-content flex-column algin-items-center border-2">
                    <p className="fs-m">Choose room - name: </p>

                    <select
                      // ref={selectRef}
                      className="form-select"
                      aria-label="Default select example"
                      defaultValue={mberSlected}
                      onChange={(e) => handleChangeSelect(e)}
                    >
                      {members &&
                        members.map((mb) => (
                          <option value={mb?._id} key={mb?._id}>
                            {mb?.room?.number} - {mb?.user?.fullName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("bill-rooms")}>
              {bills.length > 0 ? (
                <>
                  {bills.map((bill) => (
                    <CardBill key={bill._id} bill={bill} />
                  ))}
                </>
              ) : (
                <p>Yout are not any member!!!</p>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalCheckBill;
