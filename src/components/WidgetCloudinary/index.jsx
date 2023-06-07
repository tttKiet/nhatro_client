import { useEffect, useRef, useState } from "react";
import styles from "./WidgetCloudinary.module.scss";
import classNames from "classNames/bind";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

function WidgetCloudinary({ formik }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      { cloudName: "dvvg4xwoy", uploadPreset: "dy26uoe1" },
      (error, result) => {
        if (result.event === "success") {
          // console.log("result.info.secure_url", result.info.secure_url);

          formik.setValues({
            ...formik.values,
            images: [...formik.values.images, result.info.secure_url],
          });
        }
      }
    );
  }, [formik]);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary m-auto"
        onClick={() => {
          widgetRef.current.open();
        }}
      >
        Upload Images
      </button>
    </>
  );
}

export default WidgetCloudinary;
