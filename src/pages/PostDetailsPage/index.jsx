import styles from "./PostDetailsPage.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function PostDetailsPage() {
  return <div className={cx("wrap")}>PostDetailsPage</div>;
}

export default PostDetailsPage;
