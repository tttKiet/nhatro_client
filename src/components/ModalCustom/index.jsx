import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalCustom({ show, onHide, data, Component, action, _id }) {
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
          {action} with id: {data._id}
        </Modal.Title>
      </Modal.Header>
      <Component data={data} id={data?._id} _id={_id}></Component>
      <Modal.Footer>
        <Button variant="warning" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalCustom.propTypes = {
  Component: PropTypes.func,
  data: PropTypes.object,
  show: PropTypes.bool,
  onHide: PropTypes.func,
  action: PropTypes.string,
  _id: PropTypes.string,
};

export default ModalCustom;
