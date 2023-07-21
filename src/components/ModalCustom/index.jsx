import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import classNames from "classNames/bind";
import styles from "./ModalCustom.module.scss";
const cx = classNames.bind(styles);

function ModalCustom({
  show,
  onHide,
  data,
  Component,
  action,
  _id,
  updateData,
  dataExisted,
  isUpdate,
  img,
}) {
  function handleCloseModal() {
    if (updateData) {
      updateData();
    }
    onHide();
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title className="fs-l" id="contained-modal-title-vcenter">
          {action}: {data?._id}
        </Modal.Title>
      </Modal.Header>
      <Component
        src={img}
        data={data}
        id={data?._id}
        _id={_id}
        updateData={updateData}
        onHide={onHide}
        dataExisted={dataExisted}
        isUpdate={isUpdate}
      ></Component>
      <Modal.Footer>
        <button className={cx("icon-close")} onClick={handleCloseModal}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

ModalCustom.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
    PropTypes.func,
  ]),
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  dataExisted: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  show: PropTypes.bool,
  onHide: PropTypes.func,
  action: PropTypes.string,
  _id: PropTypes.string,
  updateData: PropTypes.func,
  isUpdate: PropTypes.bool,
  img: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

export default ModalCustom;
