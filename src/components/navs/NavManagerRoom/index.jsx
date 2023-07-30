import { BsPlusSquareDotted, BsPostcard } from "react-icons/bs";
import styles from "./NavManagerRoom.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classNames/bind";
import { toast } from "react-toastify";
import { AiOutlineHome } from "react-icons/ai";
import { BsArrowLeftSquare } from "react-icons/bs";

import { Link } from "react-router-dom";
import { LuHotel } from "react-icons/lu";

const cx = classNames.bind(styles);
function NavManagerRoom() {
  const navigation = useNavigate();
  const location = useLocation();
  const url = location.pathname;

  // click back
  function handleCLickBack() {
    navigation(-1);
  }

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("contain")}>
          <div className={cx("dot")}>
            <div></div>
            <div></div>
            <div></div>

            <div className={cx("back")} onClick={() => {}} title="back">
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
          <h3 className={cx("title")}>Manager Room</h3>

          <div className={cx("control")}>
            <h5 className={cx("title")}>Control</h5>
            <ul className={cx("list")}>
              <li>
                <Link
                  to={"/user/manager-my-room"}
                  className={cx("item", {
                    active: url.includes("my-room"),
                  })}
                >
                  <AiOutlineHome />
                  My room
                </Link>
              </li>
              <li>
                <Link
                  to="/user/rent-room"
                  className={cx("item", {
                    active: url.includes("rent-room"),
                  })}
                >
                  <BsPostcard />
                  Rent room
                </Link>
              </li>
              <li>
                <Link to="/motel" className={cx("item")}>
                  <LuHotel />
                  Bill
                </Link>
              </li>
            </ul>
          </div>

          <div className={cx("menu")}>
            <h5 className={cx("title")}>Menu</h5>
            <ul className={cx("list")}>
              <li>
                <div
                  className={cx("item")}
                  onClick={() =>
                    toast.warning("Function updating...", {
                      delay: 0,
                      autoClose: 2000,
                      position: "bottom-center",
                    })
                  }
                >
                  <BsPlusSquareDotted />
                  Function
                </div>
              </li>
            </ul>
          </div>
          <div className={cx("menu")}>
            <h5 className={cx("title")}>Order</h5>
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
                  View post
                </Link>
              </li>
              <li>
                <Link to="/motel" className={cx("item")}>
                  <LuHotel />
                  About motel
                </Link>
              </li>
            </ul>
          </div>

          <div className={cx("back")} onClick={handleCLickBack}>
            <BsArrowLeftSquare />
            Back
          </div>
        </div>
      </div>
    </>
  );
}

export default NavManagerRoom;
