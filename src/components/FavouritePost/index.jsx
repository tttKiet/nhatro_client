import styles from "./FavouritePost.module.scss";
import classNames from "classNames/bind";
import { Image } from "react-bootstrap";
import {
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import moment from "moment";
import { useContext } from "react";
import { ToastContext } from "../../untils/context";
import { useAuth } from "../../hooks";
import PropTypes from "prop-types";
import { favouritePostServices } from "../../services";

const cx = classNames.bind(styles);
function FavouritePost({ post, getFvPost }) {
  const toast = useContext(ToastContext);
  const [, , user] = useAuth();

  // Confirm and remove favourite post
  function handleToggleConfirm(userId, fvPostId) {
    // remove favourite post
    async function handleRemove(tId) {
      try {
        const res = await favouritePostServices.removeFavouritePost(
          userId,
          fvPostId
        );
        if (res.err === 0) {
          getFvPost();
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
        toast.dismiss(tId);
      } catch (error) {
        console.log(error);
      }
    }

    // toast confirm
    toast.success(
      (t) => (
        <div className="d-flex justify-content-center align-items-center">
          <p className="m-0">
            Are you sure to <b>remove</b>?
          </p>
          <AiOutlineCheckCircle
            onClick={() => handleRemove(t.id)}
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
      }
    );
  }

  // View details
  function handleViewDetails() {
    toast.success("Coming Soon!");
  }

  return (
    <div className={cx("wrap")}>
      <div className={cx("favourite-post", "shadow-sm mb-3")}>
        <div className={cx("wrap-img")}>
          <Image
            className={cx("img-favourite-post", "shadow-sm")}
            src={
              post.postId?.images.length > 0
                ? post.postId?.images[0]
                : "https://img.freepik.com/free-vector/gradient-blur-pink-blue-abstract-background_53876-117324.jpg?w=1060&t=st=1688647878~exp=1688648478~hmac=6de2de4d3234eae54e09d5f2c17ede78039b68ac838a57673e07be8f20dd0cee"
            }
          />
        </div>
        <div className="flex-grow-1 ps-3">
          <div className={cx("content-post")}>
            <p className="fs-l fw-medium mb-0">{post.postId?.content}</p>
            <p className="fs-s">{post.postId?.hashTag}</p>
            <p className="fs-s fst-italic fw-light">
              Was saved from <b>{post.postId?.user?.fullName} </b>
              in {moment(post.createdAt).startOf("minutes").fromNow()}
            </p>
          </div>

          {/* Action */}
          <div>
            <button
              onClick={() => handleViewDetails()}
              className={cx("btn-action", "bg-primary shadow-sm")}
            >
              View <AiOutlineEye className="fs-l"></AiOutlineEye>
            </button>
            <button
              onClick={() => handleToggleConfirm(user._id, post._id)}
              className={cx("btn-action", "shadow-sm")}
            >
              <AiOutlineDelete className="fs-l" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

FavouritePost.propTypes = {
  post: PropTypes.object,
  getFvPost: PropTypes.func,
};

export default FavouritePost;
