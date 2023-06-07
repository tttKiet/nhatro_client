import { useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import styles from "./InfoAccountPermission.module.scss";
import classNames from "classNames/bind";
import userServices from "../../services/userServices";
import TableSort from "../TableSort";
import FrameVerified from "../FrameVerified";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);
function InfoAccountPermission() {
  const columnHelper = createColumnHelper();

  const [users, setUsers] = useState([]);

  function handleClickBtnAction(_id, email, actions = "up") {
    Swal.fire({
      title: "Are you sure?",
      showConfirmButton: true,
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      text:
        actions !== "up"
          ? `Bạn có chắc muốn xóa quyền admin cho ${email}?`
          : `Bạn có chắc muốn thăng quyền admin cho ${email}?`,
      confirmButtonText:
        actions !== "up" ? "Đúng, xóa nó" : "Đúng, thăng quyền",
      reverseButtons: true,
      confirmButtonColor: "#d55",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await userServices.psermissionsAccount(_id);
        if (actions !== "up") {
          if (res.err === 0) {
            Swal.fire(
              "Đã xóa quyền admin!",
              "Root deleted admin permissons!",
              "success"
            );
            await fetchInfoUsers();
          } else {
            Swal.fire(
              "Có lỗi xảy ra!",
              "Id người dùng không tìm thấy hay sai cú pháp!",
              "error"
            );
          }
        } else {
          if (res.err === 0) {
            Swal.fire(
              "Tài khoản này có quyền admin!",
              "Root Upgrade admin permissons!",
              "success"
            );
            await fetchInfoUsers();
          } else {
            Swal.fire(
              "Có lỗi xảy ra!",
              "Id người dùng không tìm thấy hay sai cú pháp!",
              "error"
            );
          }
        }
      }
    });
  }

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
      columnHelper.accessor("Actions", {
        cell: (info) => {
          const isVerified = info.row.original.emailVerified;
          const _id = info.row.original.id;
          const type = info.row.original.type;
          const email = info.row.original.email;
          return (
            <div className={cx("permission_for")}>
              {isVerified && type === "admin" ? (
                <button
                  className={cx("btn")}
                  onClick={() => handleClickBtnAction(_id, email, "down")}
                >
                  <span>Demoted admin</span>
                  <span className={cx("icon")}>
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
                        d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>
              ) : (
                <>
                  {type === "user" && isVerified && (
                    <button
                      className={cx("btn")}
                      onClick={() => handleClickBtnAction(_id, email)}
                    >
                      <span>Upgrade to admin</span>
                      <span className={cx("icon")}>
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
                            d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      </span>
                    </button>
                  )}

                  {type === "user" && !isVerified && (
                    <button disabled className={cx("btn")}>
                      <span> Upgrade to admin</span>
                      <span className={cx("icon")}>
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
                            d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>
          );
        },
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
            id: user._id,
            Number: index + 1,
            email: user.email,
            Email: (
              <span className="d-flex align-items-center">
                {user.email}
                {user.emailVerified && <FrameVerified />}
              </span>
            ),
            Type: (
              <span
                className={cx("label_type", {
                  admin: user.type === "admin",
                })}
              >
                {user.type === "user" ? (
                  <>
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
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    {user.type}
                  </>
                ) : (
                  <>
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
                        d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                      />
                    </svg>

                    {user.type}
                  </>
                )}
              </span>
            ),
            type: user.type,
            emailVerified: user.emailVerified,
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
