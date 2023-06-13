import { FcAddImage } from "react-icons/fc";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ToastContext } from "../../untils/context";
// scss
import { Carousel } from "react-responsive-carousel";
import styles from "./ReqUpOwner.module.scss";
import classNames from "classNames/bind";
import { Image } from "react-bootstrap";
const cx = classNames.bind(styles);

function SettingImage({ imgs, formik, setImgs, show, setShow }) {
  // handle images
  const toast = useContext(ToastContext);

  const handleDeleteImage = (index) => {
    imgs.splice(index, 1);
    formik.values.images.splice(index, 1);
    setImgs(() => [...imgs]);
    formik.setValues({
      ...formik.values,
      images: [...formik.values.images],
    });
  };

  const uploadImage = async (event) => {
    const files = event.target.files;
    if (files.length > 8 || imgs.length + files.length > 8) {
      return toast.error("Please Choose less than 8 photos!");
    }
    const imgData = [];
    const imgsArr = [];
    for (let img of files) {
      const convert = URL.createObjectURL(img);
      imgData.push(convert);
      imgsArr.push(img);
    }

    setImgs((prev) => [...prev, ...imgData]);
    formik.setValues({
      ...formik.values,
      images: [...formik.values.images, ...imgsArr],
    });
  };

  if (!show) {
    return (
      <>
        <label htmlFor="">
          Image <span>*</span>
          {imgs.length > 0 && (
            <span
              className={cx("edit")}
              onClick={() => setShow(true)}
              title="Edit image upload..."
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
            </span>
          )}
        </label>

        <div className={cx("gr_input")}>
          <div className={cx("input_img")}>
            <div className="d-flex gap-3 flex-wrap">
              {imgs.length > 0 &&
                imgs.map((image, index) => (
                  <div key={index} className={cx("upload_img-img")}>
                    <Image src={image} width={0} height={0} />
                    <div
                      className={cx("xSm")}
                      onClick={() => handleDeleteImage(index)}
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                ))}

              {imgs.length < 8 && (
                <>
                  <label htmlFor="file_input" className={cx("plus_img")}>
                    <div className={cx("svg")}>
                      <FcAddImage />
                    </div>
                    {Array.from({ length: 42 }).map((_, i) => (
                      <div key={i}></div>
                    ))}
                  </label>
                  <input
                    name="file_input"
                    id="file_input"
                    type="file"
                    hidden
                    multiple
                    onChange={uploadImage}
                  />
                </>
              )}
            </div>
          </div>
          {formik.errors.images && formik.touched.images && (
            <span className={cx("err")}>{formik.errors.images}</span>
          )}
        </div>
      </>
    );
  }

  return (
    <div className={cx("setting")}>
      <div className={cx("wrap_setting")}>
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-12">
              <div className={cx("carousel")}>
                <Carousel
                  className={cx("carousel-control")}
                  showArrows={false}
                  showThumbs={false}
                  emulateTouch={true}
                  showIndicators={true}
                  infiniteLoop={true}
                  interval={3000}
                  // autoPlay={true}
                >
                  {imgs.length > 0 &&
                    imgs.map((image, index) => (
                      <div key={index} className={cx("upload_img-slide")}>
                        <Image src={image} />
                      </div>
                    ))}
                </Carousel>
              </div>
            </div>
            <div className="col-md-5 col-12">
              <div className={cx("x")} onClick={() => setShow(false)}>
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
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>

              <div className={cx("input_img")}>
                <div className="d-flex gap-3 flex-wrap p-2">
                  {imgs.length > 0 &&
                    imgs.map((image, index) => (
                      <div key={index} className={cx("upload_img-img")}>
                        <Image src={image} width={0} height={0} />
                        <div
                          className={cx("xSm")}
                          onClick={() => handleDeleteImage(index)}
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}

                  {imgs.length < 8 && (
                    <>
                      <label htmlFor="file_input" className={cx("plus_img")}>
                        <div className={cx("svg")}>
                          <FcAddImage />
                        </div>
                        {Array.from({ length: 42 }).map((_, i) => (
                          <div key={i}></div>
                        ))}
                      </label>
                      <input
                        name="file_input"
                        id="file_input"
                        type="file"
                        hidden
                        multiple
                        onChange={uploadImage}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SettingImage.propTypes = {
  imgs: PropTypes.array.isRequired,
  formik: PropTypes.object,
  setImgs: PropTypes.func,
  show: PropTypes.bool,
  setShow: PropTypes.func,
};

export default SettingImage;
