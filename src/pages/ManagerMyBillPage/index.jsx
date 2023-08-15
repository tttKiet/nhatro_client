import Bill from "../../components/Bill";
import styles from "./ManagerMyBillPage.module.scss";
import classNames from "classNames/bind";
import { useAuth } from "../../hooks";
import { useCallback, useEffect, useState } from "react";
import { billServices, rentServices } from "../../services";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function ManagerMyBillPage() {
  const [, , user] = useAuth();
  const [allRent, setAllRent] = useState([]);
  const [status, setStatus] = useState("0");

  const getRentByUser = useCallback(async () => {
    try {
      // const res = await rentServices.getRent({ userId: user._id });
      const res = await rentServices.getRentRoomUser({ userId: user._id });

      if (res.data.err == 0) {
        console.log("rent", res.data);
        setAllRent(res.data.data);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error");
    }
  }, [user._id]);

  useEffect(() => {
    getRentByUser();
  }, [getRentByUser]);

  return (
    <div className={cx("wrap")}>
      {/* Month - rentId - CreatedAt - electricSum - waterSum */}
      <div
        style={{ width: "250px" }}
        className="p-2 mb-4 rounded-3 border border-primary-subtle shadow-sm border-2"
      >
        <p className="fs-m">Select bill here: </p>

        <select
          className="form-select"
          defaultValue="0"
          aria-label="Default select example"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="0">Not Pay</option>
          <option value="1">Paid</option>
        </select>
      </div>

      <div>
        {allRent.length > 0 &&
          allRent.map((rent) => (
            <Bill key={rent._id} rent={rent} status={status}></Bill>
          ))}
      </div>
    </div>
  );
}

export default ManagerMyBillPage;
