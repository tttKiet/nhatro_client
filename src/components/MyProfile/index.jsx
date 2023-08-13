import { Image } from "react-bootstrap";
import { useAuth } from "../../hooks";
import { useContext, useEffect, useState } from "react";
import { userServices } from "../../services";
import moment from "moment";
import ModelUpdateInfo from "../../components/ModelUpdateInfo";
import styles from "./MyProfile.module.scss";
import classNames from "classNames/bind";
import { useSearchParams } from "react-router-dom";
import { AiFillCamera } from "react-icons/ai";
import { ToastContext } from "../../untils/context";
import ModalCustom from "../ModalCustom";
import imageCompression from "browser-image-compression";

const cx = classNames.bind(styles);

function MyProfile() {
  const [, , user] = useAuth();
  const [searchParams] = useSearchParams();
  const toast = useContext(ToastContext);

  const [userInfo, setUserInfor] = useState({});
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState([]);
  const [showModalAvatar, setShowModalAvatar] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(
    searchParams.get("modal") == "open" ? true : false
  );

  const name_parts = user?.fullName.split(" ");
  const handleClose = () => {
    setIsOpen(false);
  };

  function openModal() {
    setIsOpen(true);
  }

  function getUser() {
    if (user) {
      const _id = user._id;
      userServices.getUserById(_id).then((res) => {
        if (res.err === 0) setUserInfor(res.dataUser);
      });
    }
  }

  async function convertImg(event) {
    const imageFile = event.target.files[0];
    // console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 20,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      // console.log(
      //   "compressedFile instanceof Blob",
      //   compressedFile instanceof Blob
      // ); // true
      // console.log(
      //   `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      // ); // smaller than maxSizeMB

      // console.log("compress", compressedFile); // write your own logic
      // console.log("bob from convert", URL.createObjectURL(compressedFile));
      return compressedFile;
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeInputFile = async (e) => {
    const filesTarget = e.target.files;
    const imgCompress = await convertImg(e);
    // console.log("imgCompress", imgCompress);
    // console.log("file goc", filesTarget[0]);
    for (let i = 0; i < filesTarget.length; i++) {
      if (!filesTarget[i].type.includes("image/")) {
        return toast.error("Please select only images!");
      }
    }

    const fileUrl = Array.from(filesTarget).map((file) =>
      URL.createObjectURL(file)
    );
    // console.log("fileUrl", fileUrl);
    var fileConvert = new File(
      [imgCompress],
      `avatar${Math.floor(Math.random() * 10000)}-${Math.floor(
        Math.random() * 10000
      )}.png`,
      { type: imgCompress.type }
    );
    // console.log("convert blob to files", fileConvert);
    // setFile(filesTarget[0]);
    setFile(fileConvert);
    setFileUrl(fileUrl);
    setShowModalAvatar(true);
    e.target.value = "";
  };

  // Component upload avatar
  function upLoadAvatar({ src }) {
    async function handleUploadAvatar() {
      setIsUploaded(false);
      toast.loading("Uploading avatar...");
      setIsLoading(true);
      let imgToDelete;
      if (userInfo.avatar.includes("https:")) {
        imgToDelete = userInfo.avatar;
      }

      try {
        const res = await userServices.uploadAvatar(
          userInfo._id,
          file,
          imgToDelete
        );

        if (res.err === 0) {
          toast.dismiss();
          toast.success("Upload avatar successfully");
          setIsUploaded(true);
          setShowModalAvatar(false);
          setIsLoading(false);
        } else {
          toast.dismiss();
          toast.error("Wrong");
        }
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <>
        <div className="d-flex justify-content-center  ">
          <Image
            className="rounded m-3 shadow"
            style={{
              width: "50vw",
              objectFit: "cover",
              minHeight: "30vh",
              maxHeight: "55vh",
            }}
            src={src}
          />
        </div>
        <div className="d-flex justify-content-end">
          <button
            disabled={isLoading}
            onClick={() => handleUploadAvatar(file)}
            className="text-bg-primary"
            style={{
              width: "70px",
              margin: "16px",
              border: "none",
              padding: "5px 0",
              borderRadius: "8px",
            }}
          >
            Save
          </button>
        </div>
      </>
    );
  }

  useEffect(() => {
    getUser();
  }, [isUploaded]);

  return (
    <div className={cx("wrap")}>
      <ModelUpdateInfo
        show={modalIsOpen}
        handleClose={handleClose}
        getUser={getUser}
        component={Image}
      />

      {/* Modal upload avatar */}
      <ModalCustom
        show={showModalAvatar}
        onHide={() => setShowModalAvatar(false)}
        data={file}
        Component={upLoadAvatar}
        action="Upload your avatar"
        img={fileUrl}
      ></ModalCustom>
      <div className={cx("avt-info")}>
        <div className={cx("contai")}>
          {/* avatar */}
          <div className={cx("avt")}>
            {/* avatar-img */}

            {!isLoading && userInfo?.avatar?.includes("https:") ? (
              <Image src={userInfo?.avatar} />
            ) : (
              <div className={cx("svg")}>
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
              </div>
            )}

            {/* upload avatar */}
            <label htmlFor="avatar" className={cx("upload-avatar", "shadow")}>
              <AiFillCamera className="fs-xl"></AiFillCamera>
            </label>
            <input
              onChange={handleChangeInputFile}
              type="file"
              id="avatar"
              hidden
            ></input>
          </div>

          <div className={cx("info")}>
            <h2 className="fs-l">{userInfo?.fullName}</h2>
            <div className={cx("info-item")}>{userInfo?.address}</div>
            <div className={cx("info-item")}>
              Joined on the {moment(userInfo?.createdAt).format("MMM Do YY")}
            </div>

            <div
              className={cx("pen")}
              onClick={openModal}
              title="Update your information"
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("content")}>
        <div className={cx("gr-box")}>
          <h4 className={cx("title")}>Personal information</h4>
          <div className="row">
            <div className={cx("col-5", "col")}>
              <div className={cx("gr-col")}>
                <h4>First Name</h4>
                <span>{name_parts?.[0]}</span>
              </div>
            </div>
            <div className={cx("col-5", "col")}>
              <div className={cx("gr-col")}>
                <h4>Last Name</h4>
                <span>{name_parts?.slice(1).join(" ")}</span>
              </div>
            </div>
          </div>
        </div>

        {userInfo?.bio && (
          <div className={cx("gr-box")}>
            <h4 className={cx("title")}>Bio</h4>
            <p className={cx("bio")}>{userInfo.bio}</p>
          </div>
        )}

        {userInfo?.personalities && userInfo.personalities.length > 0 && (
          <div className={cx("gr-box")}>
            <h4 className={cx("title")}>Personality</h4>
            <ul className={cx("list-personality")}>
              {userInfo.personalities.map((per, index) => (
                <li key={index}>{per}</li>
              ))}
            </ul>
          </div>
        )}

        <div className={cx("gr-box")}>
          <h4 className={cx("title")}>Contact</h4>
          <div className="row gap-4">
            <div className={cx("col-8", "col")}>
              <div className={cx("gr-col")}>
                <h4>Email</h4>
                <span>
                  {userInfo?.email ? userInfo.email : "Email not available!"}
                </span>
              </div>
            </div>

            {userInfo?.address && (
              <div className={cx("col-5", "col")}>
                <div className={cx("gr-col")}>
                  <h4>Address</h4>
                  <span>{userInfo.address}</span>
                </div>
              </div>
            )}
            {userInfo?.phone && (
              <div className={cx("col-5", "col")}>
                <div className={cx("gr-col")}>
                  <h4>Phone</h4>
                  <span>{userInfo.phone}</span>
                </div>
              </div>
            )}

            {userInfo?.school && (
              <div className={cx("col-5", "col")}>
                <div className={cx("gr-col")}>
                  <h4>Is student</h4>
                  <span>{userInfo.school}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
