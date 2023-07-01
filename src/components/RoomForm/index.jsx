import styles from "./RoomForm.module.scss";
import classNames from "classNames/bind";
import { useFormik } from "formik";

import { Carousel } from "react-responsive-carousel";
import PropTypes from "prop-types";
import { roomServices } from "../../services";
import { useContext, useState } from "react";
import { ToastContext } from "../../untils/context";
import { useEffect } from "react";
import UploadImage from "../UploadImage";

const cx = classNames.bind(styles);
function RoomForm({
  data,
  updateData,
  // eslint-disable-next-line no-unused-vars
  onHide,
  isUpdate,
  dataExisted,
  onDisableClose,
}) {
  const [imgToDelete, setImgToDelete] = useState(null);

  const validate = (values) => {
    const errors = {};
    if (!values.size) {
      errors.size = "Required";
    } else if (values.size <= 0) {
      errors.size = "Must higher than 0";
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
    validateOnChange: false,
  });

  const toast = useContext(ToastContext);

  async function handleDeleteImage(img) {
    setImgToDelete(img);
  }

  async function handleSubmit(id, dataRoom) {
    try {
      toast.loading("Creating...");
      const dataCreate = {
        files: dataRoom.fileImages,
        data: {
          number: dataRoom.number,
          size: dataRoom.size,
          isLayout: dataRoom.isLayout,
          price: dataRoom.price,
          description: dataRoom.description,
        },
      };
      const res = await roomServices.createRoom({ id: id, ...dataCreate });
      if (res.err === 0) {
        toast.dismiss();
        updateData();
        toast.success("Successfully");
        onHide();
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(id, dataRoom) {
    const fileImgs = dataRoom.fileImages?.filter(
      (file) => typeof file == "object"
    );

    toast.loading("Updating room...");

    try {
      const res = await roomServices.updateRoom(id, dataRoom, fileImgs);
      if (res.err === 0) {
        toast.dismiss();
        toast.success(`Update room successfully`);
        onDisableClose(true);
        updateData();
        onHide();
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
      });
    }
  }, []);

  return (
    <div className={cx("wrap")}>
      {console.log("update-formik", formik.values)}
      <div className={cx("wrap", "row p-3")}>
        <form className="col-md-5" onSubmit={formik.handleSubmit}>
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
          {formik.errors.number ? (
            <div className="mb-3 text-danger">{formik.errors.number}</div>
          ) : (
            <div className="mb-3"></div>
          )}

          <label htmlFor="size" className="fw-bold">
            Quantity members of room:{" "}
          </label>
          <input
            className="form-control "
            id="size"
            name="size"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.size}
          />
          {formik.errors.size ? (
            <div className="mb-3 text-danger">{formik.errors.size}</div>
          ) : (
            <div className="mb-3"></div>
          )}

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
          {formik.errors.isLayout ? (
            <div className="mb-3 text-danger">{formik.errors.isLayout}</div>
          ) : (
            <div className="mb-3"></div>
          )}

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
          {formik.errors.price ? (
            <div className="mb-3 text-danger">{formik.errors.price}</div>
          ) : (
            <div className="mb-3"></div>
          )}

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
          {formik.errors.description ? (
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

          <button className="btn btn-primary m-auto mt-3" type="submit">
            {isUpdate ? "Update" : "Submit"}
          </button>
        </form>
        <div className="col-md-7 d-flex flex-column justify-content-center align-items-center">
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
                  <img
                    className={cx("img-uploaded")}
                    key={index}
                    src={img}
                  ></img>
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="alert alert-light shadow">
              Imgs were uploaded will show here!
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
