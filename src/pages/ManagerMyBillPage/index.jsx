import Bill from "../../components/Bill";
import styles from "./ManagerMyBillPage.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function ManagerMyBillPage() {
  return (
    <div className={cx("wrap")}>
      {/* Month - rentId - CreatedAt - electricSum - waterSum */}
      <p className={cx("")}>Newest bill</p>
      <Bill></Bill>
    </div>
  );
}

export default ManagerMyBillPage;
