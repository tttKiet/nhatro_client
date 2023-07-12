import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks";
import { feedbackService } from "../../services";
import styles from "./AllFeedback.module.scss";
import classNames from "classNames/bind";
import { createColumnHelper } from "@tanstack/react-table";
import TableSort from "../TableSort";
import moment from "moment";
import { BsTrash } from "react-icons/bs";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/esm/Tooltip";
import { ToastContext } from "../../untils/context";
import { AiOutlineCheckCircle, AiOutlineDelete } from "react-icons/ai";

const cx = classNames.bind(styles);

function AllFeedback() {
  const [, , user] = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const columnHelper = createColumnHelper();
  const toast = useContext(ToastContext);

  const getFeedback = useCallback(async () => {
    try {
      console.log("first");
      const res = await feedbackService.getAllFeedback(user._id);
      if (res.err === 0) {
        // {
        //   console.log("feedback", res.data);
        // }
        setFeedbacks(
          res.data.map((feedback, index) => ({
            _id: feedback._id,
            Number: index + 1,
            Title: feedback.title,
            Message: feedback.content,
            "Created at": moment(feedback.createdAt)
              .startOf("minutes")
              .fromNow(),
            Status: "Pending...",
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [user._id]);

  // Confirm and remove favourite post
  function ToggleToastConfirm(userId, fbId) {
    // remove favourite post
    async function handleDeleteFeedback(tId) {
      try {
        const res = await feedbackService.deleteFeedback(userId, fbId);
        if (res.err === 0) {
          getFeedback();
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
        toast.dismiss(tId);
      } catch (error) {
        console.log(error);
      }
    }

    // toggle toast
    toast.success(
      (t) => (
        <div className="d-flex justify-content-center align-items-center">
          <p className="m-0">
            Are you sure to <b>delete</b>?
          </p>
          <AiOutlineCheckCircle
            onClick={() => handleDeleteFeedback(t.id)}
            style={{
              color: "#0075f5",
              fontSize: "20px",
              marginLeft: "12px",
              cursor: "pointer",
            }}
          />
        </div>
      ),
      {
        icon: (
          <div className="bg-danger p-1 border border-1 rounded shadow">
            <AiOutlineDelete
              style={{
                color: "white",
                fontSize: "22px",
              }}
            />
          </div>
        ),
        duration: 4000,
      }
    );
  }

  useEffect(() => {
    getFeedback();
  }, [getFeedback]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("Number", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Title", {
        cell: (info) => {
          return (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{info.getValue()}</Tooltip>}
            >
              <div className={cx("text-description")}>{info.getValue()}</div>
            </OverlayTrigger>
          );
        },
      }),
      columnHelper.accessor("Message", {
        cell: (info) => {
          return (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{info.getValue()}</Tooltip>}
            >
              <div className={cx("text-description")}>{info.getValue()}</div>
            </OverlayTrigger>
          );
        },
      }),

      columnHelper.accessor("Action", {
        cell: (info) => {
          return (
            <div className="d-flex justify-content-center">
              <BsTrash
                onClick={() =>
                  ToggleToastConfirm(user._id, info.row.original._id)
                }
                style={{ color: "red" }}
                className={cx("btn-icon")}
              ></BsTrash>
            </div>
          );
        },
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className={cx("wrap")}>
      <div className="container bg-white rounded-3 p-4 ">
        <div className=" fs-m">
          <TableSort columns={columns} data={feedbacks}></TableSort>
        </div>
      </div>
    </div>
  );
}

export default AllFeedback;
