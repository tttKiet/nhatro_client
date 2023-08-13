import { Image } from "react-bootstrap";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Fragment, useCallback, useEffect, useRef } from "react";
import { HiAtSymbol, HiOutlineMail, HiOutlineNewspaper } from "react-icons/hi";
import {
  MdOutlineContactless,
  MdOutlineContentCopy,
  MdOutlineWaterDrop,
} from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";

import { FiPhone } from "react-icons/fi";

import {
  CiLineHeight,
  CiLocationOn,
  CiMemoPad,
  CiDollar,
} from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
import Footer from "../../components/Footer";
import moment from "moment";
import ModalRentRoom from "../../components/modal/ModalRentRoom";
import boardHouseServices from "../../services/boardHouseServices";
import { useParams, useSearchParams } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import { Calendar, DateRange } from "react-date-range";
import styles from "./MotelDetailsPage.module.scss";
import classNames from "classNames/bind";
import FeedbackOfBoardHouse from "../../components/FeedbackOfBoardHouse";
import ModalFullScreen from "../../components/Post/ModalFullScreen";
import { feedbackOfBoardHouseServices } from "../../services";
import { BsLightning } from "react-icons/bs";
import { BarLoader } from "react-spinners";

const cx = classNames.bind(styles);

function MotelDetailsPage() {
  const [currChooseRoom, setCurrChooseRoom] = useState(1);
  const [boardHouseInfo, setBoardHouseInfo] = useState({});
  const [showModalRent, setShowModalRent] = useState(false);
  const [showFullImg, setShowFullImg] = useState(false);
  const [showFullImgRoom, setShowFullImgRoom] = useState(false);
  const chooseDateRef = useRef(null);
  const chooseRoomRef = useRef(null);
  const [allReviews, setAllReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let [search] = useSearchParams();

  const { id } = useParams();
  const toggleShowModalRent = () => {
    setShowModalRent((s) => !s);
  };

  const handleClickCopy = (text) => {
    if (text) {
      navigator.clipboard.writeText(text);
    }

    // toast.dismiss();
    toast.clearWaitingQueue();
    toast.success(`Copied ${text}`, {
      position: "bottom-right",
      autoClose: 1100,
      transition: Slide,
      pauseOnFocusLoss: false,
      newestOnTop: false,
    });
  };

  const windowScrollToElement = (element) => {
    element?.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
      top: -20,
    });
  };

  const getBoardHouseInfo = useCallback(() => {
    boardHouseServices
      .getBoardHouseInfoById({ id })
      .then((res) => {
        if (res.status === 200 && res?.data?.err == 0) {
          setIsLoading(false);
          return res.data;
        }
      })
      .then((data) => {
        setBoardHouseInfo({ ...data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const getAllFeedback = useCallback(async () => {
    try {
      const res = await feedbackOfBoardHouseServices.getAllFeedback(id);
      if (res.err === 0 && res.data.length > 0) {
        setAllReviews(res.data);
      } else {
        setAllReviews([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    const comp = search.get("comp");
    comp && chooseRoomRef?.current && windowScrollToElement(chooseRoomRef);
  });

  useEffect(() => {
    getAllFeedback();
  }, [getAllFeedback]);

  useEffect(() => {
    setIsLoading(true);
    getBoardHouseInfo();
  }, [getBoardHouseInfo]);

  if (isLoading) {
    return (
      <div className={cx("mt-5 pt-5")}>
        <BarLoader color="#E48586" height={8} width={350} className="mx-auto" />
      </div>
    );
  }

  return (
    <div className={cx("wrapper")}>
      {/* {console.log("board house info", boardHouseInfo)} */}

      <ModalRentRoom
        boardHouseName={boardHouseInfo?.name}
        roomNumber={boardHouseInfo?.rooms?.[currChooseRoom - 1]?.number}
        startDate={new Date()}
        roomPrice={boardHouseInfo?.rooms?.[currChooseRoom - 1]?.price}
        address={boardHouseInfo?.address}
        owner={boardHouseInfo?.userId}
        show={showModalRent}
        toggleShow={toggleShowModalRent}
        roomId={boardHouseInfo?.rooms?.[currChooseRoom - 1]?._id}
      />

      {/* Modal show all img of board house*/}
      <ModalFullScreen
        imgToView={boardHouseInfo.images ? boardHouseInfo.images : []}
        show={showFullImg}
        onHide={() => setShowFullImg(false)}
      ></ModalFullScreen>

      {/* Modal show all img of  rooms*/}
      <ModalFullScreen
        imgToView={
          boardHouseInfo?.rooms?.[currChooseRoom - 1]
            ? boardHouseInfo?.rooms?.[currChooseRoom - 1].images
            : []
        }
        show={showFullImgRoom}
        onHide={() => setShowFullImgRoom(false)}
      ></ModalFullScreen>

      <div className="container">
        <div className={cx("boardhouse_name")}>
          <span className="pe-2">
            <HiAtSymbol size={26} />
          </span>
          <span>{boardHouseInfo?.name}</span>
        </div>

        <div className={cx("feedback")}>
          <span className="pe-1">
            <AiFillStar />
          </span>
          <b>
            {boardHouseInfo?.starAndPrice?.star
              ? boardHouseInfo?.starAndPrice?.star
              : "5"}
          </b>
          <span className="px-2">|</span>
          <span>{allReviews.length} Reviews</span>
        </div>

        <div className={cx("images")}>
          <div className={cx("image_wrapper")}>
            <div className="row g-2">
              {boardHouseInfo?.images?.length > 0 &&
                boardHouseInfo.images.map((img, i) => {
                  if (i === 0) {
                    return (
                      <div key={i} className="col-6">
                        <Image className={cx("onepic")} src={img} />
                      </div>
                    );
                  } else if (i === 5) {
                    return (
                      <div key={i} className="col-6">
                        <Image className={cx("onepic")} src={img} />
                      </div>
                    );
                  } else if (i > 5) {
                    return <Fragment key={i}></Fragment>;
                  } else {
                    return (
                      <div key={i} className="col-3">
                        <Image className={cx("onepic")} src={img} />
                      </div>
                    );
                  }
                })}
            </div>
            <div
              className={cx("btn-all-image", "shadow border")}
              onClick={() => setShowFullImg(true)}
            >
              <CiLineHeight />

              <span>Show all image</span>
            </div>
          </div>
        </div>

        <div className={cx("row ", "py-4")}>
          <div className="col-lg-8">
            <div className={cx("infomation")}>
              <div className="row">
                <div className={cx("col-6")}>
                  <div className="d-flex justify-content-start align-items-center ">
                    <div className="d-flex justify-content-start align-items-center me-1">
                      <CiLocationOn size={24} />
                    </div>
                    <h4 className={cx("title")}>Address</h4>
                  </div>
                  <div className={cx("desc")}>
                    <span>{boardHouseInfo?.address}</span>
                    <p>Include 12 rooms, 3 rooms free</p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="d-flex justify-content-start align-items-center ">
                    <div className="d-flex justify-content-start align-items-center me-1">
                      <MdOutlineContactless size={24} />
                    </div>
                    <h4 className={cx("title")}>Contact us</h4>
                  </div>
                  <div className={cx("desc", "ctact")}>
                    <FiPhone color="#81f398d1" size={16} />
                    {boardHouseInfo?.phone}
                    <div
                      className={cx("copy")}
                      onClick={() => handleClickCopy(boardHouseInfo?.phone)}
                    >
                      <MdOutlineContentCopy size={20} color="#ff" />
                    </div>
                  </div>
                  <div className={cx("desc", "ctact", "text-break")}>
                    <HiOutlineMail color="#81f398d1" size={16} />
                    {boardHouseInfo?.userId?.email}
                    <div
                      className={cx("copy")}
                      onClick={() =>
                        handleClickCopy(boardHouseInfo?.userId?.email)
                      }
                    >
                      <MdOutlineContentCopy size={20} color="#fff" />
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="d-flex justify-content-start align-items-center ">
                    <h4 className={cx("title")}>
                      <BsLightning size={20} className="me-1"></BsLightning>
                      Electric
                    </h4>
                  </div>
                  <div className={cx("desc")}>
                    <span>
                      Tenants have to pay
                      <span className={cx("hl")}>
                        {Number(boardHouseInfo?.electricPrice).toLocaleString()}
                      </span>
                      VND per kilo of electricity and get unlimited use.
                    </span>
                  </div>
                </div>
                <div className="col-12 py-4">
                  <div className="d-flex justify-content-start align-items-center ">
                    <h4 className={cx("title")}>
                      <MdOutlineWaterDrop
                        size={20}
                        className="me-1"
                      ></MdOutlineWaterDrop>
                      Water
                    </h4>
                  </div>
                  <div className={cx("desc")}>
                    <span>
                      Tenants have to pay
                      <span className={cx("hl")}>
                        {Number(boardHouseInfo?.waterPrice).toLocaleString()}
                      </span>
                      VND per block of water
                    </span>
                  </div>
                </div>

                <div className="col-12 ">
                  <div className="d-flex justify-content-start align-items-center ">
                    <h4 className={cx("title")}>
                      <IoPricetagOutline
                        size={20}
                        className="me-1"
                      ></IoPricetagOutline>
                      Min - Max price
                    </h4>
                  </div>
                  <div className={cx("desc")}>
                    <span>
                      <span className={cx("hl")}>
                        {boardHouseInfo?.starAndPrice?.minPrice
                          ? Number(
                              boardHouseInfo?.starAndPrice?.minPrice
                            ).toLocaleString() + " VND"
                          : "Coming soon..."}
                      </span>
                      -
                      <span className={cx("hl")}>
                        {boardHouseInfo?.starAndPrice?.maxPrice
                          ? Number(
                              boardHouseInfo?.starAndPrice?.maxPrice
                            ).toLocaleString() + " VND"
                          : "Coming soon..."}
                      </span>
                      room
                    </span>
                  </div>
                </div>
              </div>

              <hr />
              <div>
                <div className="d-flex justify-content-start align-items-center ">
                  <div className="d-flex justify-content-start align-items-center me-1">
                    <HiOutlineNewspaper size={20}></HiOutlineNewspaper>
                  </div>
                  <h4 className={cx("title")}>Description of motel</h4>
                </div>
                <div className={cx("desc")}>{boardHouseInfo?.description}</div>
              </div>
              <hr />

              <div className={cx("")}>
                <div className="d-flex justify-content-start align-items-center ">
                  <h4 className={cx("title")}>About here</h4>
                </div>
                <div className={cx("row g-2 my-2")}>
                  {boardHouseInfo.options &&
                    boardHouseInfo?.options.map((option, index) => (
                      <div className={cx("col-6")} key={index}>
                        <div className="d-flex justify-content-start align-items-center">
                          <CiMemoPad size={24} />
                          <h5 className={cx("title_item")}>{option}</h5>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <hr ref={chooseRoomRef} />

              {boardHouseInfo.rooms && boardHouseInfo.rooms.length > 0 ? (
                <div className={cx("p3", "pt-0")}>
                  <div className={cx("scrollview")} ref={chooseRoomRef}></div>
                  <h4 className={cx("all-room", "mt-4 mb-3")}>
                    All rooms here
                  </h4>
                  <div className={cx("rooms")}>
                    {boardHouseInfo?.rooms?.map((room) => (
                      <div
                        key={room?._id}
                        className={cx("room")}
                        onClick={() => setCurrChooseRoom(room?.number)}
                      >
                        <div
                          className={cx("wrap-r", {
                            active: currChooseRoom === room?.number,
                          })}
                        >
                          <div className={cx("r")}>room {room?.number}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={cx("info-room-text", "mt-3", "p-4")}>
                    <div>
                      <div className="row">
                        <div className="col-md-5 col-12">
                          <div className={cx("room_gr")}>
                            <h3 className={cx("title")}>Room number:</h3>
                            <b>
                              {
                                boardHouseInfo?.rooms?.[currChooseRoom - 1]
                                  ?.number
                              }
                            </b>
                          </div>
                        </div>

                        <div className="col-md-5 col-12">
                          <div className={cx("room_gr")}>
                            <h3 className={cx("title")}>Price per month:</h3>
                            <b>
                              {boardHouseInfo?.rooms?.[currChooseRoom - 1]
                                ?.price
                                ? Number(
                                    boardHouseInfo?.rooms?.[currChooseRoom - 1]
                                      ?.price
                                  ).toLocaleString() + " VND"
                                : "Coming soon..."}
                            </b>
                          </div>
                        </div>
                      </div>

                      <div className={cx("room_gr", "d-block")}>
                        <h3 className={cx("title")}>
                          Description for this room:
                        </h3>
                        <p>
                          {
                            boardHouseInfo?.rooms?.[currChooseRoom - 1]
                              ?.description
                          }
                        </p>
                      </div>

                      <div className={cx("")}>
                        <div className={cx("room_gr")}>
                          <h4 className={cx("title")}>About this room</h4>
                        </div>
                        <div className={cx("row g-2 ")}>
                          {boardHouseInfo?.rooms?.[currChooseRoom - 1] &&
                            boardHouseInfo?.rooms?.[
                              currChooseRoom - 1
                            ].options.map((option, index) => (
                              <div className={cx("col-6")} key={index}>
                                <div className="d-flex justify-content-start align-items-center">
                                  <CiMemoPad size={24} />
                                  <h5 className={cx("title_item")}>{option}</h5>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className={cx("infor-room")}>
                        <div className={cx("images")}>
                          <div className="row g-2">
                            {boardHouseInfo.rooms?.[
                              currChooseRoom - 1
                            ].images.map((img, index) => (
                              <div key={index} className="col-6">
                                <div className={cx("img")}>
                                  <Image src={img}></Image>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div
                            className={cx("btn-all-image", "shadow border")}
                            onClick={() => setShowFullImgRoom(true)}
                          >
                            <CiLineHeight />

                            <span>Show all image</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div
                      className={cx("scrollview", "nohr")}
                      ref={chooseDateRef}
                    ></div>

                    <div className={cx("room_gr")}>
                      <h4 className={cx("title")}>Check in date </h4>
                    </div>
                    <div className={cx("date", "my-0")}>
                      <div className="row">
                        <div className="col-5">
                          <div className={cx("desc")}>
                            <span>
                              Start moving in on the
                              <span className={cx("hl")}>22/4/2022</span>.
                            </span>
                          </div>
                        </div>
                        <div className="col-7">
                          <div className="d-flex justify-content-end">
                            <Calendar
                              className="fs-s"
                              color="#262626"
                              minDate={new Date()}
                              showDateDisplay={false}
                              date={new Date()}
                              fixedHeight={true}
                              direction="horizontal"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="fs-l fst-italic text-center bg-white py-2 rounded-3 shadow-sm">
                  The owner of this board house doesn&apos;t create any rooms
                </p>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className={cx("send")}>
              <div className={cx("box")}>
                <div className={cx("gr")}>
                  <h4 className={cx("title", "mb-4")}>Renting an apartment</h4>
                  <div className={cx("feedback")}>
                    <AiFillStar size={18} />
                    <b className="ps-1">4,84</b>
                    <span className="px-2">|</span>
                    <span>140 Evaluate</span>
                  </div>
                </div>

                <div className="row">
                  <div
                    className={cx("gr", "my-2 pb-1")}
                    onClick={() => windowScrollToElement(chooseRoomRef)}
                  >
                    Room number:
                    <span className={cx("room-bill")}>
                      <b>{currChooseRoom}</b>
                    </span>
                  </div>
                </div>

                <div className={cx("gr", "my-2")}>
                  <div
                    className={cx("date-room")}
                    onClick={() => windowScrollToElement(chooseDateRef)}
                  >
                    <div className={cx("date-item")}>
                      <div className={cx("date-name")}>From</div>
                      <div className={cx("date-value")}>
                        {moment().calendar()}
                      </div>
                    </div>
                    <div className={cx("date-item")}>
                      <div className={cx("date-name")}>To</div>
                      <div className={cx("date-value")}>
                        {moment().calendar()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div
                    className={cx("gr", "my-2 pb-1")}
                    onClick={() => windowScrollToElement(chooseRoomRef)}
                  >
                    <div className="d-flex align-items-center">
                      <CiDollar size={22} />
                      <b>
                        {boardHouseInfo?.rooms?.[currChooseRoom - 1]?.price}
                      </b>
                    </div>
                  </div>
                </div>

                <div className={cx("submit")}>
                  <button
                    className={cx("btn-send")}
                    onClick={toggleShowModalRent}
                  >
                    Continues
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("footer")}>
          <FeedbackOfBoardHouse></FeedbackOfBoardHouse>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MotelDetailsPage;
