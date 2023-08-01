import styles from "./AdminAllRequestsPage.module.scss";
import classNames from "classNames/bind";
import { useAuth } from "../../hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { boardHouseServices, rentServices } from "../../services";
import { createColumnHelper } from "@tanstack/react-table";
import TableSort from "../../components/TableSort";
import moment from "moment";
import { BsCheckCircle } from "react-icons/bs";
import { toast } from "react-toastify";

import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const cx = classNames.bind(styles);

function AdminAllRequestsPage() {
  const [, , admin] = useAuth();
  const [allBoardHouse, setAllBoardHouse] = useState([]);
  const [allRentReq, setAllRentReq] = useState([]);
  const selectRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const btnref = useRef();

  function confirmBeforeDelete(reqId) {
    toast.error(
      <div className={cx("wrap-toast")}>
        <p className="m-0">
          Are you sure to <b>reject</b>?
        </p>
        <div className="">
          <AiOutlineCheckCircle
            style={{ color: "#FE0000" }}
            className={cx("btn-action-toast")}
            onClick={() => handleRejectRentReq(reqId)}
          ></AiOutlineCheckCircle>
          <AiOutlineCloseCircle
            style={{ color: "#0079FF" }}
            className={cx("btn-action-toast")}
            onClick={() => {
              toast.dismiss();
              toast.clearWaitingQueue();
            }}
          ></AiOutlineCloseCircle>
        </div>
      </div>,
      {
        closeButton: false,
      }
    );

    async function handleRejectRentReq(reqId) {
      btnref.current.disabled = true;
      let toastId = null;
      toastId = toast.loading("Loading...");
      setIsLoading(true);
      try {
        const res = await rentServices.rejectReqRent(reqId);
        if (res.err === 0) {
          getAllRentsByBoardHouseId();
          toast.update(toastId, {
            render: res.message,
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          setIsLoading(false);
        } else {
          toast.update(toastId, {
            render: res.message,
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        btnref.current.disabled = false;
      }
    }
  }

  const handleAccepRentReq = async (reqId) => {
    setIsLoading(true);

    btnref.current.disabled = true;

    let toastId = null;
    toastId = toast.loading("Loading...");
    try {
      const res = await rentServices.acceptReqRent(reqId);
      if (res.err === 0) {
        getAllRentsByBoardHouseId();
        toast.update(toastId, {
          render: res.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.update(toastId, {
          render: res.message,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      btnref.current.disabled = false;
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("Index", {
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("User", {
        cell: (info) => (
          <>
            <p className="fs-m m-0 fw-medium">{info?.row?.original?.User}</p>
            <p className="fs-m m-0">{info?.row?.original?.Email}</p>
            <p className="fs-m m-0">{info?.row?.original?.Phone}</p>
          </>
        ),
      }),

      columnHelper.accessor("Room", {
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("Date", {
        cell: (info) => moment(info.getValue()).format("lll"),
      }),

      columnHelper.accessor("CreatedAt", {
        cell: (info) => moment(info.getValue()).format("lll"),
      }),

      columnHelper.accessor("Status", {
        cell: (info) =>
          info?.row?.original?.Status == "0" ? (
            <div className={cx("d-flex flex-column gap-2")}>
              <button
                ref={btnref}
                className={cx("btn-action", "shadow-sm")}
                style={{ backgroundColor: "#0079FF" }}
                onClick={() => handleAccepRentReq(info?.row?.original?._id)}
              >
                Accept
              </button>

              <button
                ref={btnref}
                className={cx("btn-action", "shadow-sm")}
                style={{ backgroundColor: "#F24C3D" }}
                onClick={() => confirmBeforeDelete(info?.row?.original?._id)}
              >
                Reject
              </button>
            </div>
          ) : (
            <span className="badge text-bg-success rounded rounded-3 fs-l p-2">
              Accepted <BsCheckCircle className="fs-m ms-1" />
            </span>
          ),
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const getAllBoardHouseByAdminId = useCallback(async () => {
    try {
      const res = await boardHouseServices.getBoardHouseById(admin._id);
      if (res.err === 0) {
        setAllBoardHouse(res.data);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, [admin._id]);

  const getAllRentsByBoardHouseId = useCallback(async () => {
    try {
      const res = await rentServices.getRentsFromBoardHouseId(
        selectRef.current.value,
        0
      );

      if (res.err === 0) {
        setAllRentReq(
          res.data.length > 0 &&
            res.data.map((req, index) => ({
              _id: req._id,
              Index: index + 1,
              User: req.user.fullName,
              Email: req.user.email,
              Phone: req.user.phone,
              Room: req.room.number,
              Date: req.startDate,
              EndDate: req.endDate,
              CreatedAt: req.createdAt,
              Status: req.status,
            }))
        );
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllBoardHouseByAdminId();
  }, [getAllBoardHouseByAdminId]);

  useEffect(() => {
    if (allBoardHouse.length > 0) {
      getAllRentsByBoardHouseId();
    }
  }, [allBoardHouse, getAllRentsByBoardHouseId]);

  return (
    <div className={cx("wrap")}>
      {/* {console.log("all board house", allBoardHouse)} */}
      {/* {console.log("ref", selectRef.current?.value)} */}
      <div className={cx("wrap-select")}>
        <div className="row mt-3 ms-1 ">
          <div
            style={{ width: "250px" }}
            className="p-2 rounded-3 border border-primary-subtle shadow border-2"
          >
            <p className="fs-m">Select your board house here: </p>

            <select
              ref={selectRef}
              className="form-select"
              aria-label="Default select example"
              defaultValue={allBoardHouse && allBoardHouse[0]?._id}
              onChange={() => getAllRentsByBoardHouseId()}
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

      <div className={cx("table")}>
        {allRentReq.length > 0 ? (
          <TableSort data={allRentReq} columns={columns}></TableSort>
        ) : (
          <p className="fs-m m-0 mt-5 fst-italic text-center shadow-sm py-3 rounded-3 border">
            This board house hasn&apos;t any requests
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminAllRequestsPage;
