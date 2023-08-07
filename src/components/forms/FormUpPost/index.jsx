import { useAuth } from "../../../hooks";
import { Button, Image } from "react-bootstrap";
import { ToastContext } from "../../../untils/context";
import { ReactSortable } from "react-sortablejs";
import { trackPromise } from "react-promise-tracker";
import { HiX } from "react-icons/hi";
import { MoonLoader } from "react-spinners";
import imageCompression from "browser-image-compression";

// scss
import styles from "./FormUpPost.module.scss";
import PropTypes from "prop-types";
import classNames from "classNames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import postServices from "../../../services/postServices";
const cx = classNames.bind(styles);

function FormUpPost({ handleClose, mergePostsNew, postInfo }) {
  const toast = useContext(ToastContext);
  const [, , userCur] = useAuth();
  const [load, setLoad] = useState(false);
  const [changed, setChanged] = useState(false);
  const [content, setContent] = useState(postInfo?.content || "");
  const [hashTag, setHashTag] = useState(postInfo?.hashTag || "#notag");
  const [files, setFiles] = useState([]);
  const [filesUrl, setFilesUrl] = useState(postInfo?.images || []);
  const refInput = useRef(null);

  const handleSetContent = (e) => {
    setChanged(true);
    const newValues = e.target.value;
    setContent(newValues);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      return toast.error("Enter the content of the article!");
    }
    const data = {
      content: content.trim(),
      files,
      hashTag,
    };

    if (postInfo) {
      if (!changed)
        return toast("You don't change this post!", {
          icon: "💔",
        });
      data.postId = postInfo?.postId;
      setLoad(true);
      const toastId = toast.loading("Updating...");
      postServices
        .editPost({ _id: userCur._id, ...data })
        .then((res) => {
          if (res.status === 200) {
            setLoad(false);
            mergePostsNew(res?.data?.postDoc);
            toast.update(toastId, {
              type: "success",
              isLoading: false,
              render: res?.data?.message || "Erorr",
              autoClose: 2000,
            });
          } else {
            setLoad(false);
            toast.update(toastId, {
              type: "error",
              isLoading: false,
              autoClose: 2000,
              render: res?.data?.message || "Erorr",
            });
          }
        })
        .catch((err) => {
          toast.update(toastId, {
            type: "success",
            isLoading: false,
            autoClose: 2000,
            render: err?.message || "Erorr",
          });
        })
        .finally(() => {
          // toast.dismiss();
          toast.clearWaitingQueue();
          setContent("");
          setHashTag("#notag");
          setFiles([]);
          setFilesUrl([]);
          handleClose();
        });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      trackPromise(
        postServices.createPost({ _id: userCur._id, ...data }),
        "up_post"
      ).then(mergePostsNew);
      setContent("");
      setHashTag("#notag");
      setFiles([]);
      setFilesUrl([]);
      handleClose();
    }
  };
  const handleInput = () => {
    if (refInput && refInput.current) {
      refInput.current.style.height = "24px";
      refInput.current.style.height = refInput.current.scrollHeight + "px";
    }
  };

  const urlToFile = (urlAr) => {
    setLoad(true);
    const promises = urlAr.map((img) => fetch(img));
    return Promise.all(promises)
      .then((resAr) => {
        const ress = resAr.map((res) => res.blob());

        return Promise.all(ress);
      })
      .then((res) => {
        const array = res.map(
          (r) => new File([r], "filename.png", { type: "image/png" })
        );
        return Promise.resolve(array);
      })
      .catch((err) => {
        console.log(err);
        Promise.reject(err);
      })
      .finally(() => {
        setLoad(false);
      });
  };

  async function convertImg(file) {
    const imageFile = file;
    const options = {
      maxSizeMB: 20,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      var fileConvert = new File(
        [compressedFile],
        `avatar${Math.floor(Math.random() * 10000)}-${Math.floor(
          Math.random() * 10000
        )}.png`,
        { type: compressedFile.type }
      );

      return fileConvert;
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeInputFile = async (e) => {
    const filesTarget = e.target.files;
    for (let i = 0; i < filesTarget.length; i++) {
      if (!filesTarget[i].type.includes("image/")) {
        return toast.error("Please select only images!");
      }
    }

    if (filesTarget.length > 4 || files.length + filesTarget.length > 4) {
      return toast.error("Please select less than 4 image!");
    }

    const fileCompress = await Promise.all(
      Array.from(filesTarget).map(async (file) => {
        return await convertImg(file);
      })
    );

    const fileUrl = Array.from(fileCompress).map((file) =>
      URL.createObjectURL(file)
    );
    setFiles((prev) => [...prev, ...fileCompress]);
    setFilesUrl((prev) => [...prev, ...fileUrl]);
  };

  const handleSetList = (newState) => {
    setFiles(newState);
    const fileUrl = newState.map((file) => URL.createObjectURL(file));
    setFilesUrl(() => [...fileUrl]);
  };

  const handleCLickXImg = (index) => {
    setChanged(true);

    setFilesUrl((prev) => {
      const newImgs = [...prev];
      newImgs.splice(index, 1);
      return newImgs;
    });
    setFiles((prev) => {
      const newImgs = [...prev];
      newImgs.splice(index, 1);
      return newImgs;
    });
  };

  useEffect(() => {
    if (postInfo?.images) {
      urlToFile(postInfo?.images)
        .then((res) => {
          setFiles(res);
          const fileUrl = res.map((file) => URL.createObjectURL(file));
          setFilesUrl(fileUrl);
        })
        .catch((err) => console.log(err));
    }
  }, [postInfo?.images]);

  useEffect(() => {
    if (postInfo?.content) {
      refInput.current.style.height = refInput.current.scrollHeight + "px";
    }
  }, [postInfo?.content]);
  useEffect(() => {
    setChanged(false);
  }, []);

  return (
    <form className={cx("wrap")} onSubmit={handleSubmit}>
      <header>
        <div className={cx("d-flex align-items-center gap-2 ", "avatar")}>
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
          </span>
          <span className={cx("name")}>
            &nbsp;
            <span className="hight-pink">
              {userCur?.fullName || "Erorr Name"}
            </span>
          </span>
        </div>
      </header>

      <div className={cx("body")}>
        <div className={cx("form-gr")}>
          <textarea
            ref={refInput}
            spellCheck={false}
            value={content}
            onChange={handleSetContent}
            type="text"
            className={cx("input")}
            placeholder="Type what are you think..."
            onInput={handleInput}
          />
        </div>
        {filesUrl.length > 0 && (
          <div className={cx("form-gr")}>
            <ReactSortable
              className={cx("images", `layout_${filesUrl.length}`)}
              list={files}
              setList={(newState) => {
                handleSetList(newState);
              }}
            >
              {filesUrl.map((f, i) => (
                <div key={i} className={cx("img")}>
                  <Image src={f} />
                  <div className={cx("x")} onClick={() => handleCLickXImg(i)}>
                    <HiX />
                  </div>
                </div>
              ))}
            </ReactSortable>
          </div>
        )}
      </div>

      <div className={cx("actions")}>
        <select
          name="hash-tag"
          id="hash-tag"
          value={hashTag}
          onChange={(e) => {
            setHashTag(e.target.value);
            setChanged(true);
          }}
        >
          <option value="#notag">Hash Tag</option>
          <option value="#findmotel">#findmotel</option>
          <option value="#help">#help</option>
          <option value="#passmotel">#passmotel</option>
        </select>

        <label type="button" htmlFor="post" className="btn transparent">
          Add image
        </label>
        <input
          type="file"
          onChange={handleChangeInputFile}
          multiple
          hidden
          id="post"
        />
      </div>
      <div className={cx("submit")}>
        <div className={cx("load ")}>{load && <MoonLoader size={18} />}</div>
        <div className="d-flex gap-2">
          <button className={cx("cancel", "shadow-sm")} onClick={handleClose}>
            Cancel
          </button>

          {console.log(load)}
          <button
            type="submit"
            className={cx("up", "shadow-sm")}
            disabled={load || !changed}
          >
            {postInfo ? "Save change" : " Up here"}
          </button>
        </div>
      </div>
    </form>
  );
}

FormUpPost.propTypes = {
  handleClose: PropTypes.func,
  mergePostsNew: PropTypes.func,
  postInfo: PropTypes.object,
};

export default FormUpPost;
