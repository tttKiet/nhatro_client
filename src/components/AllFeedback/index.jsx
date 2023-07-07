import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks";
import { feedbackService } from "../../services";
import styles from "./AllFeedback.module.scss";
import classNames from "classNames/bind";
import { createColumnHelper } from "@tanstack/react-table";
import TableSort from "../TableSort";
import moment from "moment";
import { BsTrash } from "react-icons/bs";

const cx = classNames.bind(styles);

function AllFeedback() {
  const [, , user] = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const columnHelper = createColumnHelper();

  const getFeedback = async () => {
    try {
      const res = await feedbackService.getAllFeedback(user._id);
      if (res.err === 0) {
        {
          console.log("feedback", res.data);
        }
        setFeedbacks(
          res.data.map((feedback, index) => ({
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
  };

  useEffect(() => {
    getFeedback();
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("Number", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Title", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Message", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Created at", {
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("Status", {
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("Action", {
        cell: (info) => {
          return (
            <div className="d-flex gap-2">
              <BsTrash
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
