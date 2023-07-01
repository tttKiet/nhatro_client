import Image from "react-bootstrap/Image";
import ChildComment from "./ChildComment";

// scss
import styles from "./Comment.module.scss";
import classNames from "classNames/bind";
import CommentInput from "../CommentInput";
const cx = classNames.bind(styles);
function Comment() {
  return (
    <div className={cx("cmt")}>
      <div className={cx("wrap", "pa")}>
        <div className={cx("layout")}>
          <div className={cx("avt")}>
            <div className={cx("img")}>
              <Image
                src={
                  "data:image/png;base64,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"
                }
              />
            </div>
          </div>
          <div className={cx("content")}>
            <div className={cx("main")}>
              <div className={cx("info")}>
                <h4 className={cx("author")}>Bui kiet</h4>
              </div>
              <p className={cx("description")}>
                Thay mặt nghành xin lỗi admin nha nhưng view sông dị mà 42tr/m2
                đc hông admin Nhà Sài Gòn giá Bình Dương Sổ hồng nhận liền sau
                khi bàn giao
              </p>
            </div>
            <div className={cx("actives")}>
              <div className={cx("active")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
                Response
              </div>
            </div>

            {/* comment con */}
            <div className={cx("child_comment")}>
              <ChildComment />
              <ChildComment />
              <ChildComment />
              <ChildComment />
            </div>
          </div>
        </div>
      </div>
      <div className={cx("commentInput")}>
        <div className={cx("comment_enter")}>
          <CommentInput />
        </div>
      </div>
    </div>
  );
}

export default Comment;
