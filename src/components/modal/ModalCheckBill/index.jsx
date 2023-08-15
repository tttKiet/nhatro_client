import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCallback, useEffect, useState } from "react";

import { billServices, rentServices } from "../../../services";
import CardBill from "./CardBill";
import classNames from "classNames/bind";
import styles from "./ModalCheckBill.module.scss";
const cx = classNames.bind(styles);

function ModalCheckBill({
  show,
  handleClose,
  boardHouse,
  getBillOnMonth,
  setDate,
}) {
  const [members, setMembers] = useState([]);
  const [bills, setBills] = useState([]);
  const [mberSlected, setMberSlected] = useState("");

  function handleChangeSelect(e) {
    setMberSlected(e.target.value);
    getBills(e.target.value);
  }

  const getBills = useCallback(async (rentId) => {
    if (rentId) {
      billServices
        .getillByRentId({ rentId: rentId })
        .then((res) => {
          res.status === 200 &&
            res.data.err === 0 &&
            setBills(res?.data?.bills || []);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (boardHouse?._id)
      rentServices
        .getRentsFromBoardHouseId(boardHouse?._id, 1)
        .then((res) => {
          // console.log(res);
          res.err === 0 && setMembers(res.data || []);
          // console.log("res?.data?.[0]", res?.data?.[0]);
          setMberSlected(res?.data?.[0]?._id || "");
          console.log("res", res);
          res?.data?.[0]?._id ? getBills(res?.data?.[0]?._id) : setBills([]);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [boardHouse?._id, getBills]);
  return (
    <Modal show={show} onHide={handleClose} centered size="lg" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Check Bill For `{boardHouse?.name}`</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={cx("wrapper")}>
          <div className={cx("body")}>
            <div className="row">
              <div className="col-md-6 col-12">
                <div className={cx("func_item")}>
                  <div className="h-100 p-2 rounded-3 border border-primary-subtle shadow d-flex justify-content flex-column algin-items-center border-2">
                    {members.length > 0 ? (
                      <>
                        <p className="fs-m">Choose room - name: </p>
                        <select
                          // ref={selectRef}
                          className="form-select"
                          aria-label="Default select example"
                          defaultValue={mberSlected}
                          onChange={(e) => handleChangeSelect(e)}
                        >
                          {members.map((mb) => (
                            <option value={mb?._id} key={mb?._id}>
                              {mb?.room?.number} - {mb?.user?.fullName}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <div>You are not any member!</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("bill-rooms")}>
              {bills.length > 0 ? (
                <>
                  {bills.map((bill) => (
                    <CardBill
                      setDate={setDate}
                      bhId={boardHouse._id}
                      getBillOnMonth={getBillOnMonth}
                      key={bill._id}
                      bill={bill}
                      getBills={getBills}
                      rentId={mberSlected}
                    />
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
