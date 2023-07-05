import Image from "react-bootstrap/Image";
import { MdPlayArrow } from "react-icons/md";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Like from "../../assets/svg/like.svg";
import PropTypes from "prop-types";
import moment from "moment";
import { TbLoaderQuarter, TbLoader } from "react-icons/tb";

import CommentInput from "../CommentInput";
import Comment from "../Comment";
// scss
import styles from "./Post.module.scss";
import classNames from "classNames/bind";
import ImageLoader from "../ImageLoader";
import { commentServices, likeServices, postServices } from "../../services";
import { useAuth } from "../../hooks";
import LoaderCmt from "../LoaderCmt";
const cx = classNames.bind(styles);

function Post({
  content,
  images,
  createdAt,
  authorName,
  authorImage,
  hashTag,
  postId,
}) {
  const [showComments, setShowComments] = useState(false);
  const coutDoc = useMemo(() => 3, []);
  const [, , user] = useAuth();
  const [isScroll, setIsScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likeInfo, setLikeInfo] = useState({
    user: [],
    count: 0,
  });
  const [showText, setShowText] = useState(false);
  const [cmtPage, setCmtPage] = useState(2);
  const [maxCount, setMaxCount] = useState(1);
  const [maxCountCmtParent, setMaxCountCmtParent] = useState(1);
  const inputRef = useRef(null);
  const [cmts, setCmts] = useState([]);
  const body = useRef(null);

  const toggleShowText = () => {
    setShowText((s) => !s);
  };

  const nextMaxCount = useCallback(() => {
    setMaxCount((pre) => pre + 1);
  }, []);

  const handleMergeCmt = (newCmt) => {
    // if (body.current) {
    //   body.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "end",
    //   });
    // }

    setCmts((prev) => [newCmt, ...prev]);
  };

  const toggleLike = () => {
    likeServices
      .toggleLikePost({ postId, userId: user?._id || null })
      .then((res) => {
        if (res.status === 200 && res.data.err === 0) {
          getLike();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLike = useCallback(() => {
    postServices.getLike({ postId }).then((res) => {
      if (res.status === 200 && res.data.err === 0) {
        setLikeInfo({
          user: [...res.data.data],
          count: res.data.likedCount || 0,
        });
      }
    });
  }, [postId]);

  const nextPageCmt = useCallback(() => {
    if (coutDoc * cmtPage < maxCountCmtParent) setCmtPage((v) => v + 1);
  }, [cmtPage, coutDoc, maxCountCmtParent]);

  const getCmts = useCallback(
    (action) => {
      setLoading(true);
      commentServices
        .getComment(postId, cmtPage)
        .then((res) => {
          if (res.status === 200 && res.data.err === 0) {
            if (action === "refresh") {
              setCmts([...res.data.data]);
            } else {
              setCmts((cmt) => [...cmt, ...res.data.data]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [postId, cmtPage]
  );

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
    getLike();
  }, [getLike]);

  useEffect(() => {
    commentServices.getComment(postId, 1).then((res) => {
      if (res.status === 200 && res.data.err === 0) {
        setCmts([...res.data.data]);
        setMaxCountCmtParent(res.data.count);
      }
    });
  }, [postId]);

  useEffect(() => {
    commentServices.getLimitComments(postId).then((res) => {
      if (res.status === 200 && res.data.err === 0) {
        setMaxCount(res.data.countCmt);
      }
    });
  }, [postId]);

  useEffect(() => {
    if (cmts.length >= maxCountCmtParent) {
      return;
    }
    if (isScroll && body.current) {
      body.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (body.current && isScroll) {
        body.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isScroll, handleScroll, cmts.length, maxCountCmtParent]);

  return (
    <div className={cx("wrap")}>
      <div>
        <header className={cx("header")}>
          <div className={cx("avatar")}>
            <div className={cx("img")}>
              {authorImage === "svg" ? (
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
                <Image src={authorImage} />
              )}
            </div>
          </div>
          <div className={cx("info")}>
            <div className={cx("user")}>
              <span className={cx("space")}>
                <MdPlayArrow />
              </span>
              <div className={cx("name")}>{authorName}</div>
            </div>
            <div className={cx("time")}>
              <span>{moment(createdAt).startOf("minutes").fromNow()}</span>
            </div>
          </div>
        </header>
        <main className={cx("main")}>
          <div className={cx("content")}>
            <div className={cx("description")}>
              <pre>
                {/* editting */}
                {showText === false ? content.slice(0, 500) : content}
                {content.length > 500 && showText === false && (
                  <span onClick={toggleShowText} className={cx("more_hidden")}>
                    <span>...</span> [more]
                  </span>
                )}
                {showText === true && (
                  <span onClick={toggleShowText} className={cx("more_hidden")}>
                    [hidden]
                  </span>
                )}
              </pre>
            </div>

            {hashTag && <span className={cx("hashTag")}>{hashTag}</span>}
          </div>
          {images?.length > 0 && (
            <div className={cx("images", `layout_${images?.length}`)}>
              {images.map((image, index) => (
                <div key={index} className={cx("img")}>
                  <ImageLoader image={{ src: image }} />
                </div>
              ))}
            </div>
          )}

          <div className={cx("info_post")}>
            <div className={cx("info_post-item")}>
              <div className={cx("img")}>
                <Image src={Like} />
              </div>
              {likeInfo?.count}
            </div>
            <div className={cx("info_post-item")}>
              <span className={cx("count_cmt")}>{maxCount}</span>comments
            </div>
          </div>
        </main>
        <footer className={cx("footer")}>
          <div className={cx("actives")}>
            <button
              type="button"
              className={cx("active", "col-4", {
                liked: !!likeInfo.user.find((u) => u.user._id === user._id),
              })}
              onClick={() => toggleLike()}
            >
              <div>
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
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
              </div>

              <span>
                {likeInfo.user.find((u) => u.user._id === user._id)
                  ? "Liked"
                  : "Like"}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setShowComments((s) => !s)}
              className={cx("active", "col-4")}
            >
              <div>
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
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </div>
              <span>Comment</span>
            </button>
            <button
              type="button"
              className={cx("active", "favorited", "col-4")}
            >
              <div>
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
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              </div>
              <span>Favourites</span>
            </button>
          </div>
        </footer>
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
                    <div className="d-flex my-3">
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
            showComment={() => setShowComments(true)}
          />
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.string,
  images: PropTypes.array,
  createdAt: PropTypes.string,
  authorName: PropTypes.string,
  authorImage: PropTypes.string,
  hashTag: PropTypes.string,
  postId: PropTypes.string,
};

export default Post;
