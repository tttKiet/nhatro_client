import MotelItem from "../../components/MotelItem";
import SearchMotel from "../../components/SearchMotel";
import styles from "./MotelPage.module.scss";
import classNames from "classNames/bind";
import { useEffect, useState } from "react";
import { boardHouseServices } from "../../services";
import ModalFilter from "./ModalFilter/ModalFilter";
import { MdOutlineClearAll } from "react-icons/md";
import { toast } from "react-toastify";
import { BiBuildings } from "react-icons/bi";
import { BarLoader } from "react-spinners";
const cx = classNames.bind(styles);

function MotelPage() {
  const [boaHouseData, setBoaHouseData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getBoardHouses = async () => {
    try {
      const res = await boardHouseServices.getBoardHousePage({ page: 1 });
      if (res?.status === 200 && res?.data?.err === 0) {
        setBoaHouseData(res.data.data);
        setIsFilter(false);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    boardHouseServices
      .getBoardHousePage({ page: 1 })
      .then((res) => {
        if (res?.status === 200 && res?.data?.err === 0) {
          setBoaHouseData(res.data.data);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return (
      <div className={cx("mt-5 pt-5")}>
        <BarLoader color="#E48586" height={8} width={350} className="mx-auto" />
      </div>
    );
  }

  return (
    <div className={cx("wrap")}>
      {/* modal filter */}
      <ModalFilter
        setIsFilter={setIsFilter}
        setBoaHouseData={setBoaHouseData}
        onHide={() => setShowFilter(false)}
        show={showFilter}
      />

      {/* <SearchMotel /> */}
      <div className="container pt-5">
        <div className={cx("sitebar")}>
          <p
            className={cx("text-title", "m-0 fw-medium")}
            style={{ color: "#ce5f60" }}
          >
            All motels here <BiBuildings className="fs-xl"></BiBuildings>
          </p>

          <div className={cx("right", "d-flex align-items-center")}>
            <div className={cx("doc")}>+ {boaHouseData.length} motels</div>
            {isFilter && (
              <button
                className={cx("filter", "me-2")}
                onClick={() => getBoardHouses()}
              >
                <MdOutlineClearAll />
                <span className={cx("text")}>Clear filter</span>
              </button>
            )}

            <button
              className={cx("filter")}
              onClick={() => setShowFilter(true)}
            >
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
        </div>

        <div className={cx("motels", "mt-3")}>
          <div className="row g-4">
            {boaHouseData.map((b) => (
              <MotelItem key={b._id} {...b} />
            ))}

            {boaHouseData.length == 0 && (
              <p className="fs-m w-75 m-auto mt-5 shadow-sm text-center py-3 bg-white rounded">
                No rooms found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MotelPage;
