import { useRef, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import classNames from "classNames/bind";
import { Collapse } from "react-bootstrap";
import styles from "./AdminManagerBillPage.module.scss";
import { billServices } from "../../services";
import { toast } from "react-toastify";
import moment from "moment";

const cx = classNames.bind(styles);

function CardBill({ bill, getBillOnMonth, handleCheckOut }) {
  const [electricInput, setElectricInput] = useState(bill.electricNumber || "");
  const [waterInput, setWaterInput] = useState(bill.waterNumber || "");
  const [load, setLoad] = useState(false);
  const regex = /[a-zA-Z]/;
  const [show, setShow] = useState(false);

  function tgleshow() {
    setShow((s) => !s);
  }

  const ref = useRef(null);

  function changeInput(type, value) {
    if (!regex.test(value))
      if (type == "electric") {
        setElectricInput(value);
      } else if (type == "water") {
        setWaterInput(value);
      }
  }

  async function handleCLickSave(e, billId) {
    e.preventDefault();
    setLoad(true);
    toast.clearWaitingQueue();
    try {
      const res = await billServices.saveBill({
        electric: electricInput,
        water: waterInput,
        rentId: bill.rent._id,
        billId: billId,
      });

      if (res.status === 200 && res.data.err == 0) {
        toast.success("Saved!!!");
        getBillOnMonth();
      } else {
        toast.error(res.data.message || "Failed! Please try again!!!");
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message || "Failed! Please try again!!!");
    } finally {
      setLoad(false);
    }
  }

  return (
    <div className={cx("bill")} key={bill._id}>
      <div className={cx("room")}>
        <div className={cx("pay")}>
          <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              onClick={tgleshow}
              aria-controls="example-collapse-text"
              aria-expanded={show}
            >
              Room {bill?.rent?.room?.number} -
              <span className="hight-pink ms-2">
                {bill?.rent?.user?.fullName}
              </span>
            </button>

            <span className={cx("price", { pay_h: bill.status == 1 })}>
              {bill.priceSum}
              {bill?.status == 1 ? (
                <BsCheck2Circle color="6b38ff" />
              ) : (
                <GrFormClose color="#f22b2b" />
              )}
            </span>
          </div>
          <Collapse in={show}>
            <div className={cx("content")}>
              <form
                onSubmit={(e) => handleCLickSave(e, bill._id)}
                className={cx("card card-body", "ctet")}
              >
                <div className="row">
                  <div className={cx("col-12", "name-price")}>
                    Electric (kw)
                  </div>
                  <div className="col-md-4 col-12">
                    <div className={cx("gr")}>
                      <b>OLD:</b>
                      <span>{bill.oldElectricNumber}</span>
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className={cx("gr")}>
                      <b>NEW:</b>
                      <input
                        type="text"
                        placeholder={"../"}
                        value={electricInput}
                        onChange={(e) =>
                          changeInput("electric", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className={cx("col-12", "name-price")}>Water (m2)</div>
                  <div className="col-md-4 col-12">
                    <div className={cx("gr")}>
                      <b>OLD:</b>
                      <span>{bill.oldWaterNumber}</span>
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className={cx("gr")}>
                      <b>NEW:</b>
                      <input
                        type="text"
                        placeholder={"../"}
                        value={waterInput}
                        onChange={(e) => changeInput("water", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className={cx("createdAt")}>
                      On | {moment(bill.createdAt).format("l")}
                    </span>
                    <div className={cx("actions")}>
                      <button
                        type="button"
                        className={cx("checkout")}
                        onClick={() => handleCheckOut()}
                      >
                        Check out
                      </button>
                      <button
                        type="submit"
                        className={cx("save")}
                        disabled={load}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default CardBill;
