import classNames from "classNames/bind";
import styles from "./CommentsBox.module.scss";
import PropTypes from "prop-types";
import Comment from "../Comment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { commentServices } from "../../services";
import LoaderCmt from "../LoaderCmt";

import { TbLoaderQuarter } from "react-icons/tb";
import { RiLoader2Fill } from "react-icons/ri";
import CommentInput from "../CommentInput";

const cx = classNames.bind(styles);

function CommentsBox({
  postId,
  nextMaxCount,
  showComments,
  setShowComments,
  minusMaxCount,
}) {
  const coutDoc = useMemo(() => 3, []);
  const [loading, setLoading] = useState(false);
  const [editOb, setEditOb] = useState({
    id: "",
    value: "",
  });
  const [cmtPage, setCmtPage] = useState(2);
  const inputRef = useRef(null);
  const [maxCountCmtParent, setMaxCountCmtParent] = useState(); // All comments no reply
  const [cmts, setCmts] = useState([]); // All comments of post
  const body = useRef(null);

  const handleMergeCmt = (newCmt) => {
    setCmts((prev) => [newCmt, ...prev]);
    setMaxCountCmtParent((prev) => prev + 1);
  };

  const isDuplicate = useCallback(
    (arr, item) => arr.some((el) => el._id === item._id),
    []
  );

  const handleMinusOneCmt = (type) => {
    minusMaxCount();

    if (type !== -1) {
      commentServices
        .getComment(postId, Math.ceil(cmts.length / 3))
        .then((res) => {
          if (res.status === 200 && res.data.err === 0) {
            const leng = res?.data?.data.length;
            if (maxCountCmtParent > 3 && leng > 0) {
              setCmts((prev) => {
                if (
                  prev?.[prev.length - 1]._id ===
                  res?.data?.data?.[leng - 1]._id
                ) {
                  return prev;
                }
                return [...prev, res?.data?.data?.[leng - 1]];
              });
            }
            setMaxCountCmtParent(res.data.count);
          }
        });
    }
  };

  const nextPageCmt = useCallback(() => {
    if (coutDoc * cmtPage < maxCountCmtParent) {
      setCmtPage((v) => v + 1);
    }
  }, [cmtPage, coutDoc, maxCountCmtParent]);

  const getCmts = useCallback(() => {
    setLoading(true);
    commentServices
      .getComment(postId, Math.round(cmts.length / 3))
      .then((res) => {
        if (res.status === 200 && res.data.err === 0) {
          setCmts((cmt) => {
            const newCmts = [...cmt];
            res.data.data.forEach((c) => {
              if (!isDuplicate(newCmts, c)) {
                newCmts.push(c);
              }
            });
            console.log("after", newCmts);

            return newCmts;
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postId, cmts.length, isDuplicate]);

  const handleCLickEditParent = (id, value) => {
    setEditOb(() => {
      return { id, value };
    });
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const updateCmtEdit = (updateCmtEdit) => {
    setCmts((prev) => {
      const newCmts = prev.map((cmt) => {
        if (cmt._id === updateCmtEdit._id) return { ...updateCmtEdit };
        else {
          return cmt;
        }
      });
      return newCmts;
    });
    setEditOb({
      id: "",
      value: "",
    });
  };

  const handleClickMore = useCallback(async () => {
    if (cmts.length >= maxCountCmtParent || loading) {
      return;
    } else {
      await getCmts();
      nextPageCmt();
    }
  }, [cmts.length, getCmts, loading, maxCountCmtParent, nextPageCmt]);

  useEffect(() => {
    commentServices.getComment(postId, 1).then((res) => {
      if (res.status === 200 && res.data.err === 0) {
        setCmts([...res.data.data]);
        setMaxCountCmtParent(res.data.count);
      }
    });
  }, [postId]);

  return (
    <div className={cx("wrap")}>
      {showComments && (
        <div className={cx("comment")}>
          <div className={cx("comment_layout")} ref={body}>
            {cmts.length > 0 ? (
              <>
                {cmts.map((cmt) => (
                  <Comment
                    minusMaxCount={handleMinusOneCmt}
                    handleCLickEditParent={handleCLickEditParent}
                    id={cmt._id}
                    key={cmt._id}
                    postId={postId}
                    setCmts={setCmts}
                    user={cmt.user}
                    content={cmt.content}
                    createdAt={cmt.createdAt}
                    updatedAt={cmt.updatedAt}
                    child={cmt?.child?.comment}
                    getCmts={getCmts}
                    countChildren={cmt?.child?.count}
                    nextMaxCount={nextMaxCount}
                  />
                ))}
                {/* {loading && (
                  <div className="pe-4">
                    <LoaderCmt />
                  </div>
                )} */}

                {/* {console.log("maxCountCmtParent", maxCountCmtParent)}
                {console.log(" cmts.length", cmts.length)}
                {console.log(
                  " cmts.Math.round(cmts.length / 3)",
                  Math.ceil(cmts.length / 3)
                )} */}

                {maxCountCmtParent > cmts.length && (
                  <div className=" my-3 ps-3 d-flex justify-content-center">
                    <div
                      className={cx("show_more_cmt")}
                      onClick={handleClickMore}
                    >
                      Load more
                      <div className={cx("show_more_cmt-icon")}>
                        <RiLoader2Fill />
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className={cx("not_cmt")}>
                <h4>This post has not comment !!!</h4>
                <h4>Comment here...</h4>

                <h4>
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
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </h4>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={cx("input_comment")}>
        <CommentInput
          editOb={editOb}
          updateCmtEdit={updateCmtEdit}
          place="top-left"
          ref={inputRef}
          nextMaxCount={nextMaxCount}
          postId={postId}
          send={handleMergeCmt}
          showComment={() => {
            if (setShowComments) {
              setShowComments(true);
            }
          }}
        />
      </div>
    </div>
  );
}

CommentsBox.propTypes = {
  postId: PropTypes.string,
  nextMaxCount: PropTypes.func,
  setShowComments: PropTypes.func,
  minusMaxCount: PropTypes.func,
  showComments: PropTypes.bool,
};

export default CommentsBox;
