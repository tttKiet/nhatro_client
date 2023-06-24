import { Link } from "react-router-dom";
import styles from "./MyPostPage.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function MyPostPage() {
  return (
    <div className={cx("wrap")}>
      <div className={cx("nav")}>nav</div>
      <div className={cx("my-post")}>
        <div className="container">
          <div className="row">
            <div className="col-12">sadsdasa</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPostPage;
