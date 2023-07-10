import ContentLoader, { Facebook } from "react-content-loader";
// scss
import styles from "./PrevPost.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);
function PrevPost() {
  return (
    <div className={cx("prev_loading")}>
      <Facebook foregroundColor={"#ECEAEC"} backgroundColor={"#c2c2c2"} />
    </div>
  );
}

export default PrevPost;
