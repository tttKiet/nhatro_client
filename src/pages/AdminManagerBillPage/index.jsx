import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { boardHouseServices, billServices } from "../../services";
import { useAuth } from "../../hooks";
import CardBill from "./CardBill";
import MyCalendar from "./Calendar";
import ModalCheckBill from "../../components/modal/ModalCheckBill";

import classNames from "classNames/bind";
import styles from "./AdminManagerBillPage.module.scss";
const cx = classNames.bind(styles);

function AdminManagerBillPage() {
  const [showDate, setShowDate] = useState(false);
  const [load, setLoad] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dateRef = useRef(null);
  const calendarRef = useRef(null);
  const [, , admin] = useAuth();
  const [billOnMonths, setBillOnMonths] = useState([]);
  const [allBoardHouse, setAllBoardHouse] = useState([]);
  const [bhIdSlected, setBhIdSlected] = useState("");
  const [date, setDate] = useState(new Date());

  function handleCloseModal() {
    setShowModal(false);
  }

  function toggleShowDate() {
    setShowDate((s) => !s);
  }

  const getBillOnMonth = useCallback(async function (month, boardHouseId) {
    setLoad(true);
    try {
      const res = await billServices.getBillOnMonth({
        month: month,
        boardHouseId: boardHouseId,
      });

      if (res.status === 200 && res.data.err === 0) {
        setBillOnMonths(res.data.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoad(false);
    }
  }, []);

  function handleChangeDate(d) {
    setDate(new Date(d));
    getBillOnMonth(new Date(d), bhIdSlected);
  }

  function handleChangeSelect(e) {
    setBhIdSlected(e.target.value);
    getBillOnMonth(new Date(), e.target.value);
  }

  const getAllBoardHouseByAdminId = useCallback(async () => {
    try {
      const res = await boardHouseServices.getBoardHouseById(admin._id);
      if (res.err === 0) {
        res.data.length > 0 && setBhIdSlected(res.data[0]._id);
        setAllBoardHouse(res.data);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, [admin._id]);

  useEffect(() => {
    getAllBoardHouseByAdminId();
  }, [getAllBoardHouseByAdminId]);

  useEffect(() => {
    bhIdSlected && getBillOnMonth(date, bhIdSlected);
  }, [bhIdSlected, date, getBillOnMonth]);

  useEffect(() => {
    const windowClick = (e) => {
      ((!dateRef?.current?.contains(e.target) &&
        !calendarRef?.current?.contains(e.target)) ||
        e.target.closest(".rdrDays")) &&
        setShowDate(false);
    };
    window.addEventListener("click", windowClick);

    return () => {
      window.removeEventListener("click", windowClick);
    };
  }, []);
  return (
    <div className={cx("wrapper")}>
      <ModalCheckBill
        boardHouse={allBoardHouse.find((b) => b._id === bhIdSlected)}
        show={showModal}
        handleClose={handleCloseModal}
      />
      <nav aria-label="breadcrumb ">
        <ol className="breadcrumb p-2 my-2">
          <li className="breadcrumb-item">
            <a href="#">Admin</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            All Members
          </li>
        </ol>
      </nav>
      <h4 className={cx("title")}>BILL</h4>

      {/*  Bills */}
      <div className="row mb-4">
        <div className="col-4">
          <div className={cx("func_item")}>
            <div className="h-100 p-2 rounded-3 border border-primary-subtle shadow d-flex justify-content flex-column algin-items-center border-2">
              <p className="fs-m">Select your board house here: </p>

              <select
                // ref={selectRef}
                className="form-select"
                aria-label="Default select example"
                defaultValue={bhIdSlected}
                onChange={(e) => handleChangeSelect(e)}
              >
                {allBoardHouse &&
                  allBoardHouse.map((bh) => (
                    <option value={bh?._id} key={bh?._id}>
                      {bh?.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className={cx("func_item")}>
            <div className="h-100 p-2 rounded-3 border border-primary-subtle shadow d-flex  flex-column algin-items-center border-2">
              <p className="fs-m ps-2 pb-0">Select bill viewing date: </p>
              <div className="p-2">
                <span
                  className={cx("date_vl")}
                  ref={dateRef}
                  onClick={toggleShowDate}
                >
                  {moment(date).format("l")}
                </span>
              </div>
              <div className={cx("date")}>
                {showDate && (
                  <div
                    ref={calendarRef}
                    className={cx(
                      "calendar",
                      '"p-2 rounded-3 border border-primary-subtle shadow border-2'
                    )}
                  >
                    <MyCalendar
                      handleChangeDate={handleChangeDate}
                      date={date}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className={cx("func_item")}>
            <div className="h-100 p-2 rounded-3 border border-primary-subtle shadow d-flex justify-content-center flex-column algin-items-center border-2">
              <div className="ps-2">
                <button
                  type="button"
                  className={cx("checkbtn")}
                  onClick={() => setShowModal(true)}
                >
                  Check Bill
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("bill-rooms")}>
        {billOnMonths.length > 0 ? (
          <>
            {billOnMonths.map((bill) => (
              <CardBill
                getBillOnMonth={() => getBillOnMonth(date, bhIdSlected)}
                key={bill._id}
                bill={bill}
              />
            ))}
          </>
        ) : (
          <p>Yout are not any member!!!</p>
        )}
      </div>
    </div>
  );
}

export default AdminManagerBillPage;
