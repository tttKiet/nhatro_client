import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";

// scss
import styles from "./More.module.scss";
import classNames from "classNames/bind";
import { useEffect, useRef, useState } from "react";
import ModalUpPost from "../modal/ModalUpPost";
import { useAuth } from "../../hooks";
const cx = classNames.bind(styles);

function More({ postId, details, postInfo, setPosts }) {
  const [, , user] = useAuth();
  const [show, setShow] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const menuRef = useRef(null);
  const moreRef = useRef(null);

  const handleClickEdit = () => {
    setShow(false);
    setOpenModalEdit(true);
  };

  const handleMergePostsEdit = (postEdit) => {
    setPosts((prev) => {
      const newPosts = prev.map((v) => {
        if (v._id === postEdit._id) {
          return postEdit;
        } else {
          return v;
        }
      });

      return newPosts;
    });
  };

  // Toggle show menu
  useEffect(() => {
    const handleClickWindow = (e) => {
      if (
        menuRef.current &&
        moreRef.current &&
        !menuRef.current.contains(e.target) &&
        !moreRef.current.contains(e.target)
      ) {
        setShow(false);
      }
    };
    if (!show) return;
    window.addEventListener("click", handleClickWindow);
    return () => {
      window.removeEventListener("click", handleClickWindow);
    };
  }, [show]);

  return (
    <>
      <ModalUpPost
        show={openModalEdit}
        mergePostsNew={handleMergePostsEdit}
        setShow={setOpenModalEdit}
        postInfo={postInfo}
      />
      <div className={cx("more")}>
        <div
          className={cx("icon")}
          onClick={() => setShow((s) => !s)}
          ref={moreRef}
        >
          <IoIosMore />
        </div>

        <div className={cx("menu", { show: show })} ref={menuRef}>
          <svg
            height="12"
            viewBox="0 0 21 12"
            width="21"
            className={cx("triangle")}
            fill="#fff"
          >
            <path d="M20.685.12c-2.229.424-4.278 1.914-6.181 3.403L5.4 10.94c-2.026 2.291-5.434.62-5.4-2.648V.12h20.684z"></path>
          </svg>
          <ul className={cx("list")}>
            {user?._id === postInfo?.author_id && (
              <li className={cx("item")}>
                <button onClick={handleClickEdit}>
                  <TbListDetails />
                  <span className={cx("title")}>Edit</span>
                </button>
              </li>
            )}
            {!details && (
              <li className={cx("item")}>
                <Link to={`/post/${postId}`} state={{ source: "other-page" }}>
                  <TbListDetails />
                  <span className={cx("title")}>Details</span>
                </Link>
              </li>
            )}
            <li className={cx("item")}>
              <Link to={`/post/${postId}`}>
                <TbListDetails />
                <span className={cx("title")}>Save</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default More;
