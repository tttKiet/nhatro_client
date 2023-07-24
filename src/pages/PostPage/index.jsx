import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { usePromiseTracker } from "react-promise-tracker";
const PostLazy = lazy(() => import("../../components/Post"));

import BarLoading from "../../components/BarLoader";
import postServices from "../../services/postServices";
import PrevPost from "../../components/PrevPost";
// scss
import styles from "./PostPage.module.scss";
import classNames from "classNames/bind";
import UntilsBtnPostPage from "../../components/UntilsBtnPostPage";

const cx = classNames.bind(styles);

function PostPage() {
  const { promiseInProgress } = usePromiseTracker({ area: "up_post" });
  const [page, setPage] = useState(2);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [maxDocPost, setMaxDocPost] = useState();

  const loadPosts = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await postServices.getPostPage({ page: page });
      if (res?.status === 200) {
        setPosts((prev) => [...prev, ...res.data.data.posts]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [page, setPosts]);

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
    postServices.getPostPage({ page: 1 }).then((res) => {
      if (res?.status === 200) {
        // console.log(res.data.data.posts);
        setPosts([...res.data.data.posts]);
        setMaxDocPost(res.data.data.limit);
      }
    });
  }, []);

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
    <>
      <div className={cx("wrap")}>
        <div className="container">
          <div className="row">
            <div className="col-12 position-relative">
              <UntilsBtnPostPage setPosts={setPosts} />

              <div className={cx("banner", "d-none d-xxl-inline-block")}>
                <div className={cx("data")}>
                  <div className={cx("content")}>Quang cao</div>
                </div>
              </div>
              <div className={cx("posts")}>
                {promiseInProgress && (
                  <div className={cx("bar_loading", "post")}>
                    <div className={cx("load")}>
                      Posting <span>...</span>
                    </div>
                    <BarLoading />
                  </div>
                )}
                {posts.map((post, index) => (
                  <Suspense key={index} fallback={<PrevPost />}>
                    <PostLazy
                      userEmailVerified={post?.user?.emailVerified || false}
                      setPosts={setPosts}
                      content={post?.content}
                      createdAt={post?.createdAt}
                      images={post?.images}
                      authorName={post?.user?.fullName}
                      authorImage={post?.user?.avatar}
                      author_id={post?.user?._id}
                      hashTag={post?.hashTag}
                      postId={post?._id}
                    />
                  </Suspense>
                ))}
                {isLoading && <PrevPost />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostPage;
