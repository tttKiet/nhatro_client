import styles from "./RequestFromAccount.module.scss";
import classNames from "classNames/bind";
import useAuth from "../../hooks/useAuth";
import { useEffect, useMemo, useState } from "react";
import { reqRoomOwnerServices } from "../../services";
import { createColumnHelper } from "@tanstack/react-table";
import TableSort from "../TableSort";
import { IoWaterOutline } from "react-icons/io5";
import { GiElectric } from "react-icons/gi";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { BsCheckCircle, BsLayers } from "react-icons/bs";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
function RequestFromAccount() {
  const [, , rootData] = useAuth();
  const [allReqs, setAllReqs] = useState([]);
  const [data, setData] = useState([]);
  const columnHelper = createColumnHelper();

  const [modalShow, setModalShow] = useState(false);
  const [imgsToView, setImgToView] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllReqs = async () => {
    try {
      const res = await reqRoomOwnerServices.getAllRequests(rootData._id);
      if (res.err === 0) {
        setAllReqs(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function confirmBeforeDelete(reqId, boardHouseId, imgToDelete) {
    toast.error(
      <div className={cx("wrap-toast")}>
        <p className="m-0">
          Are you sure to <b>reject</b>?
        </p>
        <div className="">
          <AiOutlineCheckCircle
            style={{ color: "#FE0000" }}
            className={cx("btn-action-toast")}
            onClick={() => handleRejectReq(reqId, boardHouseId, imgToDelete)}
          ></AiOutlineCheckCircle>
          <AiOutlineCloseCircle
            style={{ color: "#0079FF" }}
            className={cx("btn-action-toast")}
            onClick={() => {
              toast.dismiss();
              toast.clearWaitingQueue();
            }}
          ></AiOutlineCloseCircle>
        </div>
      </div>,
      {
        closeButton: false,
      }
    );

    async function handleRejectReq(reqId, boardHouseId, imgToDelete) {
      let toastId = null;
      toastId = toast.loading("Deleting...");
      setIsLoading(true);
      try {
        const res = await reqRoomOwnerServices.rejectReq(
          reqId,
          boardHouseId,
          imgToDelete
        );
        if (res.err === 0) {
          getAllReqs();
          toast.update(toastId, {
            render: res.message,
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          setIsLoading(false);
        } else {
          toast.update(toastId, {
            render: res.message,
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleAccecptReq(reqId) {
    let toastId = null;
    toastId = toast.loading("Loading...");
    setIsLoading(true);
    try {
      const res = await reqRoomOwnerServices.accpectReq(reqId);
      if (res.err === 0) {
        getAllReqs();
        toast.update(toastId, {
          render: res.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setIsLoading(false);
      } else {
        toast.update(toastId, {
          render: res.message,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleViewAllImgs(data) {
    setModalShow(true);
    setImgToView(data);
  }

  function handleSelectChanges(e) {
    if (e.target.value === "accept") {
      setDataFilter(data.filter((item) => item.Status === "1"));
    } else if (e.target.value === "notAccept") {
      setDataFilter(data.filter((item) => item.Status === "0"));
    } else {
      setDataFilter([]);
    }
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor("Number", {
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("Information user", {
        cell: (info) => (
          <div>
            <p className="fs-m m-0 fw-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 me-2"
                style={{ width: "18px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              {info.row.original.userName}
            </p>
            <p className="fs-m m-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 me-2"
                style={{ width: "18px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              {info.row.original.userEmail}
            </p>
            <p className="fs-m m-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 me-2"
                style={{ width: "18px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              {info.row.original.userPhone}
            </p>
          </div>
        ),
      }),

      columnHelper.accessor("Information board house", {
        cell: (info) => (
          <div>
            <p className="fs-m m-0 fw-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 me-2"
                style={{ width: "18px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              {info?.row?.original?.dataBoardHouse?.name || ""}
            </p>
            <p className="fs-m m-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 me-2"
                style={{ width: "18px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              {info?.row?.original?.dataBoardHouse?.address}
            </p>
            <p className="fs-m m-0">
              <IoWaterOutline className="fs-l me-2" />
              {info?.row?.original?.dataBoardHouse?.waterPrice} VND
            </p>
            <p className="fs-m m-0">
              <GiElectric className="fs-l me-2" />
              {info?.row?.original?.dataBoardHouse?.electricPrice} VND
            </p>
          </div>
        ),
      }),

      columnHelper.accessor("Options", {
        cell: (info) => (
          <div style={{ width: "100px" }}>
            {info?.row?.original?.options &&
              info?.row?.original?.options.map((options, index) => (
                <p className="fs-m m-0" key={index}>
                  <BsLayers className="fs-xl me-2"></BsLayers>
                  {options}
                </p>
              ))}
          </div>
        ),
      }),

      columnHelper.accessor("Description", {
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("Images", {
        cell: (info) => (
          <div>
            <Carousel
              className={cx("carousel-control")}
              showArrows={true}
              showThumbs={false}
              emulateTouch={true}
              showIndicators={true}
              infiniteLoop={true}
            >
              {info.row.original.Images?.map((image, index) => (
                <OverlayTrigger
                  key={index}
                  overlay={
                    <Tooltip id={`tooltip-${index}`}>
                      Click to show detail images
                    </Tooltip>
                  }
                >
                  <div
                    key={index}
                    onClick={() => handleViewAllImgs(info.row.original)}
                  >
                    <Image
                      key={index}
                      src={image}
                      className={cx("img-req")}
                      alt="your-motel"
                    />
                  </div>
                </OverlayTrigger>
              ))}
            </Carousel>
          </div>
        ),
      }),
      columnHelper.accessor("Actions", {
        // eslint-disable-next-line no-unused-vars
        cell: (info) =>
          info.cell.row.original.Status === "1" ? (
            <span className="badge text-bg-success rounded rounded-pill fs-l p-2">
              Accepted <BsCheckCircle className="fs-m ms-1" />
            </span>
          ) : (
            <div className="d-flex flex-column row-gap-2">
              <button
                disabled={isLoading}
                type="button"
                className={cx("btn-action", "shadow-sm")}
                style={{ backgroundColor: "#0079FF" }}
                onClick={() => handleAccecptReq(info.cell.row.original.id)}
              >
                Accept
              </button>
              <button
                disabled={isLoading}
                type="button"
                className={cx("btn-action", "shadow-sm")}
                style={{ backgroundColor: "#F24C3D" }}
                onClick={() =>
                  confirmBeforeDelete(
                    info.cell.row.original.id,
                    info.cell.row.original.dataBoardHouse._id,
                    info.cell.row.original.Images
                  )
                }
              >
                Reject
              </button>
            </div>
          ),
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    getAllReqs();
  }, []);

  useEffect(() => {
    if (allReqs.length > 0) {
      // const transformedData = allReqs.map((req, index) => ({
      //   id: req._id,
      //   Number: index,
      //   "Information user":
      //     req?.userId?.fullName + req?.userId?.email + req?.userId?.phone,
      //   userName: req?.userId?.fullName,
      //   userEmail: req?.userId?.email,
      //   userPhone: req?.userId?.phone,
      //   "Information board house": req?.boardHouseId?.name,
      //   dataBoardHouse: req.boardHouseId,
      //   UserName: req?.userId?.fullName,
      //   Description: req?.description,
      //   Status: req?.status,
      //   Images: req?.boardHouseId?.images,
      // }));

      const transformedData = allReqs.map((req, index) => ({
        id: req._id,
        Number: index,
        "Information user":
          req?.userId?.fullName + req?.userId?.email + req?.userId?.phone,
        userName: req?.userId?.fullName,
        userEmail: req?.userId?.email,
        userPhone: req?.userId?.phone,
        "Information board house": req?.boardHouseId?.name,
        dataBoardHouse: req.boardHouseId,
        UserName: req?.userId?.fullName,
        Description: req?.description,
        Status: req?.status,
        Images: req?.boardHouseId?.images,
        options: req?.boardHouseId?.options,
      }));
      setDataFilter(transformedData.filter((item) => item.Status === "0"));
      setData(transformedData);
    }
  }, [allReqs]);

  return (
    <div className={cx("wrap")}>
      {console.log("data", allReqs)}
      <div className="row mt-3 ms-1 ">
        <div
          style={{ width: "250px" }}
          className="p-2 rounded-3 border border-primary-subtle shadow border-2"
        >
          <p className="fs-m">Select status of request: </p>

          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleSelectChanges}
          >
            <option value="notAccept">Not accept</option>
            <option value="accept">Accepted</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
      <div className="row mt-2">
        <TableSort
          data={dataFilter.length > 0 ? dataFilter : data}
          columns={columns}
          isDisplayImg={true}
        ></TableSort>
      </div>
      {/* Modal */}
      <MyVerticallyCenteredModal
        data={imgsToView}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          All images of {props.data.dataBoardHouse?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel
          className={cx("carousel-control")}
          showArrows={true}
          showThumbs={false}
          emulateTouch={true}
          showIndicators={true}
          infiniteLoop={true}
        >
          {props.data.Images?.map((image, index) => (
            <div key={index}>
              <Image
                key={index}
                src={image}
                className={cx("img-modal")}
                alt="your-motel"
              />
            </div>
          ))}
        </Carousel>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

MyVerticallyCenteredModal.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onHide: PropTypes.func,
};

export default RequestFromAccount;
