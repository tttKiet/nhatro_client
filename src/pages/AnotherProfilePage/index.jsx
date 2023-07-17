import { Image } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import styles from "./AnotherProfilePage.module.scss";
import classNames from "classNames/bind";
import {
  BsEnvelopeFill,
  BsFillFilePostFill,
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
import { postServices, userServices } from "../../services";

import ErrorPage from "../ErrorPage";
import moment from "moment";
import { PulseLoader } from "react-spinners";

const cx = classNames.bind(styles);

function AnotherProfilePage() {
  const { _id } = useParams();
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [strangeUser, setStrangeUser] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

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
        if (res.data.data.posts.length === 0) {
          setIsEmpty(true);
        }
        setIsError(false);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  }, [_id]);

  const getUserById = async () => {
    try {
      const res = await userServices.getUserById(_id);
      if (res.err === 0) {
        setStrangeUser(res.dataUser);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, [getPost, _id]);

  useEffect(() => {
    // console.log("posts", posts);
    if (posts && posts.length !== 0) {
      if (posts.posts.length > 0) {
        setStrangeUser(posts.posts[0].user);
      } else {
        getUserById();
      }
    }
    // else {
    //   getUserById();
    // }
  }, [posts, setPosts]);

  if (isError) {
    return <ErrorPage></ErrorPage>;
  }

  if (!isEmpty && Object.keys(strangeUser).length === 0) {
    return (
      <div className="h-100 w-100 d-flex justify-content-center align-items-center mt-5">
        <PulseLoader color="rgb(120, 193, 243)" margin={6} size={30} />
      </div>
    );
  }

  // if (isEmpty) {
  //   return <h1>Errorr</h1>;
  // }

  return (
    <div>
      {console.log("strangeUser", strangeUser)}
      {console.log("isEmpty", isEmpty)}
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
                <Image
                  className={cx("avatar-img")}
                  src={
                    strangeUser.avatar && strangeUser.avatar.length > 4
                      ? strangeUser.avatar
                      : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.994684043.1684584897&semt=sph"
                  }
                ></Image>
              </div>
              <div className={cx("user")}>
                <h2 className="m-0 fw-bold mb-1">
                  {strangeUser?.fullName}
                  {strangeUser?.type === "user" &&
                    strangeUser?.emailVerified && (
                      <BsPatchCheck
                        className="ms-2 mb-1 fs-xl"
                        style={{ color: "hsl(214, 89%, 52%)" }}
                      ></BsPatchCheck>
                    )}
                </h2>
                <p className="text-body-tertiary fs-m">
                  Has joined since &nbsp;
                  {moment(strangeUser.createdAt).format("MMM Do YY")}
                </p>
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
          <div className={cx("introduce", "col-xxl-5 col-lg-4  ")}>
            <div className={cx("title")}>
              <p className="fs-xl fw-bold mb-1">Introduce</p>
              {strangeUser.bio && (
                <p className="fs-m text-center mb-1 fst-italic">
                  {strangeUser?.bio}
                </p>
              )}
            </div>

            <div className={cx("about")}>
              {strangeUser.personalities &&
                strangeUser.personalities.length > 0 && (
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
                )}

              <p className="fs-m d-flex align-items-center">
                <BsEnvelopeFill className={cx("icon")}></BsEnvelopeFill>{" "}
                {strangeUser?.email}
              </p>

              <p className="fs-m d-flex align-items-center">
                <BsMapFill className={cx("icon")}></BsMapFill>{" "}
                {strangeUser?.address}
              </p>

              {strangeUser.school && (
                <p className="fs-m d-flex align-items-center">
                  <BsHouseFill className={cx("icon")}></BsHouseFill> Was
                  studying at {strangeUser?.school}
                </p>
              )}

              <p className="fs-m d-flex align-items-center">
                <BsTelephoneFill className={cx("icon")}></BsTelephoneFill>{" "}
                {strangeUser?.phone?.slice(0, 7)}***
              </p>

              {!isEmpty && strangeUser?.createdAt && (
                <p className="fs-m d-flex align-items-center">
                  <BsFillFilePostFill
                    className={cx("icon")}
                  ></BsFillFilePostFill>{" "}
                  Has had {posts.posts?.length} posts.
                </p>
              )}
            </div>
          </div>

          <div className={cx("post-wrap", "col-xxl-7 col-lg-8 col-md-12")}>
            {isEmpty && (
              <div className="fs-m h-100 p-2 d-flex flex-column justify-content-center align-items-center shadow-sm w-75 text-center  bg-white rounded-3">
                <p className="fs-l fst-italic">
                  This user has not had any posts.
                </p>
              </div>
            )}
            {!isEmpty &&
              posts.posts?.map((post) => (
                <Post
                  size="lg"
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
