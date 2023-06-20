import { useAuth } from "../../../hooks";
import { useContext, useState } from "react";
import { ToastContext } from "../../../untils/context";
import { useFormik } from "formik";
import { cloudinaryServices, reqRoomOwnerServices } from "../../../services";
// scss
import styles from "./ModalReqOwner.module.scss";
import classNames from "classNames/bind";
import SettingImage from "./SettingImage";
const cx = classNames.bind(styles);

function ModalReqOwner({ setActiveTab }) {
  const [, , user] = useAuth();
  const [imgs, setImgs] = useState([]);
  const [show, setShow] = useState(false);
  const toast = useContext(ToastContext);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 5) {
      errors.name = "Must be 5 characters or more";
    }

    if (!values.address) {
      errors.address = "Required";
    } else if (values.address.length < 5) {
      errors.address = "Must be 5 characters or more";
    }

    if (!values.phone) {
      errors.phone = "Please enter your phone number!";
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(values.phone)) {
      errors.phone = "Invalid phone number format!";
    }

    if (!values.electric) {
      errors.electric = "Required";
    }

    if (!values.water) {
      errors.water = "Required";
    }

    if (!values.description) {
      errors.description = "Required";
    }

    if (values.images.length === 0) {
      errors.images = "Required";
    } else if (values.images.length > 8) {
      errors.images = "Please Choose less than 8 photos!";
    }

    return errors;
  };

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
    const res = await cloudinaryServices.uploadImage(base64);
    return res;
  }

  async function uploadMultipleImages(images) {
    const res = await cloudinaryServices.uploadImages(images);
    return res;
  }

  const handleSubmit = async (values) => {
    const handlePromise = new Promise((resolve, reject) => {
      try {
        const { images } = values;
        const convertedImages = [];
        for (const image of images) {
          try {
            const convertedImage = convertBase64(image);
            convertedImages.push(convertedImage);
          } catch (error) {
            reject(error);
          }
        }
        Promise.all(convertedImages)
          .then(async (convertFromPromise) => {
            let res;
            try {
              if (convertFromPromise.length === 1) {
                res = await uploadSingleImage(convertFromPromise[0]);
              } else if (convertFromPromise.length > 1) {
                res = await uploadMultipleImages(convertFromPromise);
              }
              if (res.err === 0) {
                const data = {
                  ...values,
                  images: Array.isArray(res.data)
                    ? res.data.filter((i) => i.err === 0).map((img) => img.data)
                    : [res.data],
                };

                try {
                  const response =
                    await reqRoomOwnerServices.createReqBoardHouse(
                      data,
                      user._id
                    );
                  if (response.err === 0) {
                    formik.resetForm();
                    setImgs([]);

                    resolve();
                  }
                } catch (error) {
                  console.log(error);
                  reject(error);
                }

                resolve(data);
              }
            } catch (res) {
              toast.error(res?.response?.data?.message);
              console.log(res);
            }
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      } catch (error) {
        console.log(error);

        reject(error);
      }
    });

    toast
      .promise(handlePromise, {
        loading: <>This process will take a few minutes...</>,
        success: <i>Payloaded!</i>,
        error: <b>Could not request!.</b>,
      })
      .then(() => setActiveTab("information"));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      electric: "",
      water: "",
      description: "",
      images: [],
    },
    onSubmit: handleSubmit,
    validate,
  });

  return (
    <div className={cx("wrap")}>
      <form onSubmit={formik.handleSubmit}>
        <div className="row ">
          <div className={cx("gr", "col-md-6 col-12")}>
            <label htmlFor="name">
              Broad House Name <span>*</span>
            </label>
            <div className={cx("gr_input")}>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter name.."
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name && (
                <span className={cx("err")}>{formik.errors.name}</span>
              )}
            </div>
          </div>
          <div className={cx("gr", "col-sm-6 col-12")}>
            <label htmlFor="address">
              Address <span>*</span>
            </label>
            <div className={cx("gr_input")}>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Enter name.."
                value={formik.values.address}
                onChange={formik.handleChange}
              />

              {formik.errors.address && formik.touched.address && (
                <span className={cx("err")}>{formik.errors.address}</span>
              )}
            </div>
          </div>
          <div className={cx("gr", "col-sm-6 col-12")}>
            <label htmlFor="phone">
              Broad House Phone <span>*</span>
            </label>
            <div className={cx("gr_input")}>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Enter your broad house phone.."
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              {formik.errors.phone && formik.touched.phone && (
                <span className={cx("err")}>{formik.errors.phone}</span>
              )}
            </div>
          </div>

          <div className="col-md-6 col-12">
            <label className={cx("title_1")}>PRICE</label>
            <div className="row">
              <div className={cx("gr", "col-md-6 col-12")}>
                <label htmlFor="electric">
                  Electric <span>*</span>
                </label>
                <div className={cx("gr_input")}>
                  <input
                    id="electric"
                    name="electric"
                    type="number"
                    placeholder="Enter name.."
                    value={formik.values.electric}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.electric && formik.touched.electric && (
                    <span className={cx("err")}>{formik.errors.electric}</span>
                  )}
                </div>
              </div>

              <div className={cx("gr", "col-md-6 col-12")}>
                <label htmlFor="water">
                  Water <span>*</span>
                </label>
                <div className={cx("gr_input")}>
                  <input
                    id="water"
                    name="water"
                    type="number"
                    placeholder="Enter name.."
                    value={formik.values.water}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.water && formik.touched.water && (
                    <span className={cx("err")}>{formik.errors.water}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={cx("gr", "col-12")}>
            <label htmlFor="description">Description</label>
            <div className={cx("gr_input")}>
              <textarea
                type="text"
                placeholder="Enter description..."
                id="description"
                name="description"
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.errors.description && formik.touched.description && (
                <span className={cx("err")}>{formik.errors.description}</span>
              )}
            </div>
          </div>
          <div className={cx("gr", "col-12")}>
            <SettingImage
              show={show}
              formik={formik}
              setShow={setShow}
              imgs={imgs}
              setImgs={setImgs}
            />
          </div>
        </div>
        <div className={cx("button", "d-flex gap-3")}>
          <button
            className={cx("btn btn-default transparent")}
            onClick={() => setActiveTab("information")}
            type="button"
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
                d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
              />
            </svg>
            Back
          </button>
          <button type="reset" className="btn btn-default transparent">
            Reset
          </button>
          <button type="submit" className="btn btn-primary transparent">
            Request
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalReqOwner;
