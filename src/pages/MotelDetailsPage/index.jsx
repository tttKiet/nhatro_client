import styles from "./MotelDetailsPage.module.scss";
import classNames from "classNames/bind";
import { Image } from "react-bootstrap";
import { Fragment, useCallback, useContext, useEffect } from "react";
import { HiAtSymbol, HiOutlineMail } from "react-icons/hi";
import { MdOutlineContactless, MdOutlineContentCopy } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

import { CiLineHeight, CiLocationOn, CiMemoPad } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import CalendarDate from "../../components/Calendar";
import { useState } from "react";
import Footer from "../../components/Footer";
import moment from "moment";
import ModalRentRoom from "../../components/modal/ModalRentRoom";
import boardHouseServices from "../../services/boardHouseServices";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

const cx = classNames.bind(styles);

function MotelDetailsPage() {
  const [textDate, setTextDate] = useState("");
  const [boardHouseInfo, setBoardHouseInfo] = useState({});
  const [showModalRent, setShowModalRent] = useState(false);

  const { id } = useParams();
  const toggleShowModalRent = () => {
    setShowModalRent((s) => !s);
  };

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleChangeDate = (event) => {
    setSelectionRange({ ...event.selection });
    setTextDate(
      `From ${moment(event.selection.startDate).calendar()} to ${moment(
        event.selection.endDate
      ).calendar()}`
    );
  };

  const handleClickCopy = (text) => {
    if (text) {
      navigator.clipboard.writeText(text);
    }

    toast.dismiss();
    toast.clearWaitingQueue();
    toast.success(`Copied ${text}`, {
      position: "bottom-right",
      autoClose: 1300,
      transition: Slide,
      pauseOnFocusLoss: false,
    });
  };

  const getBoardHouseInfo = useCallback(() => {
    boardHouseServices
      .getBoardHouseInfoById({ id })
      .then((res) => {
        if (res.status === 200 && res?.data?.err == 0) return res.data;
      })
      .then((data) => {
        console.log(data);
        setBoardHouseInfo({ ...data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    getBoardHouseInfo();
  }, [getBoardHouseInfo]);

  return (
    <div className={cx("wrapper")}>
      <ModalRentRoom show={showModalRent} toggleShow={toggleShowModalRent} />
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
          <b>4,84</b>
          <span className="px-2">|</span>
          <span>140 Evaluate</span>
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
            <div className={cx("btn-all-image")}>
              <CiLineHeight />

              <span>Show all image</span>
            </div>
          </div>
        </div>

        <div className={cx("row g-5", "py-4")}>
          <div className="col-lg-8">
            <div className={cx("infomation")}>
              <div className="row">
                <div className={cx("col-6")}>
                  <div className="d-flex justify-content-start align-items-center ">
                    <div className="d-flex justify-content-start align-items-center me-1">
                      <CiLocationOn size={24} />
                    </div>
                    <h4 className={cx("title")}>ADDRESS</h4>
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
                    <h4 className={cx("title")}>CONTACT US</h4>
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
                  <div className={cx("desc", "ctact")}>
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
              </div>

              <hr />
              <div>
                <div className="d-flex justify-content-start align-items-center ">
                  <div className="d-flex justify-content-start align-items-center me-1">
                    <CiMemoPad size={24} />
                  </div>
                  <h4 className={cx("title")}>DESCRIPTION ABOUT BOARDHOUSE</h4>
                </div>
                <div className={cx("desc")}>
                  Nằm ở vị trí hoàn hảo ngay trung tâm Green Point 's, 713
                  Cascades là một căn hộ sang trọng và phong cách ở tầng 7 với
                  tầm nhìn đáng yêu tận hưởng khung cảnh xa xôi của Devil' s
                  Peak. Nó đi kèm với ban công, nhà bếp đầy đủ, TV 60 inch,
                  giường cỡ Queen thoải mái với ga trải giường xa hoa. Căn hộ
                  cũng tận hưởng sự tiện lợi của một bãi đỗ xe ngầm lớn, chuyên
                  dụng, an toàn. (fake)
                  {boardHouseInfo?.description}
                </div>
              </div>
              <hr />

              <div className={cx("")}>
                <div className="d-flex justify-content-start align-items-center">
                  <h4 className={cx("title")}>ABOUT HERE</h4>
                </div>
                <div className={cx("row g-2 my-2")}>
                  <div className={cx("col-6")}>
                    <div className="d-flex justify-content-start align-items-center">
                      <CiMemoPad size={24} />
                      <h5 className={cx("title_item")}>Has layout</h5>
                    </div>
                  </div>
                  <div className={cx("col-6")}>
                    <div className="d-flex justify-content-start align-items-center">
                      <CiMemoPad size={24} />
                      <h5 className={cx("title_item")}>Has layout</h5>
                    </div>
                  </div>
                  <div className={cx("col-6")}>
                    <div className="d-flex justify-content-start align-items-center">
                      <CiMemoPad size={24} />
                      <h5 className={cx("title_item")}>Has layout</h5>
                    </div>
                  </div>
                  <div className={cx("col-6")}>
                    <div className="d-flex justify-content-start align-items-center">
                      <CiMemoPad size={24} />
                      <h5 className={cx("title_item")}>Has layout</h5>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div className={cx("p3", "pt-0")}>
                <h4 className={cx("all-room", "mt-4 mb-3")}>All rooms here</h4>
                <div className={cx("rooms")}>
                  <div className={cx("room", "disabled")}>
                    <div className={cx("r")}>1</div>
                  </div>
                  <div className={cx("room")}>
                    <div className={cx("r")}>2</div>
                  </div>
                  <div className={cx("room", "active")}>
                    <div className={cx("r")}>3</div>
                  </div>
                  <div className={cx("room")}>
                    <div className={cx("r")}>4</div>
                  </div>
                  <div className={cx("room")}>
                    <div className={cx("r")}>5</div>
                  </div>
                  <div className={cx("room")}>
                    <div className={cx("r")}>6</div>
                  </div>
                </div>

                <div className={cx("info-room-text", "mt-3", "p-4")}>
                  <div>
                    <div className={cx("room_gr")}>
                      <h3 className={cx("title")}>Room number:</h3>
                      <b>3</b>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <div className={cx("room_gr")}>
                          <h3 className={cx("title")}>Price on month:</h3>
                          <b>3M</b>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className={cx("room_gr")}>
                          <h3 className={cx("title")}>Price electric:</h3>
                          <b>3M</b>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className={cx("room_gr")}>
                          <h3 className={cx("title")}>Price water:</h3>
                          <b>3M</b>
                        </div>
                      </div>
                    </div>

                    <div className={cx("room_gr", "d-block")}>
                      <h3 className={cx("title")}>
                        Description for this room:
                      </h3>
                      <p>
                        Nằm ở vị trí hoàn hảo ngay trung tâm Green Point 's, 713
                        Cascades là một căn hộ sang trọng và phong cách ở tầng 7
                        với tầm nhìn đáng yêu tận hưởng khung cảnh xa xôi của
                        Devil' s Peak. Nó đi kèm với ban công, nhà bếp đầy đủ,
                        TV 60 inch, giường cỡ Queen thoải mái với ga trải giường
                        xa hoa. Căn hộ cũng tận hưởng sự tiện lợi của một bãi đỗ
                        xe ngầm lớn, chuyên dụng, an toàn.
                      </p>
                    </div>

                    <div className={cx("")}>
                      <div className={cx("room_gr")}>
                        <h4 className={cx("title")}>About this room</h4>
                      </div>
                      <div className={cx("row g-2 ")}>
                        <div className={cx("col-6")}>
                          <div className="d-flex justify-content-start align-items-center">
                            <CiMemoPad size={24} />
                            <h5 className={cx("title_item")}>Has layout</h5>
                          </div>
                        </div>
                        <div className={cx("col-6")}>
                          <div className="d-flex justify-content-start align-items-center">
                            <CiMemoPad size={24} />
                            <h5 className={cx("title_item")}>Has layout</h5>
                          </div>
                        </div>
                        <div className={cx("col-6")}>
                          <div className="d-flex justify-content-start align-items-center">
                            <CiMemoPad size={24} />
                            <h5 className={cx("title_item")}>Has layout</h5>
                          </div>
                        </div>
                        <div className={cx("col-6")}>
                          <div className="d-flex justify-content-start align-items-center">
                            <CiMemoPad size={24} />
                            <h5 className={cx("title_item")}>Has layout</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={cx("infor-room")}>
                      <div className={cx("images")}>
                        <div className="row g-2">
                          <div className="col-6">
                            <div className={cx("img")}>
                              <Image src="https://res.cloudinary.com/djvlxywoe/image/upload/v1683341438/nienluan_image-post/butlifkoztvuczdkharz.jpg"></Image>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className={cx("img")}>
                              <Image src="https://res.cloudinary.com/djvlxywoe/image/upload/v1683341438/nienluan_image-post/butlifkoztvuczdkharz.jpg"></Image>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className={cx("img")}>
                              <Image src="https://res.cloudinary.com/djvlxywoe/image/upload/v1683341438/nienluan_image-post/butlifkoztvuczdkharz.jpg"></Image>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className={cx("img")}>
                              <Image src="https://res.cloudinary.com/djvlxywoe/image/upload/v1683341438/nienluan_image-post/butlifkoztvuczdkharz.jpg"></Image>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <h4 className={cx("title")}>CHECK IN DATE </h4>
                <div className={cx("date", "my-4")}>
                  <CalendarDate
                    monthsShown={2}
                    selectionRange={selectionRange}
                    onChange={handleChangeDate}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className={cx("send")}>
              <div className={cx("box")}>
                <div className={cx("gr")}>
                  <h4 className={cx("title", "mb-4")}>Add receive date</h4>
                  <div className={cx("feedback")}>
                    <AiFillStar />
                    <b className="ps-1">4,84</b>
                    <span className="px-2">|</span>
                    <span>140 Evaluate</span>
                  </div>
                </div>

                <div className={cx("gr", "my-2")}>
                  <div className={cx("date-room")}>
                    <div className={cx("date-item")}>
                      <div className={cx("date-name")}>From</div>
                      <div className={cx("date-value")}>
                        {selectionRange.startDate
                          ? moment(selectionRange.startDate).calendar()
                          : "Add date"}
                      </div>
                    </div>
                    <div className={cx("date-item")}>
                      <div className={cx("date-name")}>To</div>
                      <div className={cx("date-value")}>
                        {selectionRange.endDate
                          ? moment(selectionRange.endDate).calendar()
                          : "Add date"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={cx("gr", "my-2")}>
                  Room number: <b>3</b>
                </div>
                <div className={cx("submit")}>
                  <button
                    className={cx("btn-send")}
                    onClick={toggleShowModalRent}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("footer")}>
          <h4 className={cx("title")}>FEED BACK </h4>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MotelDetailsPage;
