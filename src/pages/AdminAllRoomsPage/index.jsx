import styles from "./AdminAllRoomsPage.module.scss";
import classNames from "classNames/bind";
import { createColumnHelper } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks";
import roomServices from "../../services/roomServices";
import boardHouseServices from "../../services/boardHouseServices";
import TableSort from "../../components/TableSort";
import ModalCustom from "../../components/ModalCustom";
import RoomForm from "../../components/RoomForm";
import InfoToDelete from "../../components/InfoToDelete";
import { ClockLoader, PulseLoader } from "react-spinners";

import { Tooltip } from "react-tooltip";

const cx = classNames.bind(styles);

function AdminAllRoomsPage() {
  const columnHelper = createColumnHelper();
  const [rooms, setRooms] = useState([]);
  const [, , adminData] = useAuth();
  const [boardHouse, setBoardHouse] = useState("");
  const [dataRoom, setDataRoom] = useState([]);
  const [isChanged, setIsChanged] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataRoomToEdit, setDataRoomToEdit] = useState([]);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetBoardHouseById = useCallback(async () => {
    const res = await boardHouseServices.getBoardHouseById(adminData._id);

    if (res.err === 0) {
      setBoardHouse(
        res.data.map((boardHouse) => ({
          boardHouseId: boardHouse._id,
          boardHouseName: boardHouse.name,
        }))
      );
      setIsLoading(false);
    }
  }, [adminData._id]);

  const handleGetRoom = useCallback(async () => {
    const res = await roomServices.getAllRoomsByAdminId(adminData._id);
    setIsLoading(true);
    if (res.err === 0) {
      setDataRoom(res.data);
      setIsLoading(false);
    }
  }, [adminData._id]);

  const handleUpdateData = async () => {
    const res = await roomServices.getAllRoomsByAdminId(adminData._id);
    if (res.err === 0) {
      setDataRoom(res.data);
    }
  };

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function handleSelectChange(e) {
    const filterDataRoom = dataRoom.filter(
      (boardHouse) => boardHouse.boardHouseId === e.target.value
    );
    // console.log("filterDataRoom", filterDataRoom);
    setRooms(
      filterDataRoom[0].rooms?.map((room) => ({
        _id: room?._id,
        Number: room?.number,
        Size: room?.size,
        "Has Layout": `${!room?.isLayout ? "No" : "Yes"}`,
        Price: room?.price,
        Description: room?.description,
        Status: "Loading...",
        Images: room?.images,
        boardHouseId: e.target.value,
        originalImage: room?.images,
        options: room?.options,
      }))
    );

    setIsChanged(e.target.value);
  }

  function handleOpenModalEdit(data, action) {
    if (action === "delete") {
      setShowModalDelete(true);
    } else if (action === "update") {
      setShowModalUpdate(true);
    }
    setDataRoomToEdit(data);
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor("Number", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Size", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Has Layout", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Price", {
        cell: (info) => <div>{formatNumber(info.getValue())} VND</div>,
      }),
      // columnHelper.accessor("Description", {
      //   cell: (info) => (
      //     <OverlayTrigger
      //       placement="top"
      //       overlay={<Tooltip>{info.getValue()}</Tooltip>}
      //     >
      //       <div className={cx("text-description")}>{info.getValue()}</div>
      //     </OverlayTrigger>
      //   ),
      // }),
      columnHelper.accessor("Description", {
        cell: (info) => (
          <>
            <Tooltip id="my-tooltip" />
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content={info.getValue()}
            >
              <div className={cx("text-description")}>{info.getValue()}</div>
            </a>
          </>
        ),
      }),
      columnHelper.accessor("Status", {
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("Action", {
        cell: (info) => {
          return (
            <div className="d-flex gap-2">
              <svg
                onClick={() => handleOpenModalEdit(info.row.original, "update")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                style={{ color: "#0079FF" }}
                className={cx("icon-action")}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>

              <svg
                onClick={() => handleOpenModalEdit(info.row.original, "delete")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                style={{ color: "#EB5353" }}
                className={cx("icon-action")}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          );
        },
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    setIsLoading(true);
    handleGetBoardHouseById();
  }, [handleGetBoardHouseById]);

  useEffect(() => {
    setIsLoading(true);
    handleGetRoom();
  }, [handleGetRoom]);

  useEffect(() => {
    if (dataRoom?.length > 0 && isChanged?.length == 0) {
      const filterDataRoom = dataRoom.filter(
        (item) => item.boardHouseId === boardHouse[0]?.boardHouseId
      );
      setRooms(
        filterDataRoom[0]?.rooms.map((room) => ({
          _id: room?._id,
          Number: room?.number,
          Size: room?.size,
          "Has Layout": `${!room?.isLayout ? "No" : "Yes"}`,
          Price: room?.price,
          Description: room?.description,
          Status: "Loading...",
          Images: room?.images,
          boardHouseId: boardHouse[0]?.boardHouseId,
          originalImage: room?.images,
          options: room?.options,
        }))
      );
      setIsChanged(boardHouse[0]?.boardHouseId);
    } else if (isChanged?.length > 0) {
      const filterDataRoom = dataRoom.filter(
        (item) => item.boardHouseId === isChanged
      );
      setRooms(
        filterDataRoom[0]?.rooms.map((room) => ({
          _id: room?._id,
          Number: room?.number,
          Size: room?.size,
          "Has Layout": `${!room?.isLayout ? "No" : "Yes"}`,
          Price: room?.price,
          Description: room?.description,
          Status: "Loading...",
          Images: room?.images,
          boardHouseId: isChanged,
          originalImage: room?.images,
          options: room?.options,
        }))
      );
    }
  }, [boardHouse, dataRoom, isChanged]);

  if (isLoading) {
    return (
      <div
        className={cx(
          "container d-flex justify-content-center h-75 align-items-center"
        )}
        style={{ height: "90vh" }}
      >
        <PulseLoader color="rgb(120, 193, 243)" margin={6} size={15} />
      </div>
    );
  }

  return (
    <div className={cx("wrap")}>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-primary ms-1"
      >
        Create a new room
      </button>

      <div className="row mt-3 ms-1 ">
        <div
          style={{ width: "250px" }}
          className="p-2 rounded-3 border border-primary-subtle shadow border-2"
        >
          <p className="fs-m">Select your board house here: </p>

          <select
            className="form-select"
            aria-label="Default select example"
            defaultValue={
              boardHouse?.length > 0 ? boardHouse[0]?.boardHouseId : ""
            }
            onChange={handleSelectChange}
          >
            {boardHouse &&
              boardHouse.map((bh, index) => (
                <option key={index} value={bh.boardHouseId}>
                  {bh.boardHouseName}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="row mt-2">
        {rooms && rooms?.length === 0 ? (
          <p className=" mt-5 w-25 m-auto text-center rounded text-bg-primary p-2 shadow">
            You don&apos;t have any rooms, let&apos;s create it!
          </p>
        ) : (
          <TableSort data={rooms} columns={columns}></TableSort>
        )}
      </div>

      {/* Modal create a new room */}
      <ModalCustom
        show={showModal}
        onHide={() => setShowModal(false)}
        data={boardHouse}
        Component={RoomForm}
        action="Create a new room"
        _id={""}
        updateData={handleUpdateData}
      ></ModalCustom>

      {/* Modal delete a room */}
      <ModalCustom
        show={showModalDelete}
        onHide={() => setShowModalDelete(false)}
        data={dataRoomToEdit}
        Component={InfoToDelete}
        action="Delete room: "
        _id={""}
        updateData={handleUpdateData}
      ></ModalCustom>

      {/* Modal edit a room */}
      <ModalCustom
        show={showModalUpdate}
        onHide={() => setShowModalUpdate(false)}
        data={boardHouse}
        dataExisted={dataRoomToEdit}
        Component={RoomForm}
        action="Update room: "
        _id={""}
        isUpdate={true}
        updateData={handleUpdateData}
      ></ModalCustom>
    </div>
  );
}

export default AdminAllRoomsPage;
