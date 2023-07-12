import { useCallback, useEffect, useRef, useState } from "react";
import NavLeftMyPost from "../../components/navs/NavLeftMyPost";
import { useAuth } from "../../hooks";
import { favouritePostServices, postServices } from "../../services";
import styles from "./MyFavouritePostPage.module.scss";
import classNames from "classNames/bind";
import FavouritePost from "../../components/FavouritePost";
import { VscTriangleLeft } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function MyFavouritePostPage() {
  const selectRef = useRef(null);
  const [, , user] = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [posts, setPosts] = useState([]);
  const [fvPost, setFvPost] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const navigate = useNavigate();

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

  const getFavouritePost = useCallback(async () => {
    try {
      const res = await favouritePostServices.getFavouritePost(user._id);
      if (res.err === 0) {
        if (selectRef.current.value === "newest") {
          const fvReverse = [...res.data].reverse();
          setFvPost(fvReverse);
        } else {
          setFvPost(res.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [user._id]);

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
  }, [getFavouritePost]);

  return (
    <div className={cx("wrap")}>
      <div className={cx("nav")}>
        <NavLeftMyPost mergePostsNew={mergePostsNew} />
      </div>
      <div className={cx("my-favourite-post")}>
        <div className="container">
          <div className={cx("back")} onClick={() => navigate(-1)}>
            <VscTriangleLeft />
            <span>Back</span>
          </div>
          {/* filter */}
          <div className="row ">
            <div className="mb-3 d-flex flex-row-reverse w-100">
              <div style={{ width: "120px" }}>
                <select
                  ref={selectRef}
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
            <FavouritePost
              key={index}
              post={post}
              getFvPost={() => getFavouritePost()}
            ></FavouritePost>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyFavouritePostPage;
