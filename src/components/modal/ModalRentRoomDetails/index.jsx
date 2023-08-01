import { Modal } from "react-bootstrap";
import { GrFormClose } from "react-icons/gr";
import styles from "./ModalRentRoomDetails.module.scss";
import classNames from "classNames/bind";
import { useAuth } from "../../../hooks";
import { Link } from "react-router-dom";
import moment from "moment";
import { useCallback } from "react";
const cx = classNames.bind(styles);

function ModalRentRoomDetails({ show, toggleShow, ...props }) {
  const [, , user] = useAuth();
  console.log(props);
  return (
    <Modal
      centered
      size="lg"
      show={show}
      scrollable={true}
      onHide={toggleShow}
      // backdrop="static"
      keyboard={true}
      dialogClassName={cx("wrap")}
    >
      <div className={cx("header")}>
        <h4>Your room rental details</h4>
        <div className={cx("x")} onClick={toggleShow}>
          <GrFormClose size={26} />
        </div>
      </div>

      <Modal.Body>
        <div className={cx("wrapper")}>
          <div className={cx("content")}>
            <div className={cx("title_gr")}>RENT</div>
            <div className={cx("session")}>
              <div className="row">
                <div className="col-12">
                  <div className="pb-2">
                    <div className={cx("gr")}>
                      <div className={cx("title")}>Status:</div>
                      <div
                        className={cx(
                          "desc",
                          "d-flex justify-content-center align-items-center"
                        )}
                      >
                        <span
                          className={cx("stt", {
                            rent: props?.status == 1,
                          })}
                        >

                          {props?.status == 1 ? "RENT" : "REQUESTING..."}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="pb-2">
                    <div className={cx("gr", "mb-1")}>
                      <div className={cx("title")}>
                        Date of request to move in:
                      </div>
                      <div className={cx("desc")}>
                        {moment(props?.startDate).format("LL")}
                      </div>
                    </div>
                    <div className={cx("gr", "ps-5", "note")}>
                      <div className={cx("title")}>(Note) :</div>
                      <div className={cx("desc")}>
                        Nếu bạn được chấp nhận và đã đóng tiền thuê trọ ở ngày
                        sau ngày đăng kí thì ngày bắt đầu tính thuê là ngày đóng
                        tiền trọ đó.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("title_gr")}>BOARD HOUSE & ROOM</div>
            <div className={cx("session")}>
              <div className="row">
                <div className="col-12">
                  <div className="pb-2">
                    <div className={cx("gr")}>
                      <div className={cx("title")}>Board House Name:</div>
                      <div className={cx("desc")}>
                        {props?.room?.boardHouseId?.name}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="pb-2">
                    <div className={cx("gr")}>
                      <div className={cx("title")}>Address:</div>
                      <div className={cx("desc")}>
                        {props?.room?.boardHouseId?.phone}
                      </div>
                    </div>
                  </div>
                </div>
                {props?.room?.boardHouseId?.description && (
                  <div className="col-12">
                    <div className="pb-2">
                      <div className={cx("gr")}>
                        <div className={cx("title")}>Description:</div>
                        <div className={cx("desc")}>
                          {props?.room?.boardHouseId?.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="col-12">
                  <div className="pb-2">
                    <div className={cx("gr")}>
                      <div className={cx("title")}>Room number:</div>
                      <div className={cx("desc")}>{props?.room?.number}</div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="pb-2">
                    <div className={cx("gr")}>
                      <div className={cx("title")}>Room price:</div>
                      <div className={cx("desc")}>{props?.room?.price}</div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="pb-2">
                    <div className={cx("gr")}>
                      <div className={cx("title")}>
                        Number of people allowed:
                      </div>
                      <div className={cx("desc")}>{props?.room?.size}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("title_gr")}>CONTACT</div>
            <div className={cx("session")}>
              <div className="row">
                <div className="col-12">
                  <div className="pb-2">
                    <div className={cx("gr")}>
                      <div className={cx("title")}>Board house phone:</div>
                      <div className={cx("desc")}>
                        {props?.room?.boardHouseId?.phone}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="pb-2">
                    <div className={cx("gr")}>
                      <div className={cx("title")}> Board house address:</div>
                      <div className={cx("desc")}>
                        {props?.room?.boardHouseId?.address}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="pb-2">
                    <div className={cx("gr")}>
                      <div className={cx("title")}> Owner:</div>
                      <div className={cx("desc")}>
                        {props?.room?.boardHouseId?.userId?.fullName}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="pb-2">
                    <div className={cx("gr")}>
                      <div className={cx("title")}> Phone:</div>
                      <div className={cx("desc")}>
                        {props?.room?.boardHouseId?.userId?.phone}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 offset-6">
                  <div className="pb-2">
                    <div className={cx("gr")}>
                      <div className={cx("title")}> Email:</div>
                      <div className={cx("desc")}>
                        {props?.room?.boardHouseId?.userId?.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("title_gr", "note")}>
              NOTE <span className="px-1">*</span>
            </div>
            <div className={cx("session")}>
              <ul>
                <li>
                  <span className={cx("note_item")}>
                    Bạn phải đóng tiền thuê trọ tháng đầu tiên càng sớm càng tốt
                  </span>
                </li>
                <li>
                  <span className={cx("note_item")}>
                    Trong trường hợp bạn chưa đóng tiền thuê trọ mà có người
                    khác đóng tiền thuê trước bạn thì bạn sẽ bị hũy yêu cầu thuê
                    trọ.
                  </span>
                </li>
                <li>
                  <span className={cx("note_item")}>
                    Khi bạn đóng tiền thuê trọ, chủ trọ sẽ xác thực và phiếu
                    thông tin thuê trọ này sẽ ở trạng thái "Đã thuê".
                  </span>
                </li>
                <li>
                  <span className={cx("note_item")}>
                    Sau khi thuê trọ bạn có thể chuyển vào ở.
                  </span>
                </li>
                <li>
                  <span className={cx("note_item")}>
                    Mọi thắc mắc xin liên hệ với chủ trọ ở mục "CONTACT" phía
                    trên.
                  </span>
                </li>
                <li>
                  <span className={cx("note_item")}>
                    Nếu có nhận thấy lừa đảo hay spam hãy gửi
                    <Link to="/?comp=feed-back" className="px-2">
                      "Phản hồi"
                    </Link>{" "}
                    tới website.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className={cx("footer")}>
          <span>Create at {moment(props?.createdAt).format("ll")}</span>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalRentRoomDetails;
