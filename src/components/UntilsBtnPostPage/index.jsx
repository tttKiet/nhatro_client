import PropTypes from "prop-types";
import { useAuth } from "../../hooks";
import postServices from "../../services/postServices";

import ModalUpPost from "../modal/ModalUpPost";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// icons
import { VscTriangleLeft } from "react-icons/vsc";
import { BsPlusSquareDotted } from "react-icons/bs";
import { SiPostcss } from "react-icons/si";
import { FiBookmark } from "react-icons/fi";

// scss
import styles from "./UntilsBtnPostPage.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function UntilsBtnPostPage({ setPosts }) {
  const [showMenu, setShowMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const untils = useRef(null);
  const [, , user] = useAuth();

  const handleGetNewPost = useCallback(async () => {
    const res = await postServices.getUserNewPost({ _author: user._id });
    if (res.status === 200) {
      return res.data.data[0];
    }

    return false;
  }, [user._id]);

  const mergePostsNew = useCallback(async () => {
    const newpost = await handleGetNewPost();

    if (newpost) {
      setPosts((prev) => [newpost, ...prev]);
    }
  }, [handleGetNewPost, setPosts]);
  useEffect(() => {
    const handleClickWindow = (e) => {
      if (untils.current && !untils.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    if (!showMenu) return;
    window.addEventListener("click", handleClickWindow);
    return () => {
      window.removeEventListener("click", handleClickWindow);
    };
  }, [showMenu]);

  return (
    <div className={cx("wrap", { showMenu })} ref={untils}>
      <ModalUpPost
        show={openModal}
        mergePostsNew={mergePostsNew}
        setShow={setOpenModal}
      />
      <div className={cx("menu")}>
        <ul className={cx("list")}>
          <li
            onClick={() => {
              setOpenModal(true);
              setShowMenu(false);
            }}
          >
            <div className="d-flex gap-3">
              <div className={cx("icon")}>
                <BsPlusSquareDotted />
              </div>
              <span className={cx("title")}>Up Post</span>
            </div>
          </li>

          <li>
            <Link
              to={`/user/my-post`}
              className="d-flex gap-3 text-decoration-none"
            >
              <div className={cx("icon")}>
                <SiPostcss />
              </div>
              <span className={cx("title")}>My post</span>
            </Link>
          </li>

          <li>
            <Link
              to={`/user/my-favourite-post`}
              className="d-flex gap-3 text-decoration-none"
            >
              <div className={cx("icon")}>
                <FiBookmark />
              </div>
              <span className={cx("title")}>Favourite post</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className={cx("bubble")}>
        <div className={cx("triangle")} onClick={() => setShowMenu((s) => !s)}>
          <VscTriangleLeft />
        </div>
      </div>
    </div>
  );
}

UntilsBtnPostPage.propTypes = {
  setPosts: PropTypes.func,
};

export default UntilsBtnPostPage;
