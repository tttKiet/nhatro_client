import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import { HiOutlinePencil } from "react-icons/hi";
import { BsHeart } from "react-icons/bs";
import PropTypes from "prop-types";

// scss
import styles from "./More.module.scss";
import classNames from "classNames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import ModalUpPost from "../modal/ModalUpPost";
import { useAuth } from "../../hooks";
import { AiOutlineCheckCircle, AiOutlineDelete } from "react-icons/ai";
import { ToastContext } from "../../untils/context";
import postServices from "../../services/postServices";
import { favouritePostServices } from "../../services";
const cx = classNames.bind(styles);

function More({ postId, details, postInfo, setPosts }) {
  const toast = useContext(ToastContext);
  const [, , user] = useAuth();
  const [show, setShow] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const menuRef = useRef(null);
  const moreRef = useRef(null);

  const handleClickEdit = () => {
    setShow(false);
    setOpenModalEdit(true);
  };

  const handleDeletePost = (offToastId) => {
    toast.dismiss(offToastId);
    toast
      .promise(postServices.deletePost(postId), {
        loading: "Deleting...",
        success: <span>Deleted!</span>,
        error: <span>Could not delete.</span>,
      })
      .then((res) => {
        if (res.status === 200) {
          setPosts((prev) => {
            let index;
            for (let i = 0; i < prev.length; i++) {
              if (prev[i]._id === postId) {
                index = i;
                break;
              }
            }
            const newPosts = [...prev];
            newPosts.splice(index, 1);
            return newPosts;
          });
        }
      });
  };

  const handleClickDelete = () => {
    toast.success(
      (t) => (
        <div className="d-flex justify-content-center align-items-center">
          <p className="m-0">
            Are you sure to <b>delete</b>?
          </p>
          <AiOutlineCheckCircle
            onClick={() => handleDeletePost(t.id)}
            style={{
              color: "#0075f5",
              fontSize: "20px",
              marginLeft: "12px",
              cursor: "pointer",
            }}
          />
        </div>
      ),
      {
        icon: (
          <div className="bg-danger p-1 border border-1 rounded shadow">
            <AiOutlineDelete
              style={{
                color: "white",
                fontSize: "22px",
              }}
            />
          </div>
        ),
        duration: 6000,
      }
    );
  };

  async function handleSavePost(postId) {
    try {
      const res = await favouritePostServices.addFavouritePost(
        user._id,
        postId
      );
      if (res.err === 0) {
        toast.success(res.message);
        setShow(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
                  <HiOutlinePencil />
                  <span className={cx("title")}>Edit</span>
                </button>
              </li>
            )}

            {user?._id === postInfo?.author_id && (
              <li className={cx("item")}>
                <button onClick={handleClickDelete}>
                  <CiTrash />
                  <span className={cx("title")}>Delete</span>
                </button>
              </li>
            )}

            {/* <li className={cx("item")}>
              <Link to={`/post/${postId}`}>
                <BsHeart />
                <span className={cx("title")}>Save</span>
              </Link>
            </li> */}

            <li className={cx("item")}>
              <button onClick={() => handleSavePost(postId)}>
                <BsHeart />
                <span className={cx("title")}>Save</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

More.propTypes = {
  postId: PropTypes.string,
  details: PropTypes.bool,
  postInfo: PropTypes.object,
  setPosts: PropTypes.func,
};

export default More;
