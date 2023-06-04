import styles from "./AdminAllRoomsPage.module.scss";
import classNames from "classNames/bind";
import { createColumnHelper, functionalUpdate } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks";
import roomServices from "../../services/roomServices";
import boardHouseServices from "../../services/boardHouseServices";
import TableSort from "../../components/TableSort";

const cx = classNames.bind(styles);

function AdminAllRoomsPage() {
  const columnHelper = createColumnHelper();
  const [rooms, setRooms] = useState([]);
  const [, , adminData] = useAuth();
  const [boardHouse, setBoardHouse] = useState("");
  const [dataRoom, setDataRoom] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

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
        console.log("res ddata", res.data);

        setDataRoom(res.data);
      }
    }
  }

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function handleSelectChange(e) {
    const filterDataRoom = dataRoom.filter(
      (boardHouse) => boardHouse.boardHouseId === e.target.value
    );
    // console.log("filterDataRoom", filterDataRoom);
    setRooms(
      filterDataRoom[0].rooms.map((room) => ({
        Number: room.number,
        Size: room.size,
        "Has Layout": `${!room.isLayout ? "No" : "Yes"}`,
        Price: `${formatNumber(room.price)} VND`,
        Description: room.description,
        Status: "Loading...",
      }))
    );
  }

  // console.log("rooms", rooms);
  // console.log("boardHouse", boardHouse);

  const columns = useMemo(
    () => [
      columnHelper.accessor("Number", {
        cell: (info) => info.getValue(),
        // enableSorting: false,
        // enableColumnFilter: false,
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
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Status", {
        cell: (info) => info.getValue(),
      }),

      // columnHelper.accessor("Action", {
      //   cell: (info) => {
      //     const _id = info.row.original._id;
      //     return (
      //       <div className="d-flex gap-3">
      //         <Link className={cx("btn")} to={`/root/user/account/edit/${_id}`}>
      //           <svg
      //             xmlns="http://www.w3.org/2000/svg"
      //             fill="none"
      //             viewBox="0 0 24 24"
      //             strokeWidth={1.5}
      //             stroke="currentColor"
      //             className="w-6 h-6"
      //           >
      //             <path
      //               strokeLinecap="round"
      //               strokeLinejoin="round"
      //               d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
      //             />
      //           </svg>
      //           Edit
      //         </Link>

      //         <button
      //           className={cx("btn", "btn-danger")}
      //           onClick={() => handleClickDelete(_id)}
      //         >
      //           <svg
      //             xmlns="http://www.w3.org/2000/svg"
      //             fill="none"
      //             viewBox="0 0 24 24"
      //             strokeWidth={1.5}
      //             stroke="currentColor"
      //             className="w-6 h-6"
      //           >
      //             <path
      //               strokeLinecap="round"
      //               strokeLinejoin="round"
      //               d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      //             />
      //           </svg>
      //           Delete
      //         </button>
      //       </div>
      //     );
      //   },
      // }),
    ],
    []
  );

  useEffect(() => {
    handleGetRoom(adminData._id);
    handleGetBoardHouseById(adminData._id);
  }, []);

  useEffect(() => {
    if (dataRoom.length > 0 && !isChanged) {
      const filterDataRoom = dataRoom.filter(
        (item) => item.boardHouseId === boardHouse[0].boardHouseId
      );
      setRooms(
        filterDataRoom[0].rooms.map((room) => ({
          Number: room.number,
          Size: room.size,
          "Has Layout": `${!room.isLayout ? "No" : "Yes"}`,
          Price: `${formatNumber(room.price)} VND`,
          Description: room.description,
          Status: "Loading...",
        }))
      );
      setIsChanged(true);
    }
  }, [dataRoom, boardHouse, isChanged]);

  return (
    <div className={cx("wrap")}>
      <button className="btn btn-primary ms-1">Create a new room</button>

      <div className="row mt-3 ms-1 ">
        <div
          style={{ width: "20%" }}
          className="p-2 rounded-3 border border-primary-subtle shadow border-2"
        >
          <p className="fs-m">Select your board house here: </p>

          <select
            className="form-select"
            aria-label="Default select example"
            defaultValue={
              boardHouse.length > 0 ? boardHouse[0]?.boardHouseId : ""
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
    </div>
  );
}

export default AdminAllRoomsPage;
