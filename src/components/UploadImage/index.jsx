import { useEffect, useState } from "react";
import styles from "./UploadImage.module.scss";
import classNames from "classNames/bind";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const cx = classNames.bind(styles);
function UploadImage({ formik, onDisableClose, imgToDelete }) {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [filesUrl, setFilesUrl] = useState([]);

  const handleChangeInputFile = (e) => {
    const filesTarget = e.target.files;
    // const filesTarget = [...e.target.files]?.map((file, index) => ({
    //   id: index,
    //   file, // same as file: file,
    // }));
    for (let i = 0; i < filesTarget.length; i++) {
      if (!filesTarget[i].type.includes("image/")) {
        return toast.error("Please select only images!");
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

  async function convertBlobToFile(blobUrl, filename) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const file = new File([blob], filename);

    return file;
  }

  // useEffect(() => {
  //   if (imgToDelete !== null) {
  //     const index = filesUrl.indexOf(imgToDelete);
  //     console.log("index: " + index);
  //     if (index > -1) {
  //       setFilesUrl((prev) => {
  //         const updatedFiles = [
  //           ...prev.slice(0, index),
  //           ...prev.slice(index + 1),
  //         ];
  //         return updatedFiles;
  //       });

  //       setFiles((prev) => {
  //         const updatedFiles = [
  //           ...prev.slice(0, index),
  //           ...prev.slice(index + 1),
  //         ];
  //         return updatedFiles;
  //       });
  //     }
  //   }
  // }, [imgToDelete]);

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
        {console.log("files", files)}
        {/* {console.log("imgToDelete", imgToDelete)}
        
        {console.log("formik-img", formik.values.fileImages)} */}
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
        {loading && (
          <div className="my-1">
            <Spinner className="mx-1" animation="grow" variant="primary" />
            <Spinner className="mx-1" animation="grow" variant="secondary" />
            <Spinner className="mx-1" animation="grow" variant="success" />
            <Spinner className="mx-1" animation="grow" variant="danger" />
            <Spinner className="mx-1" animation="grow" variant="warning" />
            <Spinner className="mx-1" animation="grow" variant="info" />
            <Spinner className="mx-1" animation="grow" variant="light" />
            <Spinner className="mx-1" animation="grow" variant="dark" />
          </div>
        )}
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
