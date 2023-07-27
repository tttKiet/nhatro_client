import { useAuth } from "../../../hooks";
import { useContext, useState } from "react";
import { ToastContext } from "../../../untils/context";
import { useFormik } from "formik";
import { reqRoomOwnerServices } from "../../../services";
// scss
import styles from "./ModalReqOwner.module.scss";
import classNames from "classNames/bind";
import SettingImage from "./SettingImage";
import { BsSend, BsSkipBackward } from "react-icons/bs";
import { MdOutlineRestartAlt } from "react-icons/md";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
function ModalReqOwner({ setActiveTab }) {
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (values) => {
    let toastId = null;
    try {
      setLoading(true);
      toastId = toast.loading("Creating...");
      const dataCreate = {
        files: values.images,
        data: {
          name: values.name,
          address: values.address,
          phone: values.phone,
          electric: values.electric,
          water: values.water,
          description: values.description,
          userId: user._id,
        },
      };

      const res = await reqRoomOwnerServices.createReqBoardHouse(dataCreate);
      if (res.err === 0) {
        toast.update(toastId, {
          render: res.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        formik.resetForm();
        setImgs([]);
        toast.dismiss();
        toast.success(res.message);
        setActiveTab("information");
      } else {
        toast.update(toastId, {
          render: res.message,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        toast.dismiss();
        toast.clearWaitingQueue();
      }, 2000);
    }
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
        <div className={cx("button", "d-flex gap-3 mt-2")}>
          <button
            className={cx("btn-create")}
            onClick={() => setActiveTab("information")}
            type="button"
          >
            Back <BsSkipBackward className="ms-1"></BsSkipBackward>
          </button>
          <button type="reset" className={cx("btn-create")}>
            Reset <MdOutlineRestartAlt className="ms-1"></MdOutlineRestartAlt>
          </button>
          <button type="submit" disabled={loading} className={cx("btn-create")}>
            Request <BsSend className="ms-1"></BsSend>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalReqOwner;
