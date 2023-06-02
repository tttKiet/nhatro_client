import styles from "./CheckUpdateBoardHouse.module.scss";
import classNames from "classNames/bind";
import { useAuth } from "../../hooks";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import UpdateBoardHouseForm from "../UpdateBoardHouseForm";

const cx = classNames.bind(styles);

function CheckUpdateBoardHouse({ id }) {
  const [, , adminData] = useAuth();

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
              data={adminData}
              id={id}
              isCreate={true}
            ></UpdateBoardHouseForm>
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
