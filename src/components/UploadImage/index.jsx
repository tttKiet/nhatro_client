import { useEffect, useState } from "react";
import styles from "./UploadImage.module.scss";
import classNames from "classNames/bind";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const cx = classNames.bind(styles);
function UploadImage({
  formik,
  imgToDelete,
  isUpdate,
  dataExisted,
  forBoardHouse,
}) {
  const [files, setFiles] = useState([]);
  const [filesUrl, setFilesUrl] = useState([]);

  async function convertImg(file) {
    const imageFile = file;
    // console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

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
      // console.log(
      //   "compressedFile instanceof Blob",
      //   compressedFile instanceof Blob
      // ); // true
      // console.log(
      //   `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      // ); // smaller than maxSizeMB
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

    if (isUpdate) {
      if (filesTarget.length + files.length > (forBoardHouse ? 8 : 4)) {
        // return toast.error("Please select less than 4 image!");
        return toast.error(
          `Please select less than ${forBoardHouse ? "8" : "4"} images!`
        );
      }
    }

    if (
      filesTarget.length > (forBoardHouse ? 8 : 4) ||
      files.length + filesTarget.length > (forBoardHouse ? 8 : 4)
    ) {
      return toast.error(
        `Please select less than ${forBoardHouse ? "8" : "4"} images!`
      );
    }

    const newFileArr = await Promise.all(
      Array.from(filesTarget).map(async (file) => {
        return await convertImg(file);
      })
    );

    const fileUrl = Array.from(newFileArr).map((file) =>
      URL.createObjectURL(file)
    );

    setFiles((prev) => [...prev, ...newFileArr]);
    setFilesUrl((prev) => [...prev, ...fileUrl]);
  };

  useEffect(() => {
    if (isUpdate) {
      setFiles(dataExisted.Images);
      setFilesUrl(dataExisted.Images);
    }
  }, []);

  useEffect(() => {
    if (imgToDelete !== null) {
      const indexImg = filesUrl.indexOf(imgToDelete);
      setFilesUrl((prev) => {
        const updatedFilesUrl = prev.filter((_, index) => index !== indexImg);
        return updatedFilesUrl;
      });

      setFiles((prev) => {
        const updatedFiles = prev.filter((_, index) => index !== indexImg);
        return updatedFiles;
      });
    }
  }, [imgToDelete]);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      images: filesUrl,
      fileImages: files,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesUrl, files, imgToDelete]);

  function UploadInput() {
    return (
      <div className={cx("wrap my-2")}>
        <div className="mb-3">
          <div>
            <label htmlFor="formFile" className="form-label fw-bold mt-2">
              Upload image:
            </label>
            <div className=" d-flex justify-content-center align-items-center">
              <input
                onChange={handleChangeInputFile}
                className="form-control"
                type="file"
                id="formFile"
                multiple
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center flex-col m-8 ">
        <div>
          <UploadInput />
        </div>
      </div>
    </>
  );
}

UploadImage.propTypes = {
  formik: PropTypes.object,
  onDisableClose: PropTypes.func,
  imgToDelete: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  isUpdate: PropTypes.bool,
  dataExisted: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  forBoardHouse: PropTypes.bool,
};

export default UploadImage;
