import classNames from "classNames/bind";
import styles from "./CommentsBox.module.scss";
import PropTypes from "prop-types";
import Comment from "../Comment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { commentServices } from "../../services";
import LoaderCmt from "../LoaderCmt";
import { TbLoader, TbLoaderQuarter } from "react-icons/tb";
import CommentInput from "../CommentInput";

const cx = classNames.bind(styles);

function CommentsBox({ postId, nextMaxCount, showComments }) {
  const coutDoc = useMemo(() => 3, []);
  const [isScroll, setIsScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cmtPage, setCmtPage] = useState(2);
  const [maxCountCmtParent, setMaxCountCmtParent] = useState(1);
  const inputRef = useRef(null);
  const [cmts, setCmts] = useState([]);
  const body = useRef(null);

  const handleMergeCmt = (newCmt) => {
    setCmts((prev) => [newCmt, ...prev]);
  };

  const nextPageCmt = useCallback(() => {
    if (coutDoc * cmtPage < maxCountCmtParent) setCmtPage((v) => v + 1);
  }, [cmtPage, coutDoc, maxCountCmtParent]);

  const getCmts = useCallback(() => {
    setLoading(true);
    commentServices
      .getComment(postId, cmtPage)
      .then((res) => {
        if (res.status === 200 && res.data.err === 0) {
          setCmts((cmt) => [...cmt, ...res.data.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postId, cmtPage]);

  const handleClickMore = useCallback(async () => {
    if (loading) return;
    await getCmts();
    nextPageCmt();
  }, [getCmts, loading, nextPageCmt]);

  const handleClickMoreAll = () => {
    handleClickMore();
    setIsScroll(true);
  };

  const handleScroll = useCallback(() => {
    const scrollHeight = body.current.scrollHeight;
    const scrollTop = body.current.scrollTop;
    const clientHeight = body.current.clientHeight;

    if (scrollTop + clientHeight + 10 >= scrollHeight && !loading) {
      handleClickMore();
    }
  }, [handleClickMore, loading]);

  useEffect(() => {
    if (cmts.length >= maxCountCmtParent) {
      return;
    }
    if (isScroll && body.current) {
      body.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (body.current && isScroll) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        body.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isScroll, handleScroll, cmts.length, maxCountCmtParent]);

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
                    id={cmt._id}
                    key={cmt._id}
                    postId={postId}
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
                {loading && (
                  <div className="pe-4">
                    <LoaderCmt />
                  </div>
                )}

                {maxCountCmtParent > cmts.length && (
                  <div className="d-flex my-3 ps-3">
                    <div
                      className={cx("show_more_cmt")}
                      onClick={handleClickMore}
                    >
                      view more
                      <div className={cx("show_more_cmt-icon")}>
                        <TbLoaderQuarter />
                      </div>
                    </div>

                    <div
                      className={cx("show_more_cmt")}
                      onClick={handleClickMoreAll}
                    >
                      view all
                      <div className={cx("show_more_cmt-icon")}>
                        <TbLoader />
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
          ref={inputRef}
          nextMaxCount={nextMaxCount}
          postId={postId}
          send={handleMergeCmt}
          showComment={() => {}}
        />
      </div>
    </div>
  );
}

CommentsBox.propTypes = {
  postId: PropTypes.string,
  nextMaxCount: PropTypes.func,
  showComments: PropTypes.bool,
};

export default CommentsBox;
