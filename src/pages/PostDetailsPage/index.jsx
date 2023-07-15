import { useParams, useNavigate, useLocation } from "react-router-dom";

// scss
import styles from "./PostDetailsPage.module.scss";
import classNames from "classNames/bind";
import { SlLike } from "react-icons/sl";
import { VscTriangleLeft } from "react-icons/vsc";

import CommentsBox from "../../components/CommentsBox";
import { useCallback, useEffect, useState } from "react";
import { commentServices, likeServices, postServices } from "../../services";
import ImageLoader from "../../components/ImageLoader";
import More from "../../components/Post/more";
import moment from "moment";
import Image from "react-bootstrap/Image";
import { useAuth } from "../../hooks";
import { BsPatchCheck } from "react-icons/bs";
import EmailVerified from "../../components/EmailVerified";
import ModalFullScreen from "../../components/Post/ModalFullScreen";

const cx = classNames.bind(styles);

function PostDetailsPage() {
  const location = useLocation();
  const navigation = useNavigate();
  const { source } = location.state || {};

  const { _id } = useParams();
  const [, , user] = useAuth();
  const [likeInfo, setLikeInfo] = useState({
    user: [],
    count: 0,
  });
  const [postInfo, setPostInfo] = useState({});
  const [maxCountCmt, setMaxCountCmt] = useState();
  const [showText, setShowText] = useState(false);
  const [showFullImg, setShowFullImg] = useState(false);
  const [imgToView, setImgToView] = useState([]);

  function handleViewFullImg(index) {
    const imgsClone = [...postInfo.images];
    [imgsClone[0], imgsClone[index]] = [imgsClone[index], imgsClone[0]];
    setImgToView(imgsClone);
    setShowFullImg(true);
  }

  const toggleShowText = () => {
    setShowText((s) => !s);
  };

  const handleGetInfoPost = useCallback(() => {
    postServices
      .getPostPageById(_id)
      .then((res) => {
        if (res.status === 200) {
          setPostInfo({ ...res.data.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [_id]);

  const minusMaxCount = useCallback(() => {
    commentServices.getLimitComments(_id).then((res) => {
      if (res.status === 200 && res.data.err === 0) {
        setMaxCountCmt(res.data.countCmt);
      }
    });
  }, [_id]);

  const nextMaxCount = useCallback(() => {
    setMaxCountCmt((pre) => pre + 1);
  }, []);

  const toggleLike = () => {
    likeServices
      .toggleLikePost({ postId: _id, userId: user?._id || null })
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
    postServices.getLike({ postId: _id }).then((res) => {
      if (res.status === 200 && res.data.err === 0) {
        setLikeInfo({
          user: [...res.data.data],
          count: res.data.likedCount || 0,
        });
      }
    });
  }, [_id]);

  useEffect(() => {
    getLike();
  }, [getLike]);

  useEffect(() => {
    handleGetInfoPost();
  }, [handleGetInfoPost]);

  useEffect(() => {
    commentServices.getLimitComments(_id).then((res) => {
      if (res.status === 200 && res.data.err === 0) {
        setMaxCountCmt(res.data.countCmt);
      }
    });
  }, [_id]);

  return (
    <div className={cx("wrap")}>
      <ModalFullScreen
        imgToView={imgToView}
        show={showFullImg}
        onHide={() => setShowFullImg(false)}
      ></ModalFullScreen>
      <div className="container">
        {source && (
          <div className={cx("back")} onClick={() => navigation(-1)}>
            <VscTriangleLeft />
            <span>Back</span>
          </div>
        )}

        <div className="row">
          <div className="col-xl-7">
            <div className="mt-2 p-4 bg-white rounded-3">
              <header className={cx("header")}>
                <div className={cx("avatar")}>
                  <div className={cx("img")}>
                    {postInfo?.user?.avatar === "svg" ? (
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
                      <Image src={postInfo?.user?.avatar || ""} />
                    )}
                  </div>
                </div>
                <div className={cx("info")}>
                  <div className={cx("user")}>
                    <h5 className={cx("name")}>{postInfo?.user?.fullName}</h5>
                    {postInfo?.user?.emailVerified && <EmailVerified />}
                  </div>
                  <span className={cx("time")}>
                    {moment(postInfo?.createdAt).startOf("minutes").fromNow()}
                  </span>
                </div>

                <More postId={_id} details={true} />
              </header>
              <main className={cx("main")}>
                <div className={cx("content")}>
                  <div className={cx("description")}>
                    <pre>
                      {showText === false
                        ? postInfo?.content?.slice(0, 500)
                        : postInfo?.content}
                      {postInfo?.content?.length > 500 &&
                        showText === false && (
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

                  {postInfo.hashTag && (
                    <span className={cx("hashTag")}>{postInfo.hashTag}</span>
                  )}
                </div>
                {postInfo?.images?.length > 0 && (
                  <div
                    className={cx(
                      "images",
                      `layout_${postInfo.images?.length}`
                    )}
                  >
                    {postInfo.images.map((image, index) => (
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
              </main>

              <div className={cx("like")}>
                <div
                  onClick={toggleLike}
                  className={cx("img", {
                    liked: !!likeInfo.user.find((u) => u.user._id === user._id),
                  })}
                >
                  {/* <Image src={Like} /> */}
                  <SlLike />
                </div>
                <span>{likeInfo?.count}</span>
              </div>
            </div>
          </div>

          <div className="col-xl-5">
            <div className="p-4 pe-0">
              <div className={cx("box")}>
                <h5 className={cx("title")}>
                  Comment <span>({maxCountCmt})</span>
                </h5>
                <CommentsBox
                  minusMaxCount={minusMaxCount}
                  showComments={true}
                  nextMaxCount={nextMaxCount}
                  postId={_id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailsPage;
