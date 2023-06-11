import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";
import { Image } from "react-bootstrap";
import { FcAddImage } from "react-icons/fc";
import { useContext, useState } from "react";
import { ToastContext } from "../../untils/context";
// scss
import styles from "./ReqUpOwner.module.scss";
import classNames from "classNames/bind";
import { useFormik } from "formik";
import { cloudinaryServices } from "../../services";
const cx = classNames.bind(styles);

function ReqUpOwner() {
  const [, , user] = useAuth();
  const [imgs, setImgs] = useState([]);
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

    return errors;
  };

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
            if (convertFromPromise.length === 1) {
              res = await uploadSingleImage(convertFromPromise[0]);
            } else if (convertFromPromise.length > 1) {
              res = await uploadMultipleImages(convertFromPromise);
            }
            if (res.err === 0) {
              const data = {
                ...values,
                images: res.data
                  .filter((i) => i.err === 0)
                  .map((img) => img.data),
              };

              // call axios
              resolve(data);
            } else {
              toast.error(res?.response?.data?.message);
            }
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });

    toast
      .promise(handlePromise, {
        loading: "Loading...",
        success: <b>Payloaded!</b>,
        error: <b>Could not request!.</b>,
      })
      .then((data) => {
        console.log(data);
      });
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

  // handle images

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

  const uploadImage = async (event) => {
    const files = event.target.files;
    const imgData = [];
    const imgs = [];
    for (let img of files) {
      const convert = URL.createObjectURL(img);
      imgData.push(convert);
      imgs.push(img);
    }

    setImgs((prev) => [...prev, ...imgData]);
    formik.setValues({
      ...formik.values,
      images: [...formik.values.images, ...imgs],
    });
  };

  if (!user.emailVerified) {
    return (
      <div className={cx("notifications")}>
        <h4> You need to verify your email as to as continues!!</h4>
        <div className={cx("to_ver")}>
          <Link to={`/profile/${user?._id}?tag=req-owner-broad-house`}>
            Verify email here
          </Link>
        </div>
      </div>
    );
  }

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

          <div className={cx("gr", "col-md-6 col-12")}>
            <label htmlFor="">
              Image <span>*</span>
            </label>
            <div className={cx("gr_input")}>
              <div className={cx("upload_img")}>
                {imgs.length > 0 &&
                  imgs.map((image, index) => (
                    <div key={index} className={cx("upload_img-img")}>
                      <Image src={image} width={0} height={0} />
                    </div>
                  ))}
                <label htmlFor="file_input" className={cx("plus_img")}>
                  <FcAddImage />
                </label>
                <input
                  name="file_input"
                  id="file_input"
                  type="file"
                  hidden
                  multiple
                  onChange={uploadImage}
                />
              </div>
              {formik.errors.images && formik.touched.images && (
                <span className={cx("err")}>{formik.errors.images}</span>
              )}
            </div>
          </div>

          <div className={cx("gr", "col-md-6 col-12")}>
            <label htmlFor="description">Description</label>
            <div className={cx("gr_input")}>
              <textarea
                type="text"
                placeholder="Enter description..."
                id="description"
                name="description"
                defaultValue={formik.values.description}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
        <div className={cx("button", "d-flex gap-3")}>
          <button type="reset" className=" btn-default transparent">
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

export default ReqUpOwner;
