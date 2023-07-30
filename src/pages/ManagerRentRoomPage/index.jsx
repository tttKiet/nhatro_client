import { useMemo } from "react";
import TableSort from "../../components/TableSort";
import styles from "./ManagerRentRoomPage.module.scss";
import classNames from "classNames/bind";
import { createColumnHelper } from "@tanstack/react-table";
const cx = classNames.bind(styles);

function ManagerRentRoomPage() {
  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("Number", {
        cell: (info) => info.getValue(),
        enableSorting: false,
        enableColumnFilter: false,
      }),
      columnHelper.accessor("Name", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Room", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Owner", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Status", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Action", {
        cell: (info) => info.getValue(),
      }),
    ],
    [columnHelper]
  );

  const data = [
    {
      Number: 1,
      Name: "Number",
    },
    {
      Number: 2,
      Name: "Number",
    },
    {
      Number: 1,
      Name: "Number",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("gr")}>
        <h5 className={cx("title")}>Request to rent your room</h5>

        <TableSort columns={columns} data={data} />
      </div>
    </div>
  );
}

export default ManagerRentRoomPage;
