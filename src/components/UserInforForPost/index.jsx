import { Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { userServices } from "../../services/";

// scss
import classNames from "classNames/bind";
import styles from "./UserInforForPost.module.scss";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function UserInforForPost() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    userServices.getUserById(id).then((res) => {
      if (res.err === 0) {
        setUserInfo(res.dataUser);
      }
    });
  }, [id]);
  return (
    <div className={cx("wrap")}>
      <div className={cx("contair")}>
        <div className={cx("personal")}>
          <div className={cx("avt")}>
            <Image src={userInfo?.avatar}></Image>
          </div>
          <div className={cx("infor")}>
            <h5 className={cx("name")}>{userInfo?.fullName}</h5>
            <h6>
              Id: <i className={cx("id")}>{userInfo?._id}</i>
            </h6>
          </div>
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
