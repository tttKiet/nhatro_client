import styles from "./RequestFromAccount.module.scss";
import classNames from "classNames/bind";
import useAuth from "../../hooks/useAuth";
import { useEffect, useMemo, useState } from "react";
import { reqRoomOwnerServices } from "../../services";
import { createColumnHelper } from "@tanstack/react-table";
import TableSort from "../TableSort";

const cx = classNames.bind(styles);
function RequestFromAccount() {
  const [, , rootData] = useAuth();
  const [allReqs, setAllReqs] = useState([]);
  const [data, setData] = useState([]);
  const columnHelper = createColumnHelper();

  async function getAllReqs(rootId) {
    const res = await reqRoomOwnerServices.getAllRequests(rootId);
    if (res.err === 0) {
      setAllReqs(res.data);
    }
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor("Number", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Information user", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Information board house", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Images", {
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
      //     return (
      //       <div className="d-flex gap-2">
      //         <svg
      //           onClick={() => handleOpenModalEdit(info.row.original, "update")}
      //           xmlns="http://www.w3.org/2000/svg"
      //           fill="none"
      //           viewBox="0 0 24 24"
      //           strokeWidth={2}
      //           stroke="currentColor"
      //           style={{ color: "#0079FF" }}
      //           className={cx("icon-action")}
      //         >
      //           <path
      //             strokeLinecap="round"
      //             strokeLinejoin="round"
      //             d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      //           />
      //         </svg>

      //         <svg
      //           onClick={() => handleOpenModalEdit(info.row.original, "delete")}
      //           xmlns="http://www.w3.org/2000/svg"
      //           fill="none"
      //           viewBox="0 0 24 24"
      //           strokeWidth={2}
      //           stroke="currentColor"
      //           style={{ color: "#EB5353" }}
      //           className={cx("icon-action")}
      //         >
      //           <path
      //             strokeLinecap="round"
      //             strokeLinejoin="round"
      //             d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      //           />
      //         </svg>
      //       </div>
      //     );
      //   },
      // }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    getAllReqs(rootData._id);
  }, []);

  return (
    <div className={cx("wrap")}>
      RequestFromAccount
      {console.log(allReqs)}
      <div className="row mt-2">
        <TableSort data={data} columns={columns}></TableSort>
      </div>
    </div>
  );
}

export default RequestFromAccount;
