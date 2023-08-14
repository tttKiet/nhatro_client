import classNames from "classNames/bind";
import styles from "./ModalCheckBill.module.scss";
import { BsCheck2All } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const cx = classNames.bind(styles);
import moment from "moment";
import { billServices } from "../../../services";
import { useState } from "react";
import { toast } from "react-toastify";

function CardBill({ bill, getBills, rentId, bhId, getBillOnMonth, setDate }) {
  const [load, setLoad] = useState(false);

  async function handleToggleStt(stt) {
    if (load) return;
    setLoad(true);
    toast.clearWaitingQueue();
    const id = toast.loading("Saving ... !");
    try {
      const res = await billServices.editStatus({
        billId: bill._id,
        status: stt == 1 ? 0 : 1,
      });

      if (res.status === 200 && res.data.err === 0) {
        toast.update(id, {
          render: "Changes saved!!!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        getBills(rentId);
        getBillOnMonth(new Date(), bhId);
        setDate(new Date());
      }
    } catch (err) {
      console.log(err);
      toast.update(id, {
        render: err?.response?.data?.message || "Error!!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setLoad(false);
      toast.clearWaitingQueue();
    }
  }

  return (
    <div className={cx("card__item")}>
      <div className={cx("card__item_header")}>
        <div className={cx("createdAt")}>
          {moment(bill.createdAt).format("l")} | status
          {bill.status == 1 ? (
            <span className={cx("status", "s")}>
              Paid <BsCheck2All />
            </span>
          ) : (
            <span className={cx("status", "s", "no")}>
              Unpaid <MdClose color="#fff" />
            </span>
          )}
        </div>

        <div onClick={() => handleToggleStt(bill.status)}>
          {bill.status == 1 ? (
            <span className={cx("status")}>Marked as unpaid.</span>
          ) : (
            <span className={cx("status", "no")}>Marked as paid.</span>
          )}
        </div>
      </div>
      <hr />

      <div className={cx("card__item_body")}>
        <div className="row">
          <div className="col-12 col-md-4">
            <div className={cx("price")}>
              <h5>Old electric number:</h5>

              <span>
                {bill.oldElectricNumber ? `${bill.oldElectricNumber}kw` : "../"}
              </span>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className={cx("price")}>
              <h5>Electricity reading:</h5>
              <span>
                {bill.electricNumber ? `${bill.electricNumber}kw` : "../"}
              </span>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className={cx("price")}>
              <h5>Total:</h5>
              <span>
                {bill.electricNumber - bill.oldElectricNumber < 0
                  ? "../"
                  : `${bill.electricNumber - bill.oldElectricNumber}kw`}
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-4">
            <div className={cx("price")}>
              <h5>Old water number:</h5>

              <span>
                {bill.oldWaterNumber ? `${bill.oldWaterNumber}kw` : "../"}
              </span>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className={cx("price")}>
              <h5>Water reading:</h5>
              <span>{bill.waterNumber ? `${bill.waterNumber}kw` : "../"}</span>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className={cx("price")}>
              <h5>Total:</h5>
              <span>
                {bill.waterNumber - bill.oldWaterNumber < 0
                  ? "../"
                  : `${bill.waterNumber - bill.oldWaterNumber}kw`}
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="price">
              <div className={cx("title")}>Total have much pay:</div>
              <div className={cx("total")}>{bill.priceSum} vnd</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardBill;
