import Image from "react-bootstrap/Image";
import moment from "moment";
import PropTypes from "prop-types";

import { FaCaretRight } from "react-icons/fa";
import { BsReply } from "react-icons/bs";
import { VscTriangleRight } from "react-icons/vsc";
import LoaderCmt from "../LoaderCmt";
// scss
import styles from "./Comment.module.scss";
import classNames from "classNames/bind";
import CommentInput from "../CommentInput";
import { useCallback, useEffect, useRef, useState } from "react";
import { commentServices, userServices } from "../../services";
const cx = classNames.bind(styles);

function Comment({
  postId,
  content,
  createdAt,
  updatedAt,
  user,
  child,
  isChild,
  onclickRes,
  id,
  countChildren = 0,
  commentParent,
  focusInput,
}) {
  const [showInput, setShowInput] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showCmt, setShowCmt] = useState(false);
  const cmtRef = useRef(null);
  const inputRef = useRef(null);
  const textCommentRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [childCmt, setChildCmt] = useState([]);
  const [countChild, setCountChild] = useState(countChildren);
  const [tagUser, setTagUser] = useState("");

  const toggleShowText = () => {
    setShowText((s) => !s);

    if (cmtRef.current) {
      cmtRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const focus = () => {
    textCommentRef.current.focus();
    textCommentRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleClickRes = () => {
    if (onclickRes) {
      onclickRes(user.fullName);
      console.log("first");
      focusInput();
    } else {
      if (inputRef.current && textCommentRef.current) {
        textCommentRef.current.focus();
        inputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      setTagUser(user.fullName);
      setShowInput(true);
    }
  };

  const handleClickViewMoreChildCmt = () => {
    setLoading(true);
    commentServices
      .getCommentById(id, 1, "all")
      .then((res) => {
        if (res.status === 200) {
          setShowCmt(true);
          setShowInput(true);
          setChildCmt(res.data.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClickResponseChild = (fullName) => {
    setShowInput(true);
    setTagUser(fullName);
  };

  const handleMergeCmtChild = useCallback((newReply) => {
    setCountChild((prev) => prev + 1);
    setChildCmt((prew) => [...prew, newReply]);
  }, []);

  return (
    <div
      ref={cmtRef}
      className={cx(
        "cmt",
        `${isChild ? "" : "mb-2"}`,
        `${showInput ? "pb-2" : ""}`
      )}
    >
      <div
        className={cx(
          "wrap",
          `${isChild === true ? "ch" : "pa"}`,
          `${countChildren === 0 && !showInput ? "offLine" : ""}`
          // `${childCmt.length > 0 && !showInput ? "customLine" : ""}`
        )}
      >
        <div className={cx("layout")}>
          <div className={cx("avt")}>
            <div className={cx("img")}>
              {user.avatar === "svg" ? (
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
              ) : (
                <div className={cx("img")}>
                  <Image src={user.avatar} />
                </div>
              )}
            </div>
          </div>
          <div className={cx("content")}>
            <div className={cx("contai")}>
              <div className={cx("main")}>
                <div className={cx("info")}>
                  <h4 className={cx("author")}>{user?.fullName}</h4>

                  {commentParent && commentParent._id !== user._id && (
                    <>
                      <VscTriangleRight />
                      <h4 className={cx("author")}>{commentParent.fullName}</h4>
                    </>
                  )}
                </div>

                <div className={cx("description")}>
                  <pre>
                    {/* editting */}
                    {showText === false ? content.slice(0, 500) : content}
                    {content.length > 500 && showText === false && (
                      <span
                        onClick={toggleShowText}
                        className={cx("more_hidden")}
                      >
                        <span>...</span> [more]
                      </span>
                    )}
                    {showText === true && (
                      <span
                        onClick={toggleShowText}
                        className={cx("more_hidden")}
                      >
                        [hidden]
                      </span>
                    )}
                  </pre>
                </div>
              </div>
            </div>
            <div className={cx("actives")}>
              <div className={cx("active")} onClick={handleClickRes}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
                Response
              </div>

              <div className={cx("active", "date")}>
                {moment(updatedAt).fromNow()}
              </div>
            </div>
            {childCmt.map((cmt, index) => (
              <Comment
                id={cmt._id}
                isChild={true}
                key={index}
                postId={postId}
                user={cmt.user}
                commentParent={cmt.commentParent.user}
                content={cmt.content}
                createdAt={cmt.createdAt}
                updatedAt={cmt.updatedAt}
                child={cmt.child}
                focusInput={focus}
                onclickRes={(fullName) => handleClickResponseChild(fullName)}
              />
            ))}
            {loading && (
              <div className={cx("loader")}>
                <LoaderCmt />
              </div>
            )}

            {!isChild && showCmt && (
              <div
                onClick={() => {
                  setChildCmt([]);
                  setShowCmt(false);
                  setTagUser("");
                  if (cmtRef.current) {
                    cmtRef.current.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }
                }}
                className={cx("hide_cmt")}
              >
                [hide comment]
              </div>
            )}
          </div>
        </div>
      </div>
      {!isChild && tagUser && (
        <div className={cx("reply")}>
          <div className={cx("icon")}>
            <BsReply />
          </div>
          reply to
          <div className={cx("user")}>{tagUser}</div>
        </div>
      )}

      {!isChild && !showCmt && !loading && countChildren > 0 && (
        <div
          className={cx("show_cmt-more")}
          onClick={handleClickViewMoreChildCmt}
        >
          <div className={cx("show_cmt-mes")}>
            <FaCaretRight /> (
            {!showCmt ? countChild - childCmt.length : countChild} comments)
          </div>
        </div>
      )}
      {!isChild && showInput && (
        <div className={cx("commentInput")} ref={inputRef}>
          <div className={cx("comment_enter")}>
            <CommentInput
              ref={textCommentRef}
              parentId={id}
              send={handleMergeCmtChild}
              setTagUser={setTagUser}
            />
          </div>
        </div>
      )}
    </div>
  );
}

Comment.propTypes = {
  postId: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  user: PropTypes.object,
  child: PropTypes.array,
  isChild: PropTypes.bool,
  onclickRes: PropTypes.func,
  id: PropTypes.string,
  countChildren: PropTypes.number,
  getCmts: PropTypes.func,
  commentParent: PropTypes.object,
};

export default Comment;
