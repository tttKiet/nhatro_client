import { useEffect, useMemo, useState } from "react";
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
import rentServices from "../../services/rentServices";
import ModalRentRoomDetails from "../../components/modal/ModalRentRoomDetails";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);

function ManagerRentRoomPage() {
  const columnHelper = createColumnHelper();

  const [, , user] = useAuth();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function toggleShowModal() {
    setShowModal((s) => !s);
  }

  async function handleCancelRent(_idRent) {
    const tetss = new Promise((resolve) => setTimeout(resolve, 2000));
    const toastId = toast.loading("is canceling...");
    tetss.then(() =>
      toast.update(toastId, {
        isLoading: false,
        render: "Cancelled!",
        autoClose: 2000,
      })
    );
  }

  function handleCLickCancel(_idRent) {
    toast.clearWaitingQueue();
    toast.error(
      <div className={cx("wrap-toast")}>
        <p className="m-0">
          Are you sure to <b>delete</b>?
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
  }

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
          <span
            className={cx("status", {
              rented: info.getValue() != 0,
            })}
          >
            {info.getValue() == 0 ? "REQUEST" : "RENTED"}
          </span>
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
                  onClick={toggleShowModal}
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
    [columnHelper]
  );

  useEffect(() => {
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
          }));
        });
      }
    });
  }, [user._id]);

  return (
    <>
      <ModalRentRoomDetails show={showModal} toggleShow={toggleShowModal} />
      <div className={cx("wrapper")}>
        <div className={cx("gr")}>
          {console.log(data)}
          <h5 className={cx("title")}>Request to rent your room</h5>

          <TableSort columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}

export default ManagerRentRoomPage;
