import styles from "./ModalCustom.module.scss";
import classNames from "classNames/bind";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ModalCustom({ ...props }) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-l" id="contained-modal-title-vcenter">
          Edit board house with id: {props.room._id}
        </Modal.Title>
      </Modal.Header>
      <props.component room={props.room} id={props.room._id}></props.component>
      {/* {props.component} */}
      <Modal.Footer>
        <Button variant="warning" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalCustom.propTypes = {
  component: PropTypes.func,
  room: PropTypes.object,
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default ModalCustom;
