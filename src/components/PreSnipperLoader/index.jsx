import Snipper from "../Snipper";

// scss
import styles from "./PreSnipperLoader.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function PreSnipperLoader() {
  return (
    <div className={cx("wrap")}>
      <Snipper color="#000" size={30} />
    </div>
  );
}

export default PreSnipperLoader;
