import styles from "./InfoToDelete.module.scss";
import classNames from "classNames/bind";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { useContext } from "react";
import { ToastContext } from "../../untils/context";
import { roomServices } from "../../services";

const cx = classNames.bind(styles);

const ObjectTable = ({ data }) => {
  const keys = Object.keys(data); // Lấy danh sách các khóa từ đối tượng
  const values = Object.values(data); // Lấy danh sách các giá trị từ đối tượng

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {keys.map((key, index) => (
          <tr key={index}>
            <td>{key}</td>
            <td>{values[index]}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

function InfoToDelete({ data, updateData, onHide }) {
  const toast = useContext(ToastContext);

  async function handleDeleteRoom(id) {
    const res = await roomServices.deleteRoom(id);
    if (res.err === 0) {
      updateData();
      toast.success("Delete successfully");
      onHide();
    } else {
      toast.error("Error");
    }
  }

  return (
    <div className={cx("wrap")}>
      <div className={cx("wrap-table", "container")}>
        <div>
          <ObjectTable data={data}></ObjectTable>
          <button
            type="button"
            onClick={() => handleDeleteRoom(data._id)}
            className="btn btn-danger mb-2"
          >
            Delete now
          </button>
        </div>
      </div>
    </div>
  );
}

InfoToDelete.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  updateData: PropTypes.func,
  onHide: PropTypes.func,
};

ObjectTable.propTypes = {
  data: PropTypes.object,
};

export default InfoToDelete;
