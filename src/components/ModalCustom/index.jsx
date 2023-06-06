import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalCustom({
  show,
  onHide,
  data,
  Component,
  action,
  _id,
  updateData,
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
      <Modal.Header closeButton>
        <Modal.Title className="fs-l" id="contained-modal-title-vcenter">
          {action}: {data?._id}
        </Modal.Title>
      </Modal.Header>
      <Component
        data={data}
        id={data?._id}
        _id={_id}
        updateData={updateData}
        onHide={onHide}
      ></Component>
      <Modal.Footer>
        <Button variant="warning" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalCustom.propTypes = {
  Component: PropTypes.func,
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  show: PropTypes.bool,
  onHide: PropTypes.func,
  action: PropTypes.string,
  _id: PropTypes.string,
  updateData: PropTypes.func,
};

export default ModalCustom;
