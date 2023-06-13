import styles from "./RequestFromAccount.module.scss";
import classNames from "classNames/bind";
import useAuth from "../../hooks/useAuth";
import { useEffect, useMemo, useState } from "react";
import { reqRoomOwnerServices } from "../../services";
import { createColumnHelper } from "@tanstack/react-table";
import TableSort from "../TableSort";

const cx = classNames.bind(styles);
function RequestFromAccount() {
  const [, , rootData] = useAuth();
  const [allReqs, setAllReqs] = useState([]);
  const [data, setData] = useState([]);
  const columnHelper = createColumnHelper();

  // async function getAllReqs(rootId) {
  //   const res = await reqRoomOwnerServices.getAllRequests(rootId);
  //   if (res.err === 0) {
  //     setAllReqs(res.data);
  //   }
  // }

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

  const columns = useMemo(
    () => [
      columnHelper.accessor("Number", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Information user", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Information board house", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Description", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Status", {
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("Images", {
        cell: (info) => info.getValue(),
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
      const transformedData = allReqs.map((req, index) => ({
        Number: index,
        "Information user": req.informationUser,
        "Information board house": req.informationBoardHouse,
        Description: req.description,
        Status: req.status,
        Images: "img img",
      }));
      setData(transformedData);
    }
  }, [allReqs]);

  return (
    <div className={cx("wrap")}>
      {console.log("data", allReqs)}
      RequestFromAccount
      <div className="row mt-2">
        <TableSort data={data} columns={columns}></TableSort>
      </div>
    </div>
  );
}

export default RequestFromAccount;
