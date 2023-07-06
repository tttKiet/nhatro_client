import styles from "./FavouritePost.module.scss";
import classNames from "classNames/bind";
import { Image } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import moment from "moment";
import { useContext } from "react";
import { ToastContext } from "../../untils/context";

const cx = classNames.bind(styles);
function FavouritePost(post) {
  const toast = useContext(ToastContext);

  function handleRemove() {
    toast.success("test removed");
  }

  return (
    <div className={cx("wrap")}>
      <div className={cx("favourite-post", "shadow-sm mb-3")}>
        <div className={cx("wrap-img")}>
          <Image
            className={cx("img-favourite-post", "shadow-sm")}
            src={
              post.post.postId?.images.length > 0
                ? post.post.postId?.images[0]
                : "https://img.freepik.com/free-vector/gradient-blur-pink-blue-abstract-background_53876-117324.jpg?w=1060&t=st=1688647878~exp=1688648478~hmac=6de2de4d3234eae54e09d5f2c17ede78039b68ac838a57673e07be8f20dd0cee"
            }
          />
        </div>
        <div className="flex-grow-1 ps-3">
          <div className={cx("content-post")}>
            <p className="fs-l fw-medium mb-0">{post.post.postId?.content}</p>
            <p className="fs-s">{post.post.postId?.hashTag}</p>
            <p className="fs-s fst-italic fw-light">
              Was saved from <b>{post.post.postId?.user?.fullName} </b>
              in {moment(post.post.createdAt).startOf("minutes").fromNow()}
            </p>
          </div>

          {/* Action */}
          <div>
            <button className={cx("btn-action", "bg-primary shadow-sm")}>
              View <AiOutlineEye className="fs-l"></AiOutlineEye>
            </button>
            <button
              onClick={() => handleRemove()}
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

export default FavouritePost;
