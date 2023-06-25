// icons
import { BsPlusSquareDotted, BsPostcard } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { LuHotel } from "react-icons/lu";

// scss
import classNames from "classNames/bind";
import styles from "./NavLeftMyPost.module.scss";
import { Link } from "react-router-dom";
import ModalUpPost from "../../modal/ModalUpPost";
import { useState } from "react";

const cx = classNames.bind(styles);

function NavLeftMyPost({ mergePostsNew }) {
  const [openModal, setOpenModal] = useState(false);

  const handleClickUpPost = () => {
    setOpenModal(true);
  };

  return (
    <div className={cx("wrap")}>
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
  );
}

export default NavLeftMyPost;
