import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { boardHouseServices, billServices } from "../../services";
import { useAuth } from "../../hooks";
import CardBill from "./CardBill";
import MyCalendar from "./Calendar";
import ModalCheckBill from "../../components/modal/ModalCheckBill";

import classNames from "classNames/bind";
import styles from "./AdminManagerBillPage.module.scss";
import ModalCheckOutRoom from "../../components/modal/ModalCheckOutRoom";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);

function AdminManagerBillPage() {
  const [showDate, setShowDate] = useState(false);
  const [load, setLoad] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checkOutOptions, setCheckOutOptions] = useState({
    billId: "",
    rentId: "",
  });
  const [showCheckOut, setShowCheckOut] = useState(false);

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
  function handleCloseModalCO() {
    setShowCheckOut(false);
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
      console.log("res", res);
      if (res.status === 200 && res.data.err === 0) {
        setBillOnMonths(res.data.data.filter((e) => e != null));
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

  function handleCheckOut(billId, rentId) {
    setShowCheckOut(true);
    setCheckOutOptions(() => ({
      rentId: rentId,
      billId: billId,
    }));
  }
  async function handleClickArgee(date) {
    try {
      const res = await billServices.checkOut({
        ...checkOutOptions,
        date: date,
      });
      if (res.status === 200 && res.data.err === 0) {
        await getBillOnMonth(new Date(), bhIdSlected);
        toast.success("OK!!!");
        setShowCheckOut(false);
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllBoardHouseByAdminId();
  }, [getAllBoardHouseByAdminId]);

  useEffect(() => {
    bhIdSlected &&
      getBillOnMonth(date, bhIdSlected) &&
      setBhIdSlected((p) => p);
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
      <ModalCheckOutRoom
        handleClickArgee={handleClickArgee}
        show={showCheckOut}
        handleClose={handleCloseModalCO}
      />
      <ModalCheckBill
        boardHouse={allBoardHouse.find((b) => b._id === bhIdSlected)}
        show={showModal}
        setDate={setDate}
        getBillOnMonth={getBillOnMonth}
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
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-12 col-md-4">
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
        <div className="col-12 col-sm-6 col-md-3">
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
              {showDate && (
                <div
                  ref={calendarRef}
                  className={cx(
                    "calendar",
                    "p-2 rounded-3 border border-primary-subtle shadow border-2"
                  )}
                >
                  <MyCalendar handleChangeDate={handleChangeDate} date={date} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
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
                setBhIdSlected={setBhIdSlected}
                getBillOnMonth={() => getBillOnMonth(date, bhIdSlected)}
                key={bill?._id}
                bill={bill}
                handleCheckOut={() => handleCheckOut(bill._id, bill.rent._id)}
              />
            ))}
          </>
        ) : (
          <p>Yout are not any bill!!!</p>
        )}
      </div>
    </div>
  );
}

export default AdminManagerBillPage;
