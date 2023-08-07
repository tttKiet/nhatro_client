import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { FormUpPost } from "../../forms";
import { memo } from "react";
// scss
import styles from "./ModalUpPost.module.scss";
import classNames from "classNames/bind";
const cx = classNames.bind(styles);

function ModalUp({ show, setShow, mergePostsNew, postInfo }) {
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal
        size="lg"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName={cx("wrap")}
      >
        <Modal.Header closeButton>
          <Modal.Title>{postInfo ? "Edit Post" : "Up Post"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pe-1">
          <FormUpPost
            mergePostsNew={mergePostsNew}
            handleClose={handleClose}
            postInfo={postInfo}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

ModalUp.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  setPosts: PropTypes.func,
  mergePostsNew: PropTypes.func,
};

const ModalUpPost = memo(ModalUp);

export default ModalUpPost;
