import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { FormUpPost } from "../../forms";
import { Button } from "react-bootstrap";
// scss
import styles from "./ModalUpPost.module.scss";
import classNames from "classNames/bind";
const cx = classNames.bind(styles);

function ModalUpPost({ show, setShow }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName={cx("wrap")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Up Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pe-1">
          <FormUpPost />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Up here</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ModalUpPost.propTypes = { show: PropTypes.bool, setShow: PropTypes.func };

export default ModalUpPost;
