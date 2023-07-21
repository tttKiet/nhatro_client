import styles from "./InfoToDelete.module.scss";
import classNames from "classNames/bind";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { useContext } from "react";
import { ToastContext } from "../../untils/context";
import { roomServices } from "../../services";
import { AiOutlineCheckCircle, AiOutlineDelete } from "react-icons/ai";

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
            <td className="text-break">{values[index]}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

function InfoToDelete({ data, updateData, onHide }) {
  const toast = useContext(ToastContext);

  const shortData = {
    _id: data._id,
    Number: data.Number,
    Size: data.Size,
    "Has Layout": data["Has Layout"],
    Price: data.Price + " VND",
    Description: data.Description,
    Satus: data.Status,
  };

  function ToggleToastConfirm(roomId, images) {
    async function handleDeleteRoom(toastId, roomId, imgsToDelete) {
      toast.dismiss(toastId);
      toast.loading("Deleting...");
      const res = await roomServices.deleteRoom(roomId, imgsToDelete);
      if (res.err === 0) {
        updateData();
        toast.dismiss();
        toast.success("Delete successfully");
        onHide();
      } else {
        toast.error("Error");
      }
    }

    // toggle toast
    toast.success(
      (t) => (
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <p className="m-0">
              Are you sure to <b>delete</b>?
            </p>
            <p className="m-0">
              You <b>can&apos;t</b> restore data.
            </p>
          </div>

          <AiOutlineCheckCircle
            onClick={() => handleDeleteRoom(t.id, roomId, images)}
            style={{
              color: "#0075f5",
              fontSize: "20px",
              marginLeft: "12px",
              cursor: "pointer",
            }}
          />
        </div>
      ),
      {
        icon: (
          <div className="bg-danger p-1 border border-1 rounded shadow">
            <AiOutlineDelete
              style={{
                color: "white",
                fontSize: "22px",
              }}
            />
          </div>
        ),
        duration: 4000,
      }
    );
  }

  return (
    <div className={cx("wrap")}>
      {console.log("Data", data)}
      <div className={cx("wrap-table", "container")}>
        <div>
          <ObjectTable data={shortData}></ObjectTable>
          <button
            type="button"
            onClick={() => ToggleToastConfirm(shortData._id, data.Images)}
            className={cx("btn-delete")}
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
