import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../../hooks";
import styles from "./AdminAllMembersPage.module.scss";
import classNames from "classNames/bind";
import { boardHouseServices, rentServices } from "../../services";
import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import TableSort from "../../components/TableSort";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function AdminAllMembersPage() {
  const [, , admin] = useAuth();
  const [allBoardHouse, setAllBoardHouse] = useState([]);
  const [allRentReq, setAllRentReq] = useState([]);
  const selectRef = useRef();
  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("Index", {
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("Room", {
        cell: (info) => (
          <>
            <Tooltip anchorSelect="#roomInfo" content="Click to this room" />
            <Link
              to={`/motel/${info?.row?.original?.BoardHouseId}/?comp=room-info`}
              target="_blank"
            >
              <p
                className="fs-m m-0 fw-medium"
                style={{ cursor: "pointer" }}
                id="roomInfo"
              >
                {info.getValue()}
              </p>
            </Link>
          </>
        ),
      }),

      columnHelper.accessor("User", {
        cell: (info) => (
          <>
            <Tooltip anchorSelect="#userName" content="Click to see profile" />
            <Link
              to={`/user/${info?.row?.original?.InfoUser._id}`}
              target="_blank"
            >
              <p
                className="fs-m m-0 fw-medium"
                style={{ cursor: "pointer" }}
                id="userName"
              >
                {info?.row?.original?.User}
              </p>
            </Link>

            <p className="fs-m m-0">{info?.row?.original?.InfoUser.email}</p>
            <p className="fs-m m-0">{info?.row?.original?.InfoUser.phone}</p>
          </>
        ),
      }),

      columnHelper.accessor("StartDate", {
        cell: (info) => moment(info.getValue()).format("lll"),
      }),

      columnHelper.accessor("EndDate", {
        cell: (info) => moment(info.getValue()).format("lll"),
      }),

      columnHelper.accessor("Bill", {
        cell: (info) => <p className="fs-m m-0">Coming soon...</p>,
      }),

      columnHelper.accessor("Pay", {
        cell: (info) => <p className="fs-m m-0">Coming soon...</p>,
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
        1
      );

      if (res.err === 0) {
        setAllRentReq(
          res.data.length > 0 &&
            res.data.map((req, index) => ({
              _id: req._id,
              Index: index + 1,
              User: req.user.fullName,
              InfoUser: req.user,
              Room: req.room.number,
              IdRoom: req.room._id,
              BoardHouseId: selectRef.current.value,
              StartDate: req.startDate,
              // EndDate: req.endDate,
              EndDate: req.createdAt,
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
            This board house hasn&apos;t any members
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminAllMembersPage;
