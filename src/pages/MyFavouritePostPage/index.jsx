import { useEffect, useState } from "react";
import NavLeftMyPost from "../../components/navs/NavLeftMyPost";
import { useAuth } from "../../hooks";
import { favouritePostServices, postServices } from "../../services";
import styles from "./MyFavouritePostPage.module.scss";
import classNames from "classNames/bind";
import FavouritePost from "../../components/FavouritePost";

const cx = classNames.bind(styles);

function MyFavouritePostPage() {
  const [, , user] = useAuth();
  const [posts, setPosts] = useState([]);
  const [fvPost, setFvPost] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  const mergePostsNew = () => {
    postServices
      .getPostUser({ _author: user._id, page: 1 })
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

  const getFavouritePost = async () => {
    try {
      const res = await favouritePostServices.getFavouritePost(user._id);
      if (res.err === 0) {
        setFvPost(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleChangeSelect(e) {
    if (e.target.value === "newest" && !isFilter) {
      const fvReverse = [...fvPost].reverse();
      setFvPost(fvReverse);
      setIsFilter(true);
    } else {
      if (isFilter === true) {
        const fvReverse = [...fvPost].reverse();
        setFvPost(fvReverse);
        setIsFilter(false);
      } else {
        setFvPost((prev) => prev);
        setIsFilter(false);
      }
    }
  }

  useEffect(() => {
    getFavouritePost();
  }, []);

  return (
    <div className={cx("wrap")}>
      {console.log("casd", fvPost)}
      <div className={cx("nav")}>
        <NavLeftMyPost mergePostsNew={mergePostsNew} />
      </div>
      <div className={cx("my-favourite-post")}>
        <div className="container">
          {/* filter */}
          <div className="row ">
            <div className="mb-3 d-flex flex-row-reverse">
              <div style={{ width: "120px" }}>
                <select
                  onChange={(e) => handleChangeSelect(e)}
                  className="form-select p-2 rounded-3 border border-primary-subtle shadow-sm border-1"
                  aria-label="Default select example"
                  defaultValue="all"
                >
                  <option value="all">All</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Favourite post */}
          {fvPost.map((post, index) => (
            <FavouritePost key={index} post={post}></FavouritePost>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyFavouritePostPage;
