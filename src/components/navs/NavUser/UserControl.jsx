import classNames from "classNames/bind";
import { Image } from "react-bootstrap";
import styles from "./NavUser.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import MenuItem from "./MenuItem";
import { useAuth } from "../../../hooks";
import Swal from "sweetalert2";
import { userSlice } from "../../../redux/reducers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuPropDown from "../../MenuDropDowns";
import { userServices } from "../../../services";

const cx = classNames.bind(styles);
function UserControl() {
  const [isOpen, setIsOpen] = useState({
    user: false,
    notification: false,
    message: false,
    more: false,
  });
  const [, , userCur] = useAuth();
  const lastNameSplit = userCur?.fullName?.split(" ");
  const lastName = lastNameSplit && lastNameSplit[lastNameSplit.length - 1];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    Swal.fire({
      title: "Are you sure to logout?",
      showConfirmButton: true,
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      text: "Bạn có thật sự muốn đăng xuất?",
      confirmButtonText: "Đăng xuất ngay",
      reverseButtons: true,
      confirmButtonColor: "#d55",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await userServices.loggout();
        if (res === "ok") {
          navigate("/login");
          dispatch(userSlice.actions.toggleLogin());
        }
      }
    });
  }, [dispatch, navigate]);
  const bodyMenuUser = useMemo(() => {
    return (
      <div className={cx("menu", "User_Control-user-menu")}>
        <ul>
          <MenuItem
            title={userCur.email ? userCur.email : "Email not available!"}
            onlyView
            svg={
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
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            }
          />
          <MenuItem
            to={`/profile/${userCur?._id}`}
            title="Personal page"
            svg={
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
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
          />

          <MenuItem
            title="Check version"
            svg={
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
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
          <MenuItem
            onClick={handleLogout}
            title="Loggout"
            svg={
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            }
          />
        </ul>
      </div>
    );
  }, [handleLogout, userCur?._id, userCur.email]);

  const toggleOpen = useCallback((type) => {
    setIsOpen((prev) => {
      const newOb = { ...prev };
      const isOpen = prev[type];
      for (let i in prev) {
        newOb[i] = false;
      }
      newOb[type] = !isOpen;
      return newOb;
    });
  }, []);

  useEffect(() => {
    const handleClickWindow = (e) => {
      const isClickThis = e.target.closest(".onclickOff");
      if (!isClickThis) {
        setIsOpen(() => ({
          user: false,
          notification: false,
        }));
      }
    };
    window.addEventListener("click", handleClickWindow);
    return () => {
      window.removeEventListener("click", handleClickWindow);
    };
  }, []);

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="d-none d-xl-block">
          <h4 className={cx("title")}>Motel your home</h4>
        </div>

        <div className={cx("more_user")}>
          <span
            className={cx(
              "notification",
              "d-flex align-items-center",
              "more_user-item",
              "onclickOff"
            )}
            onClick={() => toggleOpen("notification")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={cx("icon")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
              />
            </svg>
            {isOpen.notification && <MenuPropDown body={<p>notifcation</p>} />}
          </span>
          <span
            className={cx(
              "notification",
              "d-flex align-items-center",
              "more_user-item",
              "onclickOff"
            )}
            onClick={() => toggleOpen("message")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={cx("icon")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>

            {isOpen.message && <MenuPropDown body={<p>Message</p>} />}
          </span>
          <span
            className={cx(
              "notification",
              "d-flex align-items-center d-lg-none",
              "more_user-item",
              "onclickOff"
            )}
            onClick={() => toggleOpen("user")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={cx("icon")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            {isOpen.user && <MenuPropDown body={bodyMenuUser} />}
          </span>
          <div
            className={cx(
              "d-flex align-items-center gap-2 d-lg-flex d-none",
              "more_user-item",
              "onclickOff"
            )}
            onClick={() => toggleOpen("user")}
          >
            <span className={cx("wrap-avt")}>
              <span
                className={cx("avt", {
                  border: !userCur?.avatar?.includes("https:"),
                })}
              >
                {userCur?.avatar?.includes("https:") ? (
                  <Image src={userCur.avatar} />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                )}
              </span>
              {isOpen.user && <MenuPropDown body={bodyMenuUser} />}
            </span>
            <span className={cx("name")}>
              Hi&nbsp;<span className="hight-pink fw-bold">{lastName} !</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserControl;
