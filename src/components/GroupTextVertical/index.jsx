import PropTypes from "prop-types";

import styles from "./GroupTextVertical.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function GroupTextVertical({ title, content }) {
  return (
    <div className={cx("wrap")}>
      <div className="container">
        <div className={cx("gr")}>
          <div className={cx("title")}>{title}</div>
          <div className={cx("content")}>
            <span>{content}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

GroupTextVertical.propTypes = {
  title: PropTypes.node.isRequired,
  content: PropTypes.string,
};

export default GroupTextVertical;
