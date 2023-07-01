import { useEffect, useState } from "react";
import styles from "./UploadImage.module.scss";
import classNames from "classNames/bind";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const cx = classNames.bind(styles);
function UploadImage({ formik, imgToDelete, isUpdate, dataExisted }) {
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
      if (filesTarget.length + files.length > 4) {
        return toast.error("Please select less than 4 image!");
      }
    }

    if (filesTarget.length > 4 || files.length + filesTarget.length > 4) {
      return toast.error("Please select less than 4 image!");
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
      <div className={cx("wrap")}>
        {console.log("files", filesUrl)}
        {console.log("dataExisted", dataExisted)}

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
};

export default UploadImage;
