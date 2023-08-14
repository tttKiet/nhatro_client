import classNames from "classNames/bind";
import styles from "./ModalCheckBill.module.scss";
import { BsCheck2All } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const cx = classNames.bind(styles);
import moment from "moment";

function CardBill({ bill }) {
  console.log(bill);
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

        {bill.status == 1 ? (
          <span className={cx("status")}>Marked as unpaid.</span>
        ) : (
          <span className={cx("status", "no")}>Marked as paid.</span>
        )}
      </div>
      <hr />

      <div className={cx("card__item_body")}>
        <div className="row">
          <div className="col-12 col-md-4">
            <div className={cx("price")}>
              <h5>Old electric number:</h5>

              <span>
                {bill.electricNumber ? `${bill.electricNumber}kw` : "../"}
              </span>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className={cx("price")}>
              <h5>Old electric number:</h5>
              <span>{bill.oldElectricNumber}kw</span>
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

              <span>{bill.waterNumber ? `${bill.waterNumber}kw` : "../"}</span>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className={cx("price")}>
              <h5>Old water number:</h5>
              <span>{bill.oldWaterNumber}kw</span>
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
