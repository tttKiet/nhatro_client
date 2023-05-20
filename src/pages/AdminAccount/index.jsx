import { Link } from "react-router-dom";
import styles from "./AdminAccount.module.scss";
import classNames from "classNames/bind";
import { useEffect } from "react";
import { userServices } from "../../../../server/src/services";
const cx = classNames.bind(styles);

function AdminAccount() {
  const getUsers = async () => {
    const res = await userServices.getAllUsers();
    console.log(res);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className={cx("wrap")}>
      <Link
        to={"/admin/user/accounts/create"}
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fullname</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Type</th>
            <th scope="col">Address</th>
            <th scope="col">SDT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminAccount;
