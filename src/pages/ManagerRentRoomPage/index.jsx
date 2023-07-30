import { useCallback, useEffect, useMemo, useState } from "react";
import TableSort from "../../components/TableSort";
import styles from "./ManagerRentRoomPage.module.scss";
import { useAuth } from "../../hooks";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineEye,
} from "react-icons/ai";

import classNames from "classNames/bind";
import { createColumnHelper } from "@tanstack/react-table";
import { rentServices } from "../../services";
import ModalRentRoomDetails from "../../components/modal/ModalRentRoomDetails";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);

function ManagerRentRoomPage() {
  const columnHelper = createColumnHelper();

  const [, , user] = useAuth();
  const [data, setData] = useState([]);
  const [detailsOb, setDetailsOb] = useState({});

  const [showModal, setShowModal] = useState(false);

  function toggleShowModal(info) {
    info?.row?.original && setDetailsOb(info.row.original);
    setShowModal((s) => !s);
  }

  const getRents = useCallback(
    function () {
      rentServices.getRent({ userId: user._id }).then((res) => {
        if (res.status === 200 && res.data?.err === 0) {
          setData(() => {
            const data = res.data.data;
            return data.map((d, i) => ({
              _id: d._id,
              Number: i + 1,
              Name: d?.room?.boardHouseId?.name,
              Room: d?.room?.number,
              Phone: d?.room?.boardHouseId?.phone,
              Status: d?.status,
              ...d,
            }));
          });
        }
      });
    },
    [user._id]
  );

  const handleCancelRent = useCallback(
    async function handleCancelRent(_idRent) {
      toast.clearWaitingQueue();
      const toastId = toast.loading("is canceling...");
      try {
        const res = await rentServices.deleteRent({ _id: _idRent });
        if (res.status === 200 && res?.data?.err === 0) {
          toast.update(toastId, {
            isLoading: false,
            render: "Cancelled!",
            autoClose: 2000,
            pauseOnHover: false,
          });
          getRents();
        }
      } catch (err) {
        console.log(err);
        toast.update(toastId, {
          isLoading: false,
          render: `${
            err?.response?.data?.message || "Error. Please try again!"
          }`,
          autoClose: 2000,
          pauseOnHover: false,
        });
      }
    },
    [getRents]
  );

  const handleCLickCancel = useCallback(
    function (_idRent) {
      toast.clearWaitingQueue();
      toast.error(
        <div className={cx("wrap-toast")}>
          <p className="m-0">
            Are you sure to <b>cancel</b>?
          </p>
          <div className="">
            <AiOutlineCheckCircle
              style={{ color: "#FE0000" }}
              className={cx("btn-action")}
              onClick={() => handleCancelRent(_idRent)}
            ></AiOutlineCheckCircle>
            <AiOutlineCloseCircle
              style={{ color: "#0079FF" }}
              className={cx("btn-action")}
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
    },
    [handleCancelRent]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("Number", {
        cell: (info) => info.getValue(),
        // enableSorting: false,
        // enableColumnFilter: false,
      }),
      columnHelper.accessor("Name", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Room", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Phone", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Status", {
        cell: (info) => (
          <>
            <span
              className={cx("status", {
                rented: info.getValue() != 0,
              })}
            >
              {info.getValue() == 0 ? "REQUEST" : "RENTED"}
            </span>
          </>
        ),
      }),
      columnHelper.accessor("Action", {
        cell: (info) => {
          if (info?.row?.original?.Status != 1) {
            return (
              <div>
                <button
                  className={cx("actions", "rented")}
                  onClick={() => handleCLickCancel(info?.row?.original?._id)}
                >
                  CANCEL
                </button>
                <button
                  className={cx("actions", "eye")}
                  onClick={() => toggleShowModal(info)}
                >
                  <AiOutlineEye size={16} />
                </button>
              </div>
            );
          }

          return (
            <div>
              <button
                className={cx("actions", "eye")}
                onClick={toggleShowModal}
              >
                <AiOutlineEye size={16} />
              </button>
            </div>
          );
        },
        enableSorting: false,
        enableColumnFilter: false,
      }),
    ],
    [columnHelper, handleCLickCancel]
  );

  useEffect(() => {
    getRents();
  }, [getRents]);

  return (
    <>
      <ModalRentRoomDetails
        {...detailsOb}
        show={showModal}
        toggleShow={toggleShowModal}
      />
      <div className={cx("wrapper")}>
        <div className={cx("gr")}>
          <h5 className={cx("title")}>Request to rent your room</h5>
          {data.length > 0 ? (
            <TableSort columns={columns} data={data} />
          ) : (
            <div className={cx("no-data", "text-center p-3")}>
              You dont have any requests to rent a room
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ManagerRentRoomPage;
