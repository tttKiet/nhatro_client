import PropTypes from "prop-types";

import styles from "./TittleContentLv3.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function TittleContentLv3({ header, title, contentArray, btnText }) {
  return (
    <div className={cx("wrap")}>
      <div className="container">
        <div className={cx("gr_box")}>
          <div className={cx("heading")}>
            <h6>{header}</h6>
            <h3>{title}</h3>
          </div>
          <ul className={cx("gr")}>
            {contentArray.map(({ title, content }, index) => (
              <li key={index}>
                <h5 className={cx("title")}>{title}</h5>
                <p className={cx("content")}>{content}</p>
              </li>
            ))}
          </ul>
          {btnText && <button>{btnText}</button>}
        </div>
      </div>
    </div>
  );
}

TittleContentLv3.propTypes = {
  header: PropTypes.string.isRequired,
  contentArray: PropTypes.array,
  btnText: PropTypes.string,
  title: PropTypes.string,
};

export default TittleContentLv3;
