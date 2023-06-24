import ContentLoader, { Facebook } from "react-content-loader";
// scss
import styles from "./PrevPost.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);
function PrevPost() {
  return (
    <div className={cx("prev_loading")}>
      <Facebook
        foregroundColor={"rgba(92, 92, 92, 0.368)"}
        backgroundColor={"rgba(92, 92, 92, 0.968)"}
      />
    </div>
  );
}

export default PrevPost;
