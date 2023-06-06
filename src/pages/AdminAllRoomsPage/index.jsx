import styles from "./AdminAllRoomsPage.module.scss";
import classNames from "classNames/bind";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks";
import roomServices from "../../services/roomServices";
import boardHouseServices from "../../services/boardHouseServices";
import TableSort from "../../components/TableSort";
import ModalCustom from "../../components/ModalCustom";
import RoomForm from "../../components/RoomForm";
import toast, { Toaster } from "react-hot-toast";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import InfoToDelete from "../../components/InfoToDelete";

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
  const [dataRoomToDelete, setDataRoomToDelete] = useState([]);

  async function handleGetBoardHouseById(adminId) {
    const res = await boardHouseServices.getBoardHouseById(adminId);
    if (res.err === 0) {
      setBoardHouse(
        res.data.map((boardHouse) => ({
          boardHouseId: boardHouse._id,
          boardHouseName: boardHouse.name,
        }))
      );
    }
  }

  async function handleGetRoom(adminID) {
    if (adminData.type === "admin") {
      const res = await roomServices.getAllRoomsByAdminId(adminID);
      if (res.err === 0) {
        // console.log("res ddata", res.data);
        setDataRoom(res.data);
      }
    }
  }

  const handleUpdateData = async () => {
    const res = await roomServices.getAllRoomsByAdminId(adminData._id);
    if (res.err === 0) {
      console.log("res ddata", res.data);
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
        _id: room._id,
        Number: room.number,
        Size: room.size,
        "Has Layout": `${!room.isLayout ? "No" : "Yes"}`,
        Price: `${formatNumber(room.price)} VND`,
        Description: room.description,
        Status: "Loading...",
      }))
    );
    toast.success("Changed Board House");
    setIsChanged(e.target.value);
  }

  function handleOpenModalDelete(data) {
    setShowModalDelete(true);
    setDataRoomToDelete(data);
  }

  // console.log("rooms", rooms);
  console.log("boardHouse", boardHouse);

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
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Description", {
        cell: (info) => (
          // <div className={cx("text-description")}>{info.getValue()}</div>

          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{info.getValue()}</Tooltip>}
          >
            <div className={cx("text-description")}>{info.getValue()}</div>
          </OverlayTrigger>
        ),
      }),
      columnHelper.accessor("Status", {
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("Action", {
        cell: (info) => {
          // const _id = info.row.original._id;
          // console.log("id", info.row.original);
          return (
            <div className="d-flex gap-2">
              <svg
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
                onClick={() => handleOpenModalDelete(info.row.original)}
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
    handleGetBoardHouseById(adminData._id);
    handleGetRoom(adminData._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataRoom?.length > 0 && isChanged?.length == 0) {
      const filterDataRoom = dataRoom.filter(
        (item) => item.boardHouseId === boardHouse[0]?.boardHouseId
      );
      setRooms(
        filterDataRoom[0]?.rooms.map((room) => ({
          _id: room._id,
          Number: room.number,
          Size: room.size,
          "Has Layout": `${!room.isLayout ? "No" : "Yes"}`,
          Price: `${formatNumber(room.price)} VND`,
          Description: room.description,
          Status: "Loading...",
        }))
      );
      setIsChanged(boardHouse[0]?.boardHouseId);
    } else if (isChanged?.length > 0) {
      const filterDataRoom = dataRoom.filter(
        (item) => item.boardHouseId === isChanged
      );
      setRooms(
        filterDataRoom[0]?.rooms.map((room) => ({
          _id: room._id,
          Number: room.number,
          Size: room.size,
          "Has Layout": `${!room.isLayout ? "No" : "Yes"}`,
          Price: `${formatNumber(room.price)} VND`,
          Description: room.description,
          Status: "Loading...",
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRoom, boardHouse, isChanged]);

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
        <TableSort data={rooms} columns={columns}></TableSort>
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
        data={dataRoomToDelete}
        Component={InfoToDelete}
        action="Delete room: "
        _id={""}
        updateData={handleUpdateData}
      ></ModalCustom>
      <Toaster></Toaster>
    </div>
  );
}

export default AdminAllRoomsPage;
