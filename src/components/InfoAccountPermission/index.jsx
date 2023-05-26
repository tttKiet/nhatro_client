import { useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import styles from "./InfoAccountPermission.module.scss";
import classNames from "classNames/bind";
import userServices from "../../services/userServices";
import TableSort from "../TableSort";

const cx = classNames.bind(styles);
function InfoAccountPermission() {
  const columnHelper = createColumnHelper();

  const [users, setUsers] = useState([]);
  const columns = useMemo(
    () => [
      columnHelper.accessor("Number", {
        cell: (info) => info.getValue(),
        enableSorting: false,
        enableColumnFilter: false,
      }),
      columnHelper.accessor("Email", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Type", {
        cell: (info) => info.getValue(),
        enableSorting: false,
        enableColumnFilter: false,
      }),
    ],
    []
  );

  const fetchInfoUsers = async () => {
    try {
      const res = await userServices.getAllUsers(users);
      if (res.err === 0) {
        setUsers(
          res.dataUser.map((user, index) => ({
            id: user.id,
            Number: index + 1,
            Email: user.email,
            Type: (
              <span
                className={cx("label_type", {
                  admin: user.type === "admin",
                })}
              >
                {user.type === "admin" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}

                {user.type}
              </span>
            ),
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfoUsers();
  }, []);

  return (
    <div className={cx("wrap")}>
      <TableSort columns={columns} data={users} />
    </div>
  );
}

export default InfoAccountPermission;
