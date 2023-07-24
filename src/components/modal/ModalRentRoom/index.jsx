import { Button, Modal } from "react-bootstrap";

function ModalRentRoom({ show, toggleShow }) {
  return (
    <Modal
      centered
      show={show}
      onHide={toggleShow}
      backdrop="static"
      keyboard={false}
      // dialogClassName={cx("wrap")}
    >
      <Modal.Header closeButton>Bill rent room</Modal.Header>
      <Modal.Body className="pe-1">Thue tro</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" type="button" onClick={toggleShow}>
          Close
        </Button>
        <Button variant="primary" type="button" onClick={toggleShow}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalRentRoom;
