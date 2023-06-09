import { Link } from "react-router-dom";
import styles from "./RootAccount.module.scss";
import classNames from "classNames/bind";
import { useEffect, useMemo, useState } from "react";
import userServices from "../../services/userServices";
import Swal from "sweetalert2";
import { createColumnHelper } from "@tanstack/react-table";
import TableSort from "../../components/TableSort";

const cx = classNames.bind(styles);

function RootAccount() {
  const [users, setUsers] = useState([]);
  const columnHelper = createColumnHelper();

  const getUsers = async () => {
    const res = await userServices.getAllUsers();
    if (res.err === 0) {
      setUsers(
        res.dataUser.map((user, index) => ({
          "#": index + 1,
          _id: user._id,
          "Full name": user.fullName,
          Email: user.email,
          Phone: user.phone,
        }))
      );
    }
  };

  const handleClickDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      showConfirmButton: true,
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      text: `Bạn có chắc muốn xóa tài khoản ${_id}?`,
      confirmButtonText: "Đúng, xóa nó",
      reverseButtons: true,
      confirmButtonColor: "#d55",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await userServices.deleteUser(_id);
        if (res.err === 0) {
          Swal.fire("Đã xóa!", "Root deleted account!", "success");
          await getUsers();
        } else {
          Swal.fire(
            "Có lỗi xảy ra!",
            "Id người dùng không tìm thấy hay sai cú pháp!",
            "error"
          );
        }
      }
    });
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("#", {
        cell: (info) => info.getValue(),
        enableSorting: false,
        enableColumnFilter: false,
      }),
      columnHelper.accessor("Full name", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Email", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Phone", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Action", {
        cell: (info) => {
          const _id = info.row.original._id;
          return (
            <div className="d-flex gap-3">
              <Link className={cx("btn")} to={`/root/user/account/edit/${_id}`}>
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
                Edit
              </Link>

              <button
                className={cx("btn", "btn-danger")}
                onClick={() => handleClickDelete(_id)}
              >
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
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                Delete
              </button>
            </div>
          );
        },
      }),
    ],
    []
  );

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={cx("wrap")}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Accounts
          </li>
        </ol>
      </nav>
      <Link
        to={"/root/user/accounts/create"}
        className={cx("btn btn-outline-primary", "button")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={cx("svg")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Thêm tài khoản
      </Link>

      <div className={cx("cus")}>
        <TableSort data={users} columns={columns} />

        {/* <table className={cx("table")}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Họ & Tên</th>
              <th scope="col">Email</th>
              <th scope="col">Mật khẩu:</th>
              <th scope="col">Phone</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((user, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.phone}</td>
                    <td>
                      <div className="d-flex gap-3">
                        <Link
                          className={cx("btn")}
                          to={`/root/user/account/edit/${user._id}`}
                        >
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
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                          </svg>
                          Edit
                        </Link>

                        <button
                          className={cx("btn", "btn-danger")}
                          onClick={() => handleClickDelete(user._id)}
                        >
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
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table> */}
      </div>
    </div>
  );
}

export default RootAccount;
