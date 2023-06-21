import { useFormik } from "formik";
import { useAuth } from "../../../hooks";
import { Image } from "react-bootstrap";
// scss
import styles from "./FormUpPost.module.scss";
import classNames from "classNames/bind";
import { useState } from "react";
const cx = classNames.bind(styles);

function FormUpPost() {
  const [, , userCur] = useAuth();
  const [rows, setRows] = useState(1);
  const [content, setContent] = useState();

  const handleSetContent = (e) => {
    const newValues = e.target.value;
    const countRows = newValues.match(/\n/g);
    setRows(countRows ? countRows.length + 1 : 1);
    setContent(newValues);
  };
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 5) {
      errors.name = "Must be 5 characters or more";
    }

    if (!values.address) {
      errors.address = "Required";
    } else if (values.address.length < 5) {
      errors.address = "Must be 5 characters or more";
    }

    if (!values.phone) {
      errors.phone = "Please enter your phone number!";
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(values.phone)) {
      errors.phone = "Invalid phone number format!";
    }

    if (!values.electric) {
      errors.electric = "Required";
    }

    if (!values.water) {
      errors.water = "Required";
    }

    if (!values.description) {
      errors.description = "Required";
    }

    if (values.images.length === 0) {
      errors.images = "Required";
    } else if (values.images.length > 8) {
      errors.images = "Please Choose less than 8 photos!";
    }

    return errors;
  };

  return (
    <form className={cx("wrap")}>
      <header>
        <div className={cx("d-flex align-items-center gap-2 ", "avatar")}>
          <span className={cx("wrap-avt")}>
            <span
              className={cx("avt", {
                border: !userCur?.avatar?.includes("https:"),
              })}
            >
              {userCur?.avatar?.includes("https:") ? (
                <Image src={userCur.avatar} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              )}
            </span>
          </span>
          <span className={cx("name")}>
            &nbsp;
            <span className="hight-pink">
              {userCur?.fullName || "Erorr Name"}
            </span>
          </span>
        </div>
      </header>

      <div className={cx("body")}>
        <div className={cx("form-gr")}>
          <textarea
            spellCheck={false}
            rows={rows}
            value={content}
            onChange={handleSetContent}
            type="text"
            className={cx("input")}
            placeholder="You are think ..."
          />
        </div>

        <div className={cx("form-gr")}>
          <div className={cx("images", "layout_1")}>
            <div>
              <Image src={userCur.avatar} />
            </div>
          </div>
        </div>
      </div>

      <div className={cx("actions")}>
        <select name="hash-tag" id="hash-tag">
          <option value="#0">Hash Tag</option>
          <option value="#1">#findmotel</option>
          <option value="#2">#help</option>
          <option value="#3">#passmotel</option>
        </select>

        <button type="button" className="btn transparent">
          Add image
        </button>
      </div>
    </form>
  );
}

export default FormUpPost;
