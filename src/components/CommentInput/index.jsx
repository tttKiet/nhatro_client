import Image from "react-bootstrap/esm/Image";
import { BiConfused } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import { useAuth } from "../../hooks";
import { commentServices } from "../../services";
import PropTypes from "prop-types";

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
import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { ToastContext } from "../../untils/context";
//
const cx = classNames.bind(styles);

const CommentInput = forwardRef(function (
  {
    postId,
    place,
    parentId,
    send,
    showComment,
    setTagUser,
    nextMaxCount,
    editOb,
    updateCmtEdit,
  },
  ref
) {
  const [, , user] = useAuth();
  const inputRef = useRef(null);
  const toast = useContext(ToastContext);
  const iconsCommentRef = useRef(null);
  const [content, setContent] = useState(editOb?.value || "");
  const [focus, setFocus] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const handleSetContent = (e) => {
    const newValues = e.target.value;
    setContent(newValues);
  };

  const handleChooseIcon = (e) => {
    setContent((prev) => prev.concat(e.native));
  };

  const handleEnterSend = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSendCmt();
    }
  };

  const handleInput = () => {
    if (ref && ref.current) {
      ref.current.style.height = "24px";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  };

  const handleSendCmt = () => {
    if (ref && ref.current) {
      ref.current.style.height = "24px";
    } else {
      if (inputRef.current) {
        inputRef.current.style.height = "24px";
      }
    }

    if (!content.trim()) {
      setContent("");
      return;
    }

    if (setTagUser) {
      setTagUser("");
    }

    if (editOb?.id) {
      return toast
        .promise(commentServices.editComment(editOb.id, content), {
          loading: "Saving...",
          success: <span>change saved!</span>,
          error: <span>Could not save.</span>,
        })
        .then((res) => {
          console.log(res);
          setFocus(false);
          setContent("");
          setShowIcon(false);
          nextMaxCount();
          if (showComment) {
            showComment();
          }
          updateCmtEdit(res?.data.newComment);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const data = {
      content: content.trim(),
      postId,
      userId: user._id,
      parentId: parentId,
    };
    commentServices
      .createCmt({ ...data })
      .then((response) => {
        if (response.status === 200 && response.data.err === 0) {
          setFocus(false);
          setContent("");
          setShowIcon(false);
          nextMaxCount();
          if (showComment) {
            showComment();
          }
          send(response.data.newComment);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (editOb?.value) {
      setContent(editOb.value);
    }
  }, [editOb?.value]);

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

  useEffect(() => {
    if (showIcon && iconsCommentRef.current) {
      iconsCommentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showIcon]);

  return (
    <div className={cx("wrap")}>
      <div className={cx("layout")}>
        <div className={cx("avt")}>
          <div className={cx("img")}>
            {user?.avatar?.includes("https:") ? (
              <Image src={user.avatar} />
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
          </div>
        </div>
        <div className={cx("main", "main_icon")}>
          {editOb?.id && (
            <div className={cx("edit")}>
              <span className={cx("title")}>Edit:</span> {editOb.id}
            </div>
          )}
          <div className={cx("input")}>
            <textarea
              onInput={handleInput}
              ref={ref || inputRef}
              spellCheck={false}
              onClick={() => setFocus(true)}
              className={cx({ focus: focus || !!content }, "input_com")}
              type="text"
              value={content}
              onChange={handleSetContent}
              placeholder="Enter comment ..."
              onKeyDown={handleEnterSend}
            />

            <div className={cx("icons")}>
              <div
                className={cx("icon", "icon-open")}
                onClick={() => {
                  ref.current.focus();
                  setShowIcon((prev) => !prev);
                  setFocus(true);
                }}
              >
                <BiConfused />
              </div>
              <div
                className={cx("icon", "send", {
                  disable: !content,
                })}
                onClick={handleSendCmt}
              >
                <AiOutlineSend />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showIcon && (
        <div
          className={cx("input_comment", "icons_comment", {
            topLeft: place === "top-left",
          })}
          ref={iconsCommentRef}
        >
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
});

CommentInput.propTypes = {
  postId: PropTypes.string,
  parentId: PropTypes.string,
  send: PropTypes.func,
  showComment: PropTypes.func,
  setTagUser: PropTypes.func,
  nextMaxCount: PropTypes.func,
  place: PropTypes.string,
  updateCmtEdit: PropTypes.func,
  editOb: PropTypes.object,
};

CommentInput.displayName = "CommentInput";

export default CommentInput;
