// icons
import { BsPlusSquareDotted, BsPostcard } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { LuHotel } from "react-icons/lu";

// scss
import classNames from "classNames/bind";
import styles from "./NavLeftMyPost.module.scss";
import { Link } from "react-router-dom";
import ModalUpPost from "../../modal/ModalUpPost";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function NavLeftMyPost({ mergePostsNew }) {
  const [openModal, setOpenModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleClickUpPost = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setShowMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className={cx("wrap", { show: showMenu })}>
        <ModalUpPost
          show={openModal}
          mergePostsNew={mergePostsNew}
          setShow={setOpenModal}
        />
        <div className={cx("contain")}>
          <div className={cx("dot")}>
            <div></div>
            <div></div>
            <div></div>

            <div
              className={cx("back")}
              onClick={() => setShowMenu(false)}
              title="back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </div>
          </div>

          <nav className={cx("breadcrumb-nav")} aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/post">Post</Link>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                My Post
              </li>
            </ol>
          </nav>

          <div className={cx("control")}>
            <h5 className={cx("title")}>Control</h5>
            <ul className={cx("list")}>
              <li>
                <Link to={"/"} className={cx("item")}>
                  <AiOutlineHome />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/post" className={cx("item")}>
                  <BsPostcard />
                  Post
                </Link>
              </li>
              <li>
                <Link to="/motel" className={cx("item")}>
                  <LuHotel />
                  Motel
                </Link>
              </li>
            </ul>
          </div>

          <div className={cx("menu")}>
            <h5 className={cx("title")}>Menu</h5>
            <ul className={cx("list")}>
              <li onClick={handleClickUpPost}>
                <div className={cx("item")}>
                  <BsPlusSquareDotted />
                  Up Post
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={cx("btn_control")} onClick={() => setShowMenu(true)}>
        <div className={cx("icon")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default NavLeftMyPost;
