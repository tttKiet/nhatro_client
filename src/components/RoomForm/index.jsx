import styles from "./RoomForm.module.scss";
import classNames from "classNames/bind";
import { useFormik } from "formik";

import { Carousel } from "react-responsive-carousel";
import PropTypes from "prop-types";
import { roomServices } from "../../services";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import UploadImage from "../UploadImage";

const cx = classNames.bind(styles);
function RoomForm({
  data,
  updateData,
  onHide,
  isUpdate,
  dataExisted,
  onDisableClose,
}) {
  const [imgToDelete, setImgToDelete] = useState(null);
  const [optionsInput, setOptionsInput] = useState("");
  const [loading, setLoading] = useState(false);
  let ref;

  const validate = (values) => {
    const errors = {};
    if (!values.size) {
      errors.size = "Required";
    } else if (values.size < 1) {
      errors.size = "Must higher than 0";
    }

    if (!values.number) {
      errors.number = "Required";
    } else if (values.number < 1) {
      errors.number = "Must higher than 0";
    }

    if (!values.isLayout) {
      errors.isLayout = "Required";
    }

    if (!values.price) {
      errors.price = "Required";
    } else if (values.price <= 0) {
      errors.price = "Must higher than 0";
    }

    if (!values.description) {
      errors.description = "Required";
    } else if (values.description?.length < 5) {
      errors.description = "Must higher than 5 characters";
    }

    return errors;
  };

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

  const formik = useFormik({
    initialValues: {
      _id: "",
      number: "",
      size: "",
      isLayout: "",
      price: "",
      description: "",
      images: [],
      boardHouseId: data[0].boardHouseId,
      fileImages: [],
      options: [],
    },

    onSubmit: (values) => {
      // console.log(values);
      if (isUpdate) {
        handleUpdate(values._id, values);
      } else {
        handleSubmit(values.boardHouseId, values);
      }
    },
    validate,
  });

  async function handleDeleteImage(img) {
    setImgToDelete(img);
  }

  async function handleSubmit(id, dataRoom) {
    let toastId = null;
    toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const dataCreate = {
        files: dataRoom.fileImages,
        data: {
          number: dataRoom?.number,
          size: dataRoom?.size,
          isLayout: dataRoom?.isLayout,
          price: dataRoom?.price,
          description: dataRoom?.description,
          options: dataRoom?.options,
        },
      };
      const res = await roomServices.createRoom({ id: id, ...dataCreate });
      if (res.err === 0) {
        updateData();
        toast.update(toastId, {
          render: res.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setLoading(false);
        onHide();
      } else {
        toast.update(toastId, {
          render: res.message,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(id, dataRoom) {
    const fileImgs = dataRoom.fileImages?.filter(
      (file) => typeof file == "object"
    );

    let toastId = null;
    toastId = toast.loading("Loading...");
    setLoading(true);

    try {
      const res = await roomServices.updateRoom(id, dataRoom, fileImgs);
      if (res.err === 0) {
        updateData();
        toast.update(toastId, {
          render: res.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setLoading(false);
        onHide();
      } else {
        toast.update(toastId, {
          render: res.message,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (dataExisted && isUpdate) {
      formik.setValues({
        _id: dataExisted._id,
        number: dataExisted.Number,
        size: dataExisted.Size,
        isLayout: dataExisted["Has Layout"],
        price: dataExisted.Price,
        description: dataExisted.Description,
        images: dataExisted.Images,
        boardHouseId: dataExisted.boardHouseId,
        fileImages: dataExisted.fileImages,
        originalImage: dataExisted.originalImage,
        options: dataExisted?.options,
      });
    }
  }, []);

  return (
    <div className={cx("wrap", "row p-3")}>
      <form className="col-lg-5" onSubmit={formik.handleSubmit}>
        <div className={cx("wrap-group-input")}>
          <div className={cx("group-input")}>
            <label htmlFor="number" className="fw-bold">
              Number of room:{" "}
            </label>
            <input
              className="form-control "
              id="number"
              name="number"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.number}
            />
            {formik.errors.number && formik.touched.number ? (
              <div className="mb-3 text-danger">{formik.errors.number}</div>
            ) : (
              <div className="mb-3"></div>
            )}
          </div>

          <div className={cx("group-input")}>
            <label htmlFor="size" className="fw-bold">
              Quantity members:{" "}
            </label>
            <input
              className="form-control "
              id="size"
              name="size"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.size}
            />
            {formik.errors.size && formik.touched.size ? (
              <div className="mb-3 text-danger">{formik.errors.size}</div>
            ) : (
              <div className="mb-3"></div>
            )}
          </div>
        </div>

        <div className={cx("wrap-group-input")}>
          <div className={cx("group-input")} style={{ width: "207px" }}>
            <label htmlFor="isLayout" className="fw-bold">
              Has Layout:
            </label>
            <div>
              <label className="me-4">
                <input
                  className="pt-1 me-2"
                  type="radio"
                  id="isLayoutYes"
                  name="isLayout"
                  value="Yes"
                  checked={formik.values.isLayout === "Yes"}
                  onChange={formik.handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  className="pt-1 me-2"
                  type="radio"
                  id="isLayoutNo"
                  name="isLayout"
                  value="No"
                  checked={formik.values.isLayout === "No"}
                  onChange={formik.handleChange}
                />
                No
              </label>
            </div>
            {formik.errors.isLayout && formik.touched.isLayout ? (
              <div className="mb-3 text-danger">{formik.errors.isLayout}</div>
            ) : (
              <div className="mb-3"></div>
            )}
          </div>

          <div className={cx("group-input")}>
            <label htmlFor="price" className="fw-bold">
              Price (VND):{" "}
            </label>
            <input
              className="form-control "
              id="price"
              name="price"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            {formik.errors.price && formik.touched.price ? (
              <div className="mb-3 text-danger">{formik.errors.price}</div>
            ) : (
              <div className="mb-3"></div>
            )}
          </div>
        </div>

        <div className={cx("options")}>
          <div className={cx("gr", "col-12")}>
            <label htmlFor="options" className="fw-bold">
              Options:
            </label>
            <div className={cx("gr_input")}>
              <input
                className="form-control"
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
                className={cx("enter", "shadow-sm")}
              >
                Enter
              </button>
            </div>

            {formik.values?.options?.length > 0 ? (
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

        <label htmlFor="description" className="fw-bold">
          Description:{" "}
        </label>
        <input
          className="form-control "
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        {formik.errors.description && formik.touched.description ? (
          <div className="mb-3 text-danger">{formik.errors.description}</div>
        ) : (
          <div className="mb-3"></div>
        )}

        <label htmlFor="boardHouseId" className="fw-bold">
          Select board house:{" "}
        </label>
        <select
          name="boardHouseId"
          id="boardHouseId"
          className="form-select"
          aria-label="Default select example"
          onChange={formik.handleChange}
          value={formik.values.boardHouseId}
        >
          {data.map((boardHouse, index) => (
            <option key={index} value={boardHouse.boardHouseId}>
              {boardHouse.boardHouseName}
            </option>
          ))}
        </select>

        <button
          onClick={formik.handleSubmit}
          disabled={
            formik.values.images?.length >= 2 && !loading ? false : true
          }
          className={cx("btn-action", "my-3  shadow-sm")}
          type="button"
        >
          {isUpdate ? "Update" : "Submit"}
        </button>
      </form>

      <div className="col-lg-7 d-flex flex-column justify-content-center align-items-center mt-4 ">
        {formik.values.images?.length > 0 ? (
          <Carousel
            selectedItem={formik.values.images?.length - 1}
            className={cx("carousel-control")}
            showArrows={true}
            showThumbs={false}
            emulateTouch={true}
            showIndicators={true}
            infiniteLoop={true}
          >
            {formik.values.images.map((img, index) => (
              <div className={cx("item-img")} key={index}>
                <span className={cx("btn-delete-img")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    style={{ width: "25px" }}
                    onClick={() => handleDeleteImage(img)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
                <img className={cx("img-uploaded")} key={index} src={img}></img>
              </div>
            ))}
          </Carousel>
        ) : (
          ""
          // <div className="alert alert-light shadow-sm">
          //   Imgs were uploaded will show here!
          // </div>
        )}

        {formik.values.images?.length < 2 && (
          <div className="alert alert-light shadow-sm text-danger fst-italic fw-bold mt-3">
            You must upload at least 2 images for this room.
          </div>
        )}

        <UploadImage
          imgToDelete={imgToDelete}
          formik={formik}
          onDisableClose={onDisableClose}
          isUpdate={isUpdate}
          dataExisted={dataExisted}
        ></UploadImage>
      </div>
    </div>
  );
}

RoomForm.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  dataExisted: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  updateData: PropTypes.func,
  onHide: PropTypes.func,
  isUpdate: PropTypes.bool,
  onDisableClose: PropTypes.func,
};

export default RoomForm;
