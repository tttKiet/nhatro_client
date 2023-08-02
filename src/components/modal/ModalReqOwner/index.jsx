import { useAuth } from "../../../hooks";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../../untils/context";
import { useFormik } from "formik";
import { reqRoomOwnerServices } from "../../../services";
// scss
import styles from "./ModalReqOwner.module.scss";
import classNames from "classNames/bind";
import SettingImage from "./SettingImage";
import { BsSend, BsSkipBackward } from "react-icons/bs";
import { MdOutlineRestartAlt } from "react-icons/md";
import axios from "axios";
import Select from "react-select";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
function ModalReqOwner({ setActiveTab }) {
  const [loading, setLoading] = useState(false);
  const [, , user] = useAuth();
  const [imgs, setImgs] = useState([]);
  const [show, setShow] = useState(false);
  const toast = useContext(ToastContext);
  const [optionsInput, setOptionsInput] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [optionsDistrict, setOptionsDistrict] = useState([]);
  const [optionsWard, setOptionsWard] = useState([]);
  // const [isRequired, setIsRequired] = useState(false);

  let ref;

  const handleClickBtnEnter = () => {
    ref.focus();
    if (optionsInput) {
      formik.setValues({
        ...formik.values,
        options: [...formik.values.options, optionsInput],
      });
    }

    setOptionsInput("");
  };

  const handleCLickXPerson = (index) => {
    formik.values.options.splice(index, 1);
    formik.setValues({
      ...formik.values,
      options: [...formik.values.options],
    });
  };

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

    if (Object.keys(values.addressFilter).length < 3) {
      errors.addressFilter = "Required";
    }

    if (values.options.length === 0) {
      errors.options = "Required";
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
          options: values.options,
          userId: user._id,
          addressFilter: values.addressFilter,
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
      options: [],
      addressFilter: {},
    },
    onSubmit: handleSubmit,
    validate,
  });

  const handleCombineAddress = (e) => {
    const data = {
      province: selectedProvince,
      district: selectedDistrict,
      ward: e,
    };

    formik.setFieldValue("addressFilter", data);

    // setTextLocation(
    //   `${e?.label ? `${e?.label}, ` : ""}
    //     ${selectedDistrict?.label ? `${selectedDistrict?.label}, ` : ""}
    //     ${selectedProvince?.label ? `${selectedProvince?.label}` : ""}
    //   `
    // );
  };

  const handleRestForm = () => {
    setSelectedDistrict(null);
    setSelectedWard(null);
    setSelectedProvince(null);
    formik.resetForm();
  };

  const handleChangeDistrict = (e) => {
    setSelectedDistrict(e);
    formik.setFieldValue("addressFilter", e);

    axios
      .get(`https://provinces.open-api.vn/api/d/${e.value}?depth=2`)
      .then((res) => {
        const data = res?.data.wards.map((d) => ({
          label: d.name,
          value: d.code,
        }));
        setOptionsWard(data);
      })
      .catch((error) => {
        toast.error("Error fetching data...Please or F5 reload page!");
        console.error("Error fetching data:", error);
      });
    setSelectedWard(null);
  };

  const handleChangeProvince = (e) => {
    setSelectedProvince(e);
    formik.setFieldValue("addressFilter", e);

    axios
      .get(`https://provinces.open-api.vn/api/p/${e.value}?depth=2`)
      .then((res) => {
        const data = res?.data.districts.map((d) => ({
          label: d.name,
          value: d.code,
        }));
        setOptionsDistrict(data);
      })
      .catch((error) => {
        toast.error("Error fetching data. Please try again or F5 reload page!");
        console.error("Error fetching data:", error);
      });
    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((res) => {
        const data = res?.data.map((p) => ({
          label: p.name,
          value: p.code,
        }));
        setOptions(data);
      })
      .catch((error) => {
        toast.error("Error fetching data...Please or F5 reload page!");
        console.error("Error fetching data:", error);
      });
  }, [toast]);

  return (
    <div className={cx("wrap")}>
      <form onSubmit={formik.handleSubmit}>
        <div className="row ">
          <div className={cx("gr", "col-md-6 col-12")}>
            <label htmlFor="name">
              Board House Name <span>*</span>
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

          <div className={cx("gr", "col-md-6 col-12")}>
            <label htmlFor="phone">
              Board House Phone <span>*</span>
            </label>
            <div className={cx("gr_input")}>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Enter your Board house phone.."
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              {formik.errors.phone && formik.touched.phone && (
                <span className={cx("err")}>{formik.errors.phone}</span>
              )}
            </div>
          </div>

          <div className={cx("gr", " col-12")}>
            <label htmlFor="phone">
              Select address <span>*</span>
            </label>
            <div className={cx("gr_input")}>
              <div className={cx("select")}>
                {/* <p className="m-0 text-white fst-italic fs-m">Province:</p> */}
                <Select
                  className={cx("d_slect")}
                  value={selectedProvince}
                  onChange={handleChangeProvince}
                  placeholder="Choose province"
                  options={options}
                />
                <Select
                  className={cx("d_slect")}
                  value={selectedDistrict}
                  onChange={handleChangeDistrict}
                  placeholder="Choose district"
                  options={optionsDistrict}
                />
                <Select
                  className={cx("d_slect")}
                  value={selectedWard}
                  onChange={(e) => {
                    setSelectedWard(e);
                    handleCombineAddress(e);
                  }}
                  placeholder="Choose ward"
                  options={optionsWard}
                />

                {formik.errors.addressFilter &&
                  formik.touched.addressFilter && (
                    <span className={cx("err")}>
                      {formik.errors.addressFilter}
                    </span>
                  )}
              </div>
            </div>
          </div>

          <div className={cx("gr", "col-md-6 col-12")}>
            <label htmlFor="address">
              Detail Address <span>*</span>
            </label>
            <div className={cx("gr_input")}>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Enter your Board house address.."
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              {formik.errors.address && formik.touched.address && (
                <span className={cx("err")}>{formik.errors.address}</span>
              )}
            </div>
          </div>

          <div className="col-md-6 col-12">
            {/* <label className={cx("title_1")}>PRICE</label> */}
            <div className="row">
              <div className={cx("gr", " col-6")}>
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

              <div className={cx("gr", " col-6")}>
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

          <div className={cx("options")}>
            <div className={cx("gr", "col-12")}>
              <label htmlFor="options">
                Options <span>*</span>
              </label>
              <div className={cx("gr_input")}>
                <input
                  value={optionsInput}
                  onChange={(e) => setOptionsInput(e.target.value)}
                  ref={(e) => (ref = e)}
                  id="options"
                  name="options"
                  type="text"
                  placeholder="Example: parking lots, refrigerator, air conditioner,..."
                  onKeyDown={(e) => {
                    if (e.code === "Enter" && optionsInput.trim() !== "") {
                      handleClickBtnEnter();
                    } else if (optionsInput.trim() === "") {
                      setOptionsInput("");
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={() => {
                    if (optionsInput.trim() !== "") handleClickBtnEnter();
                    else {
                      setOptionsInput("");
                    }
                  }}
                  className={cx("enter")}
                >
                  Enter
                </button>
              </div>

              {formik.values.options.length > 0 ? (
                <ul className={cx("list-options")}>
                  {formik.values.options.map((option, index) => (
                    <li key={index}>
                      {option}
                      <svg
                        onClick={() => handleCLickXPerson(index)}
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
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}

              {formik.errors.options && formik.touched.options && (
                <span className={cx("err", "text-danger fs-m")}>
                  {formik.errors.options}
                </span>
              )}
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
          <button
            type="reset"
            className={cx("btn-create")}
            onClick={() => handleRestForm()}
          >
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
