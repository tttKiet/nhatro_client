import { useEffect } from "react";
import { useAuth } from "../../../hooks";
// scss
import styles from "./TableReqOwnUser.module.scss";
import classNames from "classNames/bind";
import { userServices } from "../../../services";
const cx = classNames.bind(styles);

function TableReqOwnUser() {
  const [, , user] = useAuth();
  const getReqOwner = async () => {
    try {
      const res = await userServices.getAllReqOwner(user?._id);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getReqOwner();
  }, []);

  return (
    <div className={cx("wrap")}>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">House Name</th>
            <th scope="col">Address</th>
            <th scope="col">Image</th>
            <th scope="col">Created Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row">
              <div>1</div>
            </td>
            <td>
              <div>Mark</div>
            </td>
            <td>
              <div>Otto</div>
            </td>
            <td>
              <div>div</div>
            </td>
            <td>
              <div>Otto</div>
            </td>
            <td>
              <div>mdo</div>
            </td>
          </tr>

          <tr>
            <td scope="row">
              <div>1</div>
            </td>
            <td>
              <div>Mark</div>
            </td>
            <td>
              <div>Otto</div>
            </td>
            <td>
              <div>div</div>
            </td>
            <td>
              <div>Otto</div>
            </td>
            <td>
              <div>mdo</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableReqOwnUser;
