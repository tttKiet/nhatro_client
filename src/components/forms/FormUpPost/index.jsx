import { useAuth } from "../../../hooks";
import { Button, Image, Modal } from "react-bootstrap";
import { ToastContext } from "../../../untils/context";
import { trackPromise } from "react-promise-tracker";
// scss
import styles from "./FormUpPost.module.scss";
import classNames from "classNames/bind";
import { useContext, useState } from "react";
import postServices from "../../../services/postServices";
const cx = classNames.bind(styles);

function FormUpPost({ handleClose }) {
  const [, , userCur] = useAuth();
  const toast = useContext(ToastContext);
  const [rows, setRows] = useState(1);
  const [content, setContent] = useState();
  const [hashTag, setHashTag] = useState("#notag");
  const [files, setFiles] = useState([]);
  const [filesUrl, setFilesUrl] = useState([]);

  const handleSetContent = (e) => {
    const newValues = e.target.value;
    const countRows = newValues.match(/\n/g);
    setRows(countRows ? countRows.length + 1 : 1);
    setContent(newValues);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      return toast.error("Enter the content of the article!");
    }
    const data = {
      content,
      files,
      hashTag,
    };
    trackPromise(
      postServices.createPost({ _id: userCur._id, ...data }),
      "up_post"
    );
    setContent("");
    setHashTag("#notag");
    setFiles([]);
    setFilesUrl([]);
    handleClose();
  };

  const handleChangeInputFile = (e) => {
    const filesTarget = e.target.files;
    for (let i = 0; i < filesTarget.length; i++) {
      if (!filesTarget[i].type.includes("image/")) {
        return toast.error("Please select only images!");
      }
    }

    if (filesTarget.length > 4 || files.length + filesTarget.length > 4) {
      return toast.error("Please select less than 4 image!");
    }
    const fileUrl = Array.from(filesTarget).map((file) =>
      URL.createObjectURL(file)
    );
    setFiles((prev) => [...prev, ...filesTarget]);
    setFilesUrl((prev) => [...prev, ...fileUrl]);
  };

  return (
    <form className={cx("wrap")} onSubmit={handleSubmit}>
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
        {filesUrl.length > 0 && (
          <div className={cx("form-gr")}>
            <div className={cx("images", `layout_${filesUrl.length}`)}>
              {filesUrl.map((f, i) => (
                <div key={i} className={cx("img")}>
                  <Image src={f} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={cx("actions")}>
        <select
          name="hash-tag"
          id="hash-tag"
          value={hashTag}
          onChange={(e) => setHashTag(e.target.value)}
        >
          <option value="#notag">Hash Tag</option>
          <option value="#findmotel">#findmotel</option>
          <option value="#help">#help</option>
          <option value="#passmotel">#passmotel</option>
        </select>

        <label type="button" htmlFor="post" className="btn transparent">
          Add image
        </label>
        <input
          type="file"
          onChange={handleChangeInputFile}
          multiple
          hidden
          id="post"
        />
      </div>
      <div className={cx("submit")}>
        <Button
          variant="secondary"
          className={cx("cancel")}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button type="submit" className={cx("up")}>
          Up here
        </Button>
      </div>
    </form>
  );
}

export default FormUpPost;
