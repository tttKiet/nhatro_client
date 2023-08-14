/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { billServices } from "../../services";
import styles from "./Bill.module.scss";
import classNames from "classNames/bind";
import { toast } from "react-toastify";
import moment from "moment";

const cx = classNames.bind(styles);
function Bill({ rent, status }) {
  const [bill, setBill] = useState([]);
  const getBill = async () => {
    try {
      const res = await billServices.getillByRentId({ rentId: rent._id });
      if (res.data.err == 0) {
        const filterStatus = res.data.bills.filter(
          (bill) => bill.status == status
        );

        setBill(filterStatus);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error");
    }
  };

  useEffect(() => {
    getBill();
  }, [status]);
  return (
    <div className={cx("wrap", "my-2")}>
      {/* {console.log("rent", rent)}
      {console.log("bill", bill.length)} */}
      {/* Month - rentId - CreatedAt - electricSum - waterSum */}
      {bill.length > 0 && (
        <div className={cx("box")}>
          <div className={cx("title")}>
            <p>
              <b className="me-1" style={{ color: "#0079FF" }}>
                Number of room:
              </b>{" "}
              {rent?.room?.number}
            </p>
            <p>
              <b className="me-1" style={{ color: "#0079FF" }}>
                Motel:
              </b>{" "}
              {rent?.room?.boardHouseId?.name}
            </p>
            <p>
              <b className="me-1" style={{ color: "#0079FF" }}>
                Date:
              </b>{" "}
              {moment(bill[0]?.createdAt).format("ll")}
            </p>
          </div>
          <div className={cx("vr")}></div>
          <div className={cx("information")}>
            <p>
              <b style={{ color: "#0079FF" }} className="me-1 fst-italic">
                Electric price:
              </b>{" "}
              {Number(
                bill[0]?.electricNumber *
                  rent?.room?.boardHouseId?.electricPrice
              ).toLocaleString() + " VND"}
            </p>

            <p>
              <b style={{ color: "#0079FF" }} className="me-1 fst-italic">
                Water price:
              </b>{" "}
              {Number(
                bill[0]?.waterNumber * rent?.room?.boardHouseId?.waterPrice
              ).toLocaleString() + " VND"}
            </p>

            <p>
              <b style={{ color: "#0079FF" }} className="me-1 fst-italic">
                Room price:
              </b>{" "}
              {Number(rent?.room?.price).toLocaleString() + " VND"}
            </p>

            <p>
              <b style={{ color: "#0079FF" }} className="me-1 fst-italic">
                Total price:
              </b>{" "}
              {Number(bill[0]?.priceSum).toLocaleString() + " VND"}
            </p>
            <p>
              <b style={{ color: "#0079FF" }} className="me-1 fst-italic">
                Status:
              </b>{" "}
              {bill[0]?.status == "0" ? (
                <span
                  className={cx(
                    "status",
                    "bg-warning text-white shadow-sm px-1 rounded"
                  )}
                >
                  Not pay
                </span>
              ) : (
                <span
                  className={cx(
                    "status",
                    "bg-primary text-white shadow-sm px-1 rounded"
                  )}
                >
                  Paid
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bill;
