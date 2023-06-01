import styles from "./CheckUpdateBoardHouse.module.scss";
import classNames from "classNames/bind";
import { useFormik } from "formik";
import { useAuth } from "../../hooks";
import { boardHouseServices } from "../../services";
import PropTypes from "prop-types";
import WidgetCloudinary from "../WidgetCloudinary";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UpdateBoardHouseForm from "../UpdateBoardHouseForm";

const cx = classNames.bind(styles);

function CheckUpdateBoardHouse({ id }) {
  const [, , adminData] = useAuth();

  // const UpdateBoardHouseForm = () => {
  //   const navigate = useNavigate();
  //   const validate = (values) => {
  //     const errors = {};
  //     if (!values.name) {
  //       errors.name = "Required";
  //     } else if (values.name.length < 5) {
  //       errors.name = "Must be 5 characters or more";
  //     }

  //     if (!values.address) {
  //       errors.address = "Required";
  //     } else if (values.address.length < 5) {
  //       errors.address = "Must be 5 characters or more";
  //     }

  //     if (!values.phone) {
  //       errors.phone = "Please enter your phone number!";
  //     } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(values.phone)) {
  //       errors.phone = "Invalid phone number format!";
  //     }

  //     if (!values.electricPrice) {
  //       errors.electricPrice = "Required";
  //     }

  //     if (!values.waterPrice) {
  //       errors.waterPrice = "Required";
  //     }

  //     return errors;
  //   };

  //   const formik = useFormik({
  //     initialValues: {
  //       name: "",
  //       address: "",
  //       phone: "",
  //       electricPrice: "",
  //       waterPrice: "",
  //       images: [],
  //     },
  //     onSubmit: (values) => {
  //       handleSubmit(adminData._id, id, values);
  //     },
  //     validate,
  //   });

  //   async function handleSubmit(adminId, boardHouseId, data) {
  //     const res = await boardHouseServices.updateBoardHouse(
  //       adminId,
  //       boardHouseId,
  //       data
  //     );
  //     if (res.err === 0) {
  //       Swal.fire({
  //         title: "Updated successfully. Let's access in dashboard",
  //         text: "Go to your profile",
  //         confirmButtonText: "Yes!",
  //         confirmButtonColor: "rgb(89, 89, 255)",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           navigate(`admin/profile/${adminData._id}`);
  //         }
  //       });
  //     }
  //     console.log(res);
  //   }

  //   return (
  //     <div className="row">
  //       <form className="col-md-5" onSubmit={formik.handleSubmit}>
  //         <label htmlFor="name" className="fw-bold">
  //           Name of board house:{" "}
  //         </label>
  //         <input
  //           className="form-control "
  //           id="name"
  //           name="name"
  //           type="text"
  //           onChange={formik.handleChange}
  //           value={formik.values.name}
  //         />
  //         {formik.errors.name ? (
  //           <div className="mb-3 text-danger">{formik.errors.name}</div>
  //         ) : (
  //           <div className="mb-3"></div>
  //         )}

  //         <label htmlFor="address" className="fw-bold">
  //           Address:{" "}
  //         </label>
  //         <input
  //           className="form-control  "
  //           id="address"
  //           name="address"
  //           type="text"
  //           onChange={formik.handleChange}
  //           value={formik.values.address}
  //         />
  //         {formik.errors.address ? (
  //           <div className="mb-3 text-danger">{formik.errors.address}</div>
  //         ) : (
  //           <div className="mb-3"></div>
  //         )}

  //         <label htmlFor="phone" className="fw-bold">
  //           Phone:{" "}
  //         </label>
  //         <input
  //           className="form-control "
  //           id="phone"
  //           name="phone"
  //           type="text"
  //           onChange={formik.handleChange}
  //           value={formik.values.phone}
  //         />
  //         {formik.errors.phone ? (
  //           <div className="mb-3 text-danger">{formik.errors.phone}</div>
  //         ) : (
  //           <div className="mb-3"></div>
  //         )}

  //         <label htmlFor="electricPrice" className="fw-bold">
  //           Electric Price:{" "}
  //         </label>
  //         <input
  //           className="form-control "
  //           id="electricPrice"
  //           name="electricPrice"
  //           type="number"
  //           onChange={formik.handleChange}
  //           value={formik.values.electricPrice}
  //         />
  //         {formik.errors.electricPrice ? (
  //           <div className="mb-3 text-danger">
  //             {formik.errors.electricPrice}
  //           </div>
  //         ) : (
  //           <div className="mb-3"></div>
  //         )}

  //         <label htmlFor="waterPrice" className="fw-bold">
  //           Water Price:{" "}
  //         </label>
  //         <input
  //           className="form-control "
  //           id="waterPrice"
  //           name="waterPrice"
  //           type="number"
  //           onChange={formik.handleChange}
  //           value={formik.values.waterPrice}
  //         />
  //         {formik.errors.waterPrice ? (
  //           <div className="mb-3 text-danger">{formik.errors.waterPrice}</div>
  //         ) : (
  //           <div className="mb-3"></div>
  //         )}

  //         <div className="my-3">
  //           <WidgetCloudinary formik={formik}></WidgetCloudinary>
  //         </div>

  //         <button className="btn btn-primary m-auto" type="submit">
  //           Submit
  //         </button>
  //       </form>
  //       <div className="col-md-7 d-flex justify-content-center align-items-center">
  //         {formik.values.images.length > 0 ? (
  //           <Carousel
  //             className={cx("carousel-control")}
  //             showArrows={true}
  //             showThumbs={false}
  //             emulateTouch={true}
  //             showIndicators={true}
  //             infiniteLoop={true}
  //             interval={3000}
  //             autoPlay={true}
  //           >
  //             {formik.values.images.map((img, index) => (
  //               <div key={index}>
  //                 <img
  //                   className={cx("img-uploaded")}
  //                   key={index}
  //                   src={img}
  //                 ></img>
  //               </div>
  //             ))}
  //           </Carousel>
  //         ) : (
  //           <div className="alert alert-light shadow">
  //             Img were uploaded will show here!
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className={cx("wrap")}>
      <div className="container">
        <h3 className="alert alert-primary text-center w-75 m-auto rounded-pill my-4 fs-xl">
          You need update your board house to access services<br></br>
          <p className="fs-l m-0 py-2">Email: {adminData.email}</p>
          <p className="fs-l m-0">Id board house: {id}</p>
        </h3>

        <div className="row">
          <div className={cx("wrap-form", "col-md-12 bg-primary-subtle p-3")}>
            <UpdateBoardHouseForm
              adminData={adminData}
              id={id}
            ></UpdateBoardHouseForm>
            {/* <UpdateBoardHouseForm></UpdateBoardHouseForm> */}
          </div>
        </div>
      </div>
    </div>
  );
}

CheckUpdateBoardHouse.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CheckUpdateBoardHouse;
