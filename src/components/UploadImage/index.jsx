import { useState } from "react";
import styles from "./UploadImage.module.scss";
import classNames from "classNames/bind";
import Spinner from "react-bootstrap/Spinner";
import cloudinaryServices from "../../services/cloudinaryServices";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const cx = classNames.bind(styles);
function UploadImage({ formik, onDisableClose }) {
  const [loading, setLoading] = useState(false);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function uploadSingleImage(base64) {
    setLoading(true);
    toast.loading("Uploading...");
    const res = await cloudinaryServices.uploadImage(base64);

    if (res.err === 0) {
      console.log("formik", formik.values);
      if (!formik.values.images) {
        formik.setValues({
          ...formik.values,
          images: [res.data],
        });
      } else {
        formik.setValues({
          ...formik.values,
          images: [...formik.values.images, res.data],
        });
      }
      setLoading(false);
      if (onDisableClose) {
        onDisableClose(false);
      }
      toast.dismiss();
      toast.success("Upload a image successfully");
    }
  }

  async function uploadMultipleImages(images) {
    setLoading(true);
    toast.loading("Uploading...");
    const res = await cloudinaryServices.uploadImages(images);

    if (res.err === 0) {
      console.log(res.data);
      const newImages = res.data.map((img) => img.data);
      formik.setValues((prevValues) => ({
        ...prevValues,
        images: [...prevValues.images, ...newImages],
      }));
      if (onDisableClose) {
        onDisableClose(false);
      }
      setLoading(false);
      toast.dismiss();
      toast.success("Upload images successfully");
    }
  }

  const uploadImage = async (event) => {
    const files = event.target.files;
    console.log(files);
    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);

      uploadSingleImage(base64);
      return;
    }

    const base64s = [];
    for (var i = 0; i < files.length; i++) {
      var base = await convertBase64(files[i]);
      base64s.push(base);
    }
    uploadMultipleImages(base64s);
  };

  function UploadInput() {
    return (
      <div className={cx("wrap")}>
        <div className="mb-3">
          <div>
            <label htmlFor="formFile" className="form-label fw-bold mt-2">
              Upload image:
            </label>
            <div className=" d-flex justify-content-center align-items-center">
              <input
                onChange={uploadImage}
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
