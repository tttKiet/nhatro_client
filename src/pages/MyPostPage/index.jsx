import { Link, useParams } from "react-router-dom";
import NavLeftMyPost from "../../components/navs/NavLeftMyPost";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import PrevPost from "../../components/PrevPost";
import { usePromiseTracker } from "react-promise-tracker";
import postServices from "../../services/postServices";
import BarLoading from "../../components/BarLoader";
// lazy
const PostLazy = lazy(() => import("../../components/Post"));

// scss
import styles from "./MyPostPage.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function MyPostPage() {
  const { promiseInProgress } = usePromiseTracker({ area: "up_post" });
  const [maxDocPost, setMaxDocPost] = useState();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(2);
  const { id } = useParams();

  const mergePostsNew = () => {
    postServices
      .getPostUser({ _author: id, page: 1 })
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          setPosts((prev) => [res?.data?.data?.posts[0], ...prev]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    postServices
      .getPostUser({ _author: id, page: page })
      .then((res) => {
        setPosts((prev) => [...prev, ...res.data.data.posts]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [id, page]);

  const nextPagePost = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY + 20 >= document.body.offsetHeight &&
      !isLoading
    ) {
      nextPagePost();
      loadPosts();
    }
  }, [isLoading, loadPosts, nextPagePost]);

  useEffect(() => {
    postServices
      .getPostUser({ _author: id, page: 1 })
      .then((res) => {
        if (res?.status === 200) {
          setPosts([...res.data.data.posts]);
          setMaxDocPost(res.data.data.limit);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (posts.length >= maxDocPost) {
      return;
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, maxDocPost, posts.length]);

  return (
    <div className={cx("wrap")}>
      {console.log(posts)}
      {/* modal */}

      <div className={cx("nav")}>
        <NavLeftMyPost mergePostsNew={mergePostsNew} />
      </div>
      <div className={cx("my-post")}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {promiseInProgress && (
                <div className={cx("bar_loading", "post")}>
                  <div className={cx("load")}>
                    Posting <span>...</span>
                  </div>
                  <BarLoading />
                </div>
              )}
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <Suspense key={index} fallback={<PrevPost />}>
                    <PostLazy
                      content={post?.content}
                      createdAt={post?.createdAt}
                      images={post?.images || []}
                      authorName={post?.user.fullName}
                      authorImage={post?.user.avatar}
                      hashTag={post?.hashTag}
                    />
                  </Suspense>
                ))
              ) : (
                <p>You dont any post ... </p>
              )}
              {isLoading && <PrevPost />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPostPage;
