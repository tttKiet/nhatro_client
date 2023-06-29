import Image from "react-bootstrap/esm/Image";
import { BiConfused } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import { useAuth } from "../../hooks";

// emoji
import data from "@emoji-mart/data/sets/14/facebook.json";
import Picker from "@emoji-mart/react";
const configEmoji = {
  set: "facebook",
  theme: "dark",
  icons: "outline",
  locale: "en",
  previewPosition: "top",
};

// scss
import styles from "./CommentInput.module.scss";
import classNames from "classNames/bind";
import { useEffect, useRef, useState } from "react";
//
const cx = classNames.bind(styles);

function CommentInput() {
  const [, , user] = useAuth();
  const [rows, setRows] = useState(1);
  const [content, setContent] = useState("");
  const [focus, setFocus] = useState(false);
  const textComment = useRef(null);
  const [showIcon, setShowIcon] = useState(false);

  const handleSetContent = (e) => {
    const newValues = e.target.value;
    const countRows = newValues.match(/\n/g);
    setRows(countRows ? countRows.length + 1 : 1);
    setContent(newValues);
  };

  const handleChooseIcon = (e) => {
    setContent((prev) => prev.concat(e.native));
  };

  useEffect(() => {
    const handleClick = (e) => {
      const isIcon = e.target.closest(".icons_comment, .icon-open, .main_icon");
      if (!isIcon) {
        setShowIcon(false);
        setFocus(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className={cx("wrap")}>
      <div className={cx("layout")}>
        <div className={cx("avt")}>
          <div className={cx("img")}>
            {user?.avatar?.includes("https:") ? (
              <Image src={user.avatar} />
            ) : (
              <div className={cx("svg")}>
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
              </div>
            )}
          </div>
        </div>
        <div className={cx("main", "main_icon")}>
          <div className={cx("input")}>
            <textarea
              ref={textComment}
              spellCheck={false}
              rows={rows}
              onClick={() => setFocus(true)}
              className={cx({ focus: focus || !!content })}
              type="text"
              value={content}
              onChange={handleSetContent}
              placeholder="Enter comment ..."
            />

            <div className={cx("icons")}>
              <div
                className={cx("icon", "icon-open")}
                onClick={() => {
                  textComment.current.focus();
                  setShowIcon((prev) => !prev);
                  setFocus(true);
                }}
              >
                <BiConfused />
              </div>
              <div className={cx("icon", "send")}>
                <AiOutlineSend />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showIcon && (
        <div className={cx("input_comment", "icons_comment")}>
          <div className={cx("emoji")}>
            <Picker
              {...configEmoji}
              data={data}
              onEmojiSelect={handleChooseIcon}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentInput;
