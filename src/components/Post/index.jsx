import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "react-bootstrap/Image";
import Like from "../../assets/svg/like.svg";
import moment from "moment";
import ImageLoader from "../ImageLoader";
import { commentServices, likeServices, postServices } from "../../services";
import { useAuth } from "../../hooks";
import More from "./more";

// scss
import styles from "./Post.module.scss";
import classNames from "classNames/bind";
import CommentsBox from "../CommentsBox";
import { Link } from "react-router-dom";
import EmailVerified from "../EmailVerified";
import ModalFullScreen from "./ModalFullScreen";
const cx = classNames.bind(styles);

function Post({
  setPosts,
  content,
  images,
  createdAt,
  authorName,
  authorImage,
  hashTag,
  postId,
  author_id,
  userEmailVerified,
  size,
}) {
  const [showComments, setShowComments] = useState(false);
  const [, , user] = useAuth();
  const [likeInfo, setLikeInfo] = useState({
    user: [],
    count: 0,
  });
  const [maxCount, setMaxCount] = useState(1);
  const [showText, setShowText] = useState(false);
  const [showFullImg, setShowFullImg] = useState(false);
  const [imgToView, setImgToView] = useState([]);

  const toggleShowText = () => {
    setShowText((s) => !s);
  };

  const nextMaxCount = useCallback(() => {
    setMaxCount((pre) => pre + 1);
  }, []);

  const minusMaxCount = useCallback(() => {
    commentServices.getLimitComments(postId).then((res) => {
      if (res.status === 200 && res.data.err === 0) {
        setMaxCount(res.data.countCmt);
      }
    });
  }, [postId]);

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

  function handleViewFullImg(index) {
    const imgsClone = [...images];
    [imgsClone[0], imgsClone[index]] = [imgsClone[index], imgsClone[0]];
    setImgToView(imgsClone);
    setShowFullImg(true);
  }

  useEffect(() => {
    getLike();
  }, [getLike]);

  useEffect(() => {
    commentServices.getLimitComments(postId).then((res) => {
      if (res.status === 200 && res.data.err === 0) {
        setMaxCount(res.data.countCmt);
      }
    });
  }, [postId]);

  return (
    <div className={cx("wrap", `${size === "lg" ? "wrap-lg" : ""}`)}>
      <ModalFullScreen
        imgToView={imgToView}
        show={showFullImg}
        onHide={() => setShowFullImg(false)}
      ></ModalFullScreen>
      <div>
        <header className={cx("header")}>
          <div className={cx("avatar")}>
            <Link to={`/user/${author_id}`} className={cx("img")}>
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
            </Link>
          </div>
          <div className={cx("info")}>
            <div className={cx("user")}>
              <Link to={`/user/${author_id}`} className={cx("name", "pt-1")}>
                {authorName}
              </Link>
              {userEmailVerified && <EmailVerified />}
            </div>
            <span className={cx("time")}>
              {moment(createdAt).startOf("minutes").fromNow()}
            </span>
          </div>

          <More
            setPosts={setPosts}
            postId={postId}
            postInfo={{
              content,
              images,
              author_id: author_id,
              createdAt,
              authorName,
              authorImage,
              hashTag,
              postId,
            }}
          />
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
                <div
                  key={index}
                  className={cx("img")}
                  onClick={() => handleViewFullImg(index)}
                >
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
                liked: !!likeInfo.user.find((u) => u?.user?._id === user?._id),
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
                {likeInfo.user.find((u) => u?.user?._id === user?._id)
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
            <Link
              className={cx("details", "active")}
              to={`/post/${postId}`}
              state={{ source: "other-page" }}
            >
              <span className={cx("title")}>Details</span>
            </Link>
          </div>
        </footer>

        <CommentsBox
          minusMaxCount={minusMaxCount}
          setShowComments={setShowComments}
          showComments={showComments}
          postId={postId}
          nextMaxCount={nextMaxCount}
        />
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
  setPosts: PropTypes.func,
  postId: PropTypes.string,
  author_id: PropTypes.string,
  userEmailVerified: PropTypes.bool,
  size: PropTypes.string,
};

export default Post;
