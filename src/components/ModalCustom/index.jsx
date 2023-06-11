import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-hot-toast";
import { useState } from "react";

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
}) {
  function handleCloseModal() {
    if (updateData) {
      updateData();
    }
    onHide();
  }

  const [isSubmitted, setIsSubmitted] = useState(true);

  function checkSubmit(isSubmitted) {
    if (isSubmitted === false) {
      toast.error("You need submit to exit");
    } else {
      onHide();
    }
  }

  return (
    <Modal
      show={show}
      // onHide={onHide}
      onHide={() => checkSubmit(isSubmitted)}
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
        dataExisted={dataExisted}
        isUpdate={isUpdate}
        onDisableClose={(action) => setIsSubmitted(action)}
      ></Component>
      <Modal.Footer>
        <Button
          variant="warning"
          disabled={isSubmitted === false ? true : false}
          onClick={handleCloseModal}
        >
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
};

export default ModalCustom;
