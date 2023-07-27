import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks";
import { userServices } from "../../../services";
import moment from "moment";
import { Carousel } from "react-responsive-carousel";
import { Image } from "react-bootstrap";

// scss
import styles from "./TableReqOwnUser.module.scss";
import classNames from "classNames/bind";
import ModalFullScreen from "../../Post/ModalFullScreen";
const cx = classNames.bind(styles);

function TableReqOwnUser({ activeTab }) {
  const [, , user] = useAuth();
  const [reqs, setReqs] = useState([]);
  const [showFullImg, setShowFullImg] = useState(false);
  const [imgToView, setImgToView] = useState([]);
  const getReqOwner = async () => {
    try {
      const res = await userServices.getAllReqOwner(user?._id);
      if (res?.status === 200 && res?.data?.err === 0) {
        setReqs(res?.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  function handleViewFullImg(index, images) {
    const imgsClone = [...images];
    [imgsClone[0], imgsClone[index]] = [imgsClone[index], imgsClone[0]];
    setImgToView(imgsClone);
    setShowFullImg(true);
  }

  useEffect(() => {
    getReqOwner();
  }, [activeTab]);

  return (
    <div className={cx("wrap", "container")}>
      <ModalFullScreen
        imgToView={imgToView}
        show={showFullImg}
        onHide={() => setShowFullImg(false)}
      ></ModalFullScreen>
      {reqs?.length > 0 ? (
        <table className="table table-borderless table-responsive">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">House Name</th>
              <th scope="col">Address</th>
              <th scope="col">Image</th>
              <th scope="col">Created Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {reqs.length > 0 &&
              reqs.map((req, index) => (
                <tr key={index}>
                  <td scope="row">
                    <div>{index + 1}</div>
                  </td>
                  <td>
                    <div>{req?.boardHouseId?.name}</div>
                  </td>
                  <td>
                    <div>{req?.boardHouseId?.address}</div>
                  </td>
                  <td>
                    <div className={cx("images")}>
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
                        {req?.boardHouseId?.images.length > 0 &&
                          req?.boardHouseId?.images.map((image, index) => (
                            <div
                              key={index}
                              className={cx("upload_img-slide")}
                              onClick={() =>
                                handleViewFullImg(
                                  index,
                                  req.boardHouseId.images
                                )
                              }
                            >
                              <Image src={image} />
                            </div>
                          ))}
                      </Carousel>
                    </div>
                  </td>
                  <td>
                    <div>{moment(req?.createdAt).format("MMM Do YY")}</div>
                  </td>
                  <td>
                    <div>
                      {req?.status == 0 ? (
                        <span className={cx("wait")}>Pending...</span>
                      ) : (
                        <span className={cx("ok")}>OK!</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className={cx("donthave")}>
          You don&#39;t have any requests ...{" "}
        </div>
      )}
    </div>
  );
}

export default TableReqOwnUser;
