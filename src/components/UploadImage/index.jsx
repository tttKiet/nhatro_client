import { useEffect, useState } from "react";
import styles from "./UploadImage.module.scss";
import classNames from "classNames/bind";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

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

  const handleChangeInputFile = (e) => {
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
    const fileUrl = Array.from(filesTarget).map((file) =>
      URL.createObjectURL(file)
    );

    setFiles((prev) => [...prev, ...filesTarget]);
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
