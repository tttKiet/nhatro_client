import MotelItem from "../../components/MotelItem";
import SearchMotel from "../../components/SearchMotel";
import styles from "./MotelPage.module.scss";
import classNames from "classNames/bind";
import { useEffect, useState } from "react";
import { boardHouseServices } from "../../services";
const cx = classNames.bind(styles);

function MotelPage() {
  const [boaHouseData, setBoaHouseData] = useState([]);

  useEffect(() => {
    boardHouseServices
      .getBoardHousePage({ page: 1 })
      .then((res) => {
        if (res?.status === 200 && res?.data?.err === 0) {
          setBoaHouseData(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={cx("wrap")}>
      {console.log("board house", boaHouseData)}
      <SearchMotel />
      <div className="container">
        <div className={cx("sitebar")}>
          <div className={cx("doc")}>+ 2000 motel</div>
          <button className={cx("filter")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                height: "14px",
                width: "14px",
                fill: "currentcolor",
              }}
            >
              <path d="M5 8a3 3 0 0 1 2.83 2H14v2H7.83A3 3 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.83 4H2V4h6.17A3 3 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
            </svg>
            <span className={cx("text")}>Filter</span>
          </button>
        </div>

        <div className={cx("motels", "mt-3")}>
          <div className="row g-4">
            {boaHouseData.map((b) => (
              <MotelItem key={b._id} {...b} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MotelPage;
