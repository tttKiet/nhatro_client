import { useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import classNames from "classNames/bind";
import styles from "./AdminManagerBillPage.module.scss";
import { billServices } from "../../services";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function CardBill({ bill, getBillOnMonth }) {
  const [electricInput, setElectricInput] = useState("");
  const [waterInput, setWaterInput] = useState("");
  const [load, setLoad] = useState(false);
  const regex = /[a-zA-Z]/;

  function changeInput(type, value) {
    if (!regex.test(value))
      if (type == "electric") {
        setElectricInput(value);
      } else if (type == "water") {
        setWaterInput(value);
      }
  }

  async function handleCLickSave(billId) {
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
    }
  }

  return (
    <div className={cx("bill")} key={bill._id}>
      <div className={cx("room")}>
        <div className={cx("pay")}>
          <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
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
          <div className={cx("collapse", "content")} id="collapseExample">
            <div className={cx("card card-body", "ctet")}>
              <div className="row">
                <div className={cx("col-12", "name-price")}>Electric (kg)</div>
                <div className="col-4">
                  <div className={cx("gr")}>
                    <b>OLD:</b>
                    <span>{bill.oldElectricNumber}</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className={cx("gr")}>
                    <b>NEW:</b>
                    <input
                      type="text"
                      placeholder={bill.electricNumber || "../"}
                      value={electricInput}
                      onChange={(e) => changeInput("electric", e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className={cx("col-12", "name-price")}>Water (m2)</div>
                <div className="col-4">
                  <div className={cx("gr")}>
                    <b>OLD:</b>
                    <span>{bill.oldWaterNumber}</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className={cx("gr")}>
                    <b>NEW:</b>
                    <input
                      type="text"
                      placeholder={bill.waterNumber || "../"}
                      value={waterInput}
                      onChange={(e) => changeInput("water", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className={cx("actions")}>
                  <button type="button" className={cx("checkout")}>
                    Room check out
                  </button>
                  <button
                    type="button"
                    className={cx("save")}
                    onClick={() => handleCLickSave(bill._id)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardBill;
