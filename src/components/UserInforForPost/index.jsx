import { Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { userServices } from "../../services/";
import { useAuth } from "../../hooks";

// scss
import classNames from "classNames/bind";
import styles from "./UserInforForPost.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function UserInforForPost() {
  const [, , user] = useAuth();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    userServices.getUserById(user._id).then((res) => {
      if (res.err === 0) {
        setUserInfo(res.dataUser);
      }
    });
  }, [user._id]);
  return (
    <div className={cx("wrap")}>
      <div className={cx("contair")}>
        <div className={cx("personal")}>
          <div className={cx("avt")}>
            {userInfo?.avatar === "svg" ? (
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
            ) : (
              <Image src={userInfo?.avatar}></Image>
            )}
          </div>
          <div className={cx("infor")}>
            <h5 className={cx("name")}>{userInfo?.fullName}</h5>
            <h6>
              Id: <i className={cx("id")}>{userInfo?._id}</i>
            </h6>
          </div>

          <Link to={"/profile?tag=my-profile&modal=open"} className={cx("pen")}>
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </Link>
        </div>
        {userInfo?.bio && (
          <div className="d-flex justify-content-center mt-3">
            {userInfo.bio}
          </div>
        )}
        {userInfo?.personalities && userInfo.personalities.length > 0 && (
          <ul className={cx("list-personality", "mt-3")}>
            {userInfo.personalities.map((per, index) => (
              <li key={index}>{per}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserInforForPost;
