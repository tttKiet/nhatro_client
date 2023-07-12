import { Image } from "react-bootstrap";
import { useCallback, useEffect, useState, Suspense, lazy } from "react";
const ImageLazy = lazy(() => import("react-bootstrap/Image"));
import styles from "./AnotherProfilePage.module.scss";
import classNames from "classNames/bind";
import {
  BsEnvelopeFill,
  BsFillCalendarEventFill,
  BsHouseFill,
  BsMapFill,
  BsMessenger,
  BsPatchCheck,
  BsPostcardHeartFill,
  BsSearch,
  BsTelephoneFill,
} from "react-icons/bs";

import Post from "../../components/Post";
import { useParams } from "react-router-dom";
import { postServices } from "../../services";

import ErrorPage from "../ErrorPage";
import moment from "moment";

const cx = classNames.bind(styles);

function AnotherProfilePage() {
  const { _id } = useParams();
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [strangeUser, setStrangeUser] = useState([]);

  const coverImg = [
    "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_640.jpg",
    "https://cdn.pixabay.com/photo/2018/08/21/23/29/forest-3622519_640.jpg",
    "https://cdn.pixabay.com/photo/2016/10/18/21/22/beach-1751455_640.jpg",
    "https://cdn.pixabay.com/photo/2018/08/23/07/35/thunderstorm-3625405_640.jpg",
    "https://cdn.pixabay.com/photo/2016/10/21/14/50/plouzane-1758197_640.jpg",
    "https://cdn.pixabay.com/photo/2016/02/10/21/57/heart-1192662_640.jpg",
    "https://cdn.pixabay.com/photo/2013/07/25/13/01/stones-167089_640.jpg",
    "https://cdn.pixabay.com/photo/2018/04/28/22/03/tree-3358468_640.jpg",
    "https://cdn.pixabay.com/photo/2017/10/10/07/48/hills-2836301_640.jpg",
    "https://cdn.pixabay.com/photo/2017/05/11/11/15/workplace-2303851_640.jpg",
  ];

  let imgRandom = Math.floor(Math.random() * 10 + 1);

  const getPost = useCallback(async () => {
    try {
      const res = await postServices.getPostUser({ _author: _id });
      if (res.data.err === 0) {
        setPosts(res.data.data);
        setIsError(false);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  }, [_id]);

  useEffect(() => {
    getPost();
  }, [getPost, _id]);

  useEffect(() => {
    if (posts.length !== 0) {
      setStrangeUser(posts.posts[0].user);
    }
  }, [posts, setPosts]);

  if (isError) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <div>
      {console.log("post", strangeUser)}
      <div className={cx("wrap-all", "shadow-sm")}>
        <div className={cx("wrap", "container")}>
          <div className={cx("upper")}>
            {/* cover */}
            <div className={cx("cover")}>
              <Image
                className={cx("img-cover")}
                src={coverImg[imgRandom]}
              ></Image>
            </div>

            {/* Title */}
            <div className={cx("title")}>
              <div className={cx("avatar-wrap")}>
                <Suspense
                  fallback={
                    <BsEnvelopeFill className="fs-xxl"></BsEnvelopeFill>
                  }
                >
                  <ImageLazy
                    className={cx("avatar-img")}
                    src={
                      strangeUser?.avatar
                        ? strangeUser?.avatar
                        : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.994684043.1684584897&semt=sph"
                    }
                  ></ImageLazy>
                </Suspense>
              </div>
              <div className={cx("user")}>
                <h2 className="m-0 fw-bold mb-1">
                  {strangeUser?.fullName}
                  <BsPatchCheck
                    className="ms-2 mb-1 fs-xl"
                    style={{ color: "hsl(214, 89%, 52%)" }}
                  ></BsPatchCheck>
                </h2>
                <p className="text-body-tertiary fs-m">520K người theo dõi</p>
              </div>
              <div className={cx("message")}>
                <button className={cx("message-btn", "me-2")}>
                  <BsMessenger className="me-2"></BsMessenger>Message
                </button>
                <button
                  className={cx("message-btn")}
                  style={{ backgroundColor: "#CCCCCC", color: "black" }}
                >
                  <BsSearch className="me-2 "></BsSearch>Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-xl">
        <div className={cx("content", "row")}>
          <div className={cx("introduce", "col-xxl-5 col-lg-4  shadow")}>
            <div className={cx("title")}>
              <p className="fs-xl fw-bold mb-1">Introduce</p>
              <p className="fs-m text-center mb-1 fst-italic">
                {strangeUser?.bio}
              </p>
            </div>

            <div className={cx("about")}>
              <p className="fs-m d-flex align-items-center">
                <BsPostcardHeartFill
                  className={cx("icon")}
                ></BsPostcardHeartFill>
                {strangeUser?.personalities?.map((item, index) => (
                  <span
                    key={index}
                    className="badge rounded me-2"
                    style={{
                      background: "#78C1F3",
                      color: "white",
                      fontSize: "14px",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </p>

              <p className="fs-m d-flex align-items-center">
                <BsEnvelopeFill className={cx("icon")}></BsEnvelopeFill>{" "}
                {strangeUser?.email}
              </p>

              <p className="fs-m d-flex align-items-center">
                <BsMapFill className={cx("icon")}></BsMapFill>{" "}
                {strangeUser?.address}
              </p>

              <p className="fs-m d-flex align-items-center">
                <BsHouseFill className={cx("icon")}></BsHouseFill> Was studying
                at {strangeUser?.school}
              </p>

              <p className="fs-m d-flex align-items-center">
                <BsTelephoneFill className={cx("icon")}></BsTelephoneFill>{" "}
                {strangeUser?.phone?.slice(0, 7)}***
              </p>

              {strangeUser?.createdAt && (
                <p className="fs-m d-flex align-items-center">
                  <BsFillCalendarEventFill
                    className={cx("icon")}
                  ></BsFillCalendarEventFill>{" "}
                  Joined &nbsp;
                  {moment(strangeUser.createdAt).format("MMM Do YY")}
                </p>
              )}
            </div>
          </div>
          <div className={cx("post-wrap", "col-xxl-7 col-lg-8 col-md-12")}>
            {posts.posts?.map((post) => (
              <Post
                key={post._id}
                content={post?.content}
                createdAt={post?.createdAt}
                images={post?.images || []}
                authorName={post?.user.fullName}
                authorImage={post?.user.avatar}
                author_id={post?.user._id}
                hashTag={post?.hashTag}
                postId={post?._id}
              ></Post>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnotherProfilePage;
