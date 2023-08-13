import styles from "./Bill.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);
function Bill() {
  return (
    <div className={cx("wrap")}>
      {/* Month - rentId - CreatedAt - electricSum - waterSum */}
      <div className={cx("box")}>
        <div className={cx("title")}>
          <p>
            <b style={{ color: "#0079FF" }}>Number of room:</b> 1
          </p>
          <p>
            <b style={{ color: "#0079FF" }}>Motel:</b> Nha tro The Van
          </p>
          <p>
            <b style={{ color: "#0079FF" }}>Month:</b> February
          </p>
        </div>
        <div className={cx("vr")}></div>
        <div className={cx("information")}>
          <p>
            <b style={{ color: "#0079FF" }} className="fst-italic">
              Electric price:
            </b>{" "}
            1.000.000 VND
          </p>

          <p>
            <b style={{ color: "#0079FF" }} className="fst-italic">
              Water price:
            </b>{" "}
            2.000.000 VND
          </p>

          <p>
            <b style={{ color: "#0079FF" }} className="fst-italic">
              Total price:
            </b>{" "}
            3.000.000 VND
          </p>
          <p>
            <b style={{ color: "#0079FF" }} className="fst-italic">
              Status:
            </b>{" "}
            Not pay
          </p>
        </div>
      </div>
    </div>
  );
}

export default Bill;
