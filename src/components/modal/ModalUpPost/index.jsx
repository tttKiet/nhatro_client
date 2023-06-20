import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
// scss
import styles from "./ModalUpPost.module.scss";
import classNames from "classNames/bind";
import { useState } from "react";
const cx = classNames.bind(styles);

function ModalUpPost({ show, setShow }) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 5) {
      errors.name = "Must be 5 characters or more";
    }

    if (!values.address) {
      errors.address = "Required";
    } else if (values.address.length < 5) {
      errors.address = "Must be 5 characters or more";
    }

    if (!values.phone) {
      errors.phone = "Please enter your phone number!";
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(values.phone)) {
      errors.phone = "Invalid phone number format!";
    }

    if (!values.electric) {
      errors.electric = "Required";
    }

    if (!values.water) {
      errors.water = "Required";
    }

    if (!values.description) {
      errors.description = "Required";
    }

    if (values.images.length === 0) {
      errors.images = "Required";
    } else if (values.images.length > 8) {
      errors.images = "Please Choose less than 8 photos!";
    }

    return errors;
  };
  return (
    <>
      <Modal
        centered
        show={show}
        onHide={handleClose}
        // backdrop="static"
        // keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpPost;
